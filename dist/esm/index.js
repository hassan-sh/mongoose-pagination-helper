var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Pagination helper for Mongoose queries.
 * @async
 * @param {Model<Document>} model - The Mongoose model.
 * @param {Object} queryConditions - Mongoose query conditions.
 * @param {Object} [options={}] - Pagination and query options.
 * @param {number} [options.limit=15] - Maximum number of items per page.
 * @param {number} [options.pageNumber=1] - Current page number.
 * @param {Object} [options.sort={ createdAt: -1 }] - Sorting conditions.
 * @param {string} [options.selectFields='-__v'] - Fields to select in the query.
 * @param {string} [options.populateFields=''] - Fields to populate.
 * @param {number} [options.pageRange=3] - Range of pages for pagination.
 * @returns {Promise<Object>} Pagination result including items and meta data.
 * @throws Will throw an error if the query execution fails.
 */
const paginate = (model, queryConditions = {}, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 15, pageNumber = 1, sort = { createdAt: -1 }, selectFields = '-__v', populateFields = '', pageRange = 3, } = options;
        let currentPage = Math.max(1, pageNumber);
        let itemsLimit = Math.max(1, limit);
        const totalItems = yield model.countDocuments(queryConditions);
        const totalPages = Math.ceil(totalItems / itemsLimit);
        const skip = (currentPage - 1) * itemsLimit;
        const iterator = {
            previousPages: [],
            nextPages: []
        };
        for (let i = 1; i <= pageRange; i++) {
            if (currentPage - i > 0)
                iterator.previousPages.unshift(currentPage - i);
        }
        for (let i = 1; i <= pageRange; i++) {
            if (currentPage + i <= totalPages)
                iterator.nextPages.push(currentPage + i);
        }
        let query = model
            .find(queryConditions)
            .sort(sort)
            .skip(skip)
            .limit(itemsLimit)
            .select(selectFields);
        if (populateFields) {
            query = query.populate(populateFields);
        }
        const items = yield query;
        return {
            items,
            pagination: {
                itemsCount: items.length,
                currentPage,
                totalPages,
                previousPages: iterator.previousPages,
                nextPages: iterator.nextPages,
            },
        };
    }
    catch (error) {
        throw error;
    }
});
if (typeof module !== 'undefined') {
    module.exports = paginate;
    module.exports.default = paginate;
}
export {};
