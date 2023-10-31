import { Document, Model, Query } from 'mongoose';

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

const paginate = async (
    model: Model<Document>,
    queryConditions: Object = {},
    options: {
      limit?: number;
      pageNumber?: number;
      sort?: Record<string, 1 | -1>;
      selectFields?: string;
      populateFields?: string;
      pageRange?: number;
    } = {}
  ): Promise<{
    items: Document[];
    pagination: {
      itemsCount: number;
      currentPage: number;
      totalPages: number;
      previousPages: number[];
      nextPages: number[];
    };
  }> => {
    try {
      const {
        limit = 15,
        pageNumber = 1,
        sort = { createdAt: -1 },
        selectFields = '-__v',
        populateFields = '',
        pageRange = 3,
      } = options;
  
      let currentPage = Math.max(1, pageNumber);
      let itemsLimit = Math.max(1, limit);
  
      const totalItems = await model.countDocuments(queryConditions);
      const totalPages = Math.ceil(totalItems / itemsLimit);
  
      const skip = (currentPage - 1) * itemsLimit;
  
      const iterator: { previousPages: number[], nextPages: number[] } = {
          previousPages: [],
          nextPages: []
      };
  
      for (let i = 1; i <= pageRange; i++) {
        if (currentPage - i > 0) iterator.previousPages.unshift(currentPage - i);
      }
  
      for (let i = 1; i <= pageRange; i++) {
        if (currentPage + i <= totalPages) iterator.nextPages.push(currentPage + i);
      }
  
      let query: Query<Document[], Document> = model
        .find(queryConditions)
        .sort(sort)
        .skip(skip)
        .limit(itemsLimit)
        .select(selectFields);
  
      if (populateFields) {
        query = query.populate(populateFields);
      }
  
      const items = await query;
  
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
    } catch (error) {
      throw error;
    }
  };
  
  if (typeof module !== 'undefined') {
    module.exports = paginate;
    module.exports.default = paginate;
  }