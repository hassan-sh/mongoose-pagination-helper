# Mongoose Pagination Helper

## Description
A simple and customizable pagination helper for Mongoose models. This package offers easy-to-use methods for paginating database queries, along with utilities to get pagination metadata for UI/UX optimization. It supports CommonJS, ES Modules, and TypeScript.

## Installation
```bash
npm install mongoose-pagination-helper
```

## Usage

### CommonJS
```javascript
const paginate = require('mongoose-pagination-helper');
const MyModel = require('./models/myModel');

const query = { }; // Your Mongoose query
const options = {
  limit: 5, // Number of records per page
  page: 1, // Current page
  showPages: 2, // Number of pages to show before and after the current page
  selectFields: 'field1 field2', // Fields to include in the result
  populateFields: 'field1 field2' // Fields to populate in the result
};

const paginatedData = await paginate(MyModel, query, options);
```

### ES Modules
```javascript
import paginate from 'mongoose-pagination-helper';
import MyModel from './models/myModel';

// ... rest is same as CommonJS example
```

### TypeScript
```typescript
import paginate from 'mongoose-pagination-helper';
import MyModel from './models/myModel';

// ... rest is same as CommonJS example
```

## API

### `paginate(Model, query, options)`

#### Parameters

- **`Model`** *(Mongoose Model)*: The mongoose model for which you want to paginate data.
- **`query`** *(Object)*: Any valid mongoose query object.
- **`options`** *(Object)*: Optional settings for pagination.
  - `limit` *(Number)*: Number of records to fetch per page.
  - `page` *(Number)*: The current page, starts from 1.
  - `showPages` *(Number)*: Number of pages to show before and after the current one in the paginator.
  - `selectFields` *(String)*: The fields you want to include in the result.
  - `populateFields` *(String)*: The fields you want to populate in the result.

#### Returns

An object containing:
- `currentPage`: The current page.
- `totalPages`: Total number of pages.
- `previousPages`: An array of previous page numbers.
- `nextPages`: An array of upcoming page numbers.
- `data`: The actual data records for the current page.

## License

This project is licensed under the terms of the MIT license.
