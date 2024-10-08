const findPagination = async (model, queryConditions = {}, options = {}) => {
    try {
        const {
            limit: limitOption = 10,
            pageNumber: pageNumberOption = 1,
            sort = { createdAt: -1 },
            selectFields = '',
            populateFields = '',
            pageRange = 3
        } = options;
    
        let currentPage = Math.max(1, pageNumberOption);
        let limit = Math.max(1, limitOption);

        const totalItems = await model.countDocuments(queryConditions);
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
  
        const query = model
            .find(queryConditions)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .select(selectFields);
    
        if (populateFields) {
            query.populate(populateFields);
        }
  
        const items = await query;

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
    } catch (error) {
        throw error;
    }
};

// For CommonJS
module.exports = findPagination;

// For ES6 Modules
// export default findPagination;