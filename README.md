# webdev-project

# Nordic Spices

Nordic Spices is a full-stack restaurant web application developed as part of the Web Development Project course.

The application combines Nordic ingredients with Asian-inspired cuisine and provides lunch and fine-dining menus, customer authentication, table reservations, pickup ordering, customer account features, and an admin dashboard.

## Technologies

### Frontend

- React
- Vite
- React Router
- Axios
- Lucide React
- Playwright

### Backend

- Node.js
- Express
- MySQL
- JWT authentication
- bcryptjs
- ApiDoc
- Vitest
- Supertest

### External API

- HSL / Digitransit Open API
- Used to display nearby public transport stops on the Restaurant page.

## Main Features

### Customer

- Register a new account
- Login and logout
- View customer account
- Browse weekday lunch menu
- Browse fine-dining / à la carte menu
- View individual dish details
- View dietary and allergen information
- Add dishes to cart
- Place pickup orders
- View previous orders
- Make table reservations
- View reservation history
- View restaurant information
- View nearby HSL public transport stops

### Admin

- Admin authentication
- Admin dashboard
- Create menu items
- Update menu items
- Archive menu items
- View customer orders
- Update order status
- View customer reservations
- Update reservation status
- Archive completed or cancelled reservations

## Project Structure

```text
webdev-project/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── tests/
│   ├── app.js
│   └── server.js
├── database-sakib/
├── frontend/
│   ├── src/
│   ├── tests/
│   └── playwright.config.js
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/elviirse/webdev-project.git
cd webdev-project
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory.

Example:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
DIGITRANSIT_API_KEY=your_digitransit_api_key
```

Do not commit the `.env` file or API keys to Git.

Start the backend:

```bash
npm run dev
```

Backend runs at:

```text
http://127.0.0.1:3000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend development server runs through Vite.

## REST API

Main API groups:

```text
/api/auth
/api/menu
/api/orders
/api/reservations
/api/opening-hours
/api/tables
/api/hsl
```

The application uses JWT Bearer authentication for protected customer and admin operations.

## API Documentation

API documentation is generated using ApiDoc.

From the backend directory run:

```bash
npm run apidoc
```

Generated documentation is stored in:

```text
backend/docs/
```

## Open API Integration

The Restaurant page uses the HSL / Digitransit API to retrieve nearby public transport stops.

The frontend requests:

```text
GET /api/hsl/stops
```

The backend communicates with Digitransit so that the API subscription key is not exposed in frontend code.

## Testing

### Backend Integration Tests

Integration tests use Vitest and Supertest.

Run:

```bash
cd backend
npm test
```

The project currently contains 7 backend integration tests covering API availability, menu endpoints, individual menu retrieval, and protected endpoints.

### End-to-End Tests

End-to-end tests use Playwright.

Run:

```bash
cd frontend
npm run test:e2e
```

The project currently contains 7 E2E tests covering the home page, lunch menu, fine-dining page, reservation page, login, registration, and protected account behaviour.

## Production Build

To create a production frontend build:

```bash
cd frontend
npm run build
```

## Database

The application uses a MySQL relational database.

Main data includes:

- Customers
- Menu items
- Ingredients
- Allergens
- Orders
- Order items
- Reservations
- Restaurant tables
- Opening hours

## Security

The application includes:

- Password hashing
- JWT authentication
- Customer authorization
- Admin role authorization
- Protected order operations
- Protected reservation operations
- Environment variables for secrets and API keys

## Authors

Web Development Project team:

- Khusbu — Backend REST API, ordering, reservations, authentication/admin integration, testing and API integration
- Riya — Frontend
- Elviira — Authentication and admin
- Leo — Testing, Open API, deployment and documentation
- Sakib — Database

## Repository

GitHub repository:

https://github.com/elviirse/webdev-project
