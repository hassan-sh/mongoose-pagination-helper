const aggregatePagination = async (model, aggregationPipeline, options) => {
    const {
        limit: limitOption = 10,
        pageNumber: pageNumberOption = 1,
        pageRange = 3
    } = options;
    
    let currentPage = Math.max(1, pageNumberOption);
    let limit = Math.max(1, limitOption);

    // Count the total documents for pagination
    const totalItemsAggregation = [...aggregationPipeline, { $count: "total" }];
    const totalDocs = await model.aggregate(totalItemsAggregation);
    const totalItems = totalDocs.length > 0 ? totalDocs[0].total : 0;
    const totalPages = Math.ceil(totalItems / limit);
    
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const skip = Math.max(0, (currentPage - 1) * limit);

    // Calculate iterators for previous and next pages
    const iterator = {
        previousPages: [],
        nextPages: []
    };

    for (let i = 1; i <= pageRange; i++) {
        if (currentPage - i > 0) iterator.previousPages.unshift(currentPage - i);
    }

    for (let i = 1; i <= pageRange; i++) {
        if (currentPage + i <= totalPages) iterator.nextPages.push(currentPage + i);
    }

    // Add skip and limit stages to the aggregation pipeline
    const paginatedAggregation = [...aggregationPipeline, { $skip: skip }, { $limit: limitOption }];

    // Optional: Add a sort stage if sorting is provided in options
    if (options.sort) {
        paginatedAggregation.push({ $sort: options.sort });
    }

    // Execute the aggregation pipeline
    const items = await model.aggregate(paginatedAggregation);

    return {
        items,
        pagination: {
            itemsCount: items.length,
            currentPage,
            totalPages,
            previousPages: iterator.previousPages,
            nextPages: iterator.nextPages
        }
    };
};

// module.exports = aggregatePagination;

// For CommonJS
module.exports = aggregatePagination;

// For ES6 Modules
// export default aggregatePagination;