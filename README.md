# Mongoose Pagination Helper

## Description
This package provides an easy way to implement pagination in MongoDB using either the `find` method or `aggregation` pipelines. It's designed to work with Mongoose models and offers a simple API to paginate data.

## Installation
```bash
npm install mongoose-pagination-helper
```

## Usage
The package exports two functions: `findPagination` and `aggregatePagination`. Both functions return paginated results and accept similar parameters.

### Import CommonJS
```javascript
const paginate = require('mongoose-pagination-helper');
const MyModel = require('./models/myModel');
```

### findPagination
```javascript
const query = { }; // Your Mongoose query
const options = {
  limit: 12, // Number of records per page
  page: 1, // Current page
  showPages: 3, // Number of pages to show before and after the current page
  sort: { field: -1}, // The default is { createdAt: -1}
  selectFields: 'field1 field2', // Fields to include in the result
  populateFields: 'field1 field2' // Fields to populate in the result
  // populateFields: [{path: 'field1', select: {_id: 0, field: 1}}] // Another way to use populate in the result
};

const paginatedData = await paginate.findPagination(MyModel, query, options);
```
#### Parameters

- **`Model`** *(Mongoose Model)*: The mongoose model for which you want to paginate data.
- **`query`** *(Object)*: Any valid mongoose query object.
- **`options`** *(Object)*: Optional settings for pagination.
  - `limit` *(Number)*: Number of records to fetch per page.
  - `page` *(Number)*: The current page, starts from 1.
  - `pageRange` *(Number)*: Number of pages to show before and after the current one in the paginator.
  - `sort` *(Object)*: field to be sorted by.
  - `selectFields` *(String)*: The fields you want to include in the result.
  - `populateFields` *(String or Array)*: The fields you want to populate in the result.

#### Returns

An object containing:
- `currentPage`: The current page.
- `totalPages`: Total number of pages.
- `previousPages`: An array of previous page numbers.
- `nextPages`: An array of upcoming page numbers.
- `items`: The actual data records for the current page.
- `itemsCount`: The total of items returned in the current page.

### aggregatePagination
```javascript
const aggregationPipeline = [ ]; // Your Mongoose query
const options = {
  limit: 10, // Number of records per page
  page: 1, // Current page
  pageRange: 3, // Number of pages to show before and after the current page
  sort: { field: -1}, // Sort bt field
};

const paginatedData = await paginate.aggregatePagination(MyModel, aggregatePagination, options);
```
#### Parameters

- **`Model`** *(Mongoose Model)*: The mongoose model for which you want to paginate data.
- **`aggregatePagination`** *(Array)*: Any valid aggregation pipeline satges.
- **`options`** *(Object)*: Optional settings for pagination.
  - `limit` *(Number)*: Number of records to fetch per page.
  - `page` *(Number)*: The current page, starts from 1.
  - `pageRange` *(Number)*: Number of pages to show before and after the current one in the paginator.
  - `sort` *(Object)*: field to be sorted by.

#### Returns

An object containing:
- `currentPage`: The current page.
- `totalPages`: Total number of pages.
- `previousPages`: An array of previous page numbers.
- `nextPages`: An array of upcoming page numbers.
- `items`: The actual data records for the current page.
- `itemsCount`: The total of items returned in the current page.


## License

This package was created with assistance from ChatGPT and is licensed under the MIT license terms.
