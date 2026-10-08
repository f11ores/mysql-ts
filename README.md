Product REST API

REST API for managing products using Node.js, Express, TypeScript, and MySQL2.

Technologies

* Node.js
* Express
* TypeScript
* MySQL
* MySQL2
* dotenv
* Thunder Client

Features

* Get all active products
* Get a product by ID
* Create products
* Update products
* Change the price of a product
* Logically deactivate products
* Validate product IDs and prices
* Connect to MySQL using a connection pool

Project Structure


```text
src/
├── app.ts
├── server.ts
├── conf/
│   └── dbConnection.ts
├── routes/
│   ├── index.ts
│   └── products.routes.ts
└── controllers/
    └── products.controller.ts
```


Database

The project uses a MySQL database named `pos` with a `products` table.

The table contains:

* id
* name
* price
* stock
* description
* brand
* img
* active

Inactive products are not included in the normal queries.

Installation

Clone the repository and install the dependencies:

bash
npm install

Create a .env file in the root directory:

env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pos
DB_PORT=3306


Then start the development server:

bash
npm run dev


The server runs at:
http://localhost:3000


API Endpoints

| Method | Endpoint                            | Description                    |
| ------ | ----------------------------------- | ------------------------------ |
| GET    | `/api/v1/products/getAll`           | Get all active products        |
| GET    | `/api/v1/products/getById/:id`      | Get an active product by ID    |
| POST   | `/api/v1/products/create`           | Create a product               |
| PUT    | `/api/v1/products/update/:id`       | Update a product               |
| DELETE | `/api/v1/products/delete/:id`       | Logically deactivate a product |
| PATCH  | `/api/v1/products/change-price/:id` | Change only the product price  |

Example Product

json
{
    "name": "Laptop HP",
    "price": 16000,
    "stock": 10,
    "description": "Laptop for work and study",
    "brand": "HP",
    "img": "laptop.jpg"
}

Build

To compile the TypeScript project:

bash
npm run build


To run the compiled version:

bash
npm start

Testing

The API was tested using Thunder Client, including:

* Product creation
* Product queries
* Product updates
* Price changes
* Logical deactivation
* Invalid IDs
* Invalid prices
