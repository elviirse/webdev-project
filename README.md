# Nordic Spices

Nordic Spices is a full-stack restaurant web application developed as part of the Web Development Project course.

The application combines Nordic ingredients with Asian-inspired cuisine and provides lunch and fine-dining menus, customer authentication, table reservations, pickup ordering, customer account features, and an admin dashboard.

## Live Application

Frontend:

https://nordic-spices-web.onrender.com/

Backend API:

https://webdev-project-mgyi.onrender.com/

The React frontend and Node.js/Express backend are deployed on Render. The production MySQL database is hosted on Aiven.

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

### Deployment

- Render - frontend and backend hosting
- Aiven - production MySQL database

### External API

- HSL / Digitransit Open API
- Used to display nearby public transport stops on the Restaurant page

## Main Features

### Customer

- Register a new account
- Login and logout
- View customer account
- Browse weekday lunch menu
- Browse fine-dining / a la carte menu
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
|-- backend/
|   |-- controllers/
|   |-- routes/
|   |-- tests/
|   |-- app.js
|   `-- server.js
|-- database-sakib/
|-- frontend/
|   |-- src/
|   |-- tests/
|   `-- playwright.config.js
`-- README.md
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

### Environment Variables

Create a `.env` file inside the `backend` directory:

```env
DB_HOST=database_host
DB_PORT=3306
DB_USER=database_user
DB_PASSWORD=password
DB_NAME=database_name
DB_SSL=false

JWT_SECRET=your_jwt_secret
DIGITRANSIT_API_KEY=your_digitransit_api_key
```

For the deployed production environment, the application uses an Aiven MySQL database with SSL enabled:

```env
DB_HOST=aiven_database_host
DB_PORT=aiven_database_port
DB_USER=aiven_database_user
DB_PASSWORD=aiven_database_password
DB_NAME=defaultdb
DB_SSL=true

JWT_SECRET=your_secure_jwt_secret
DIGITRANSIT_API_KEY=your_digitransit_api_key
```

The frontend production environment uses:

```env
VITE_API_URL=https://webdev-project-mgyi.onrender.com
```

Environment variables containing passwords, JWT secrets, and API keys must not be committed to GitHub. Production environment variables are configured securely in the hosting platform.

````

Do not commit the `.env` file, passwords, JWT secrets, or API keys to Git.

Start the backend:

```bash
npm run dev
````

The local backend runs at:

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

For local development, the frontend uses the local backend by default. In production, `VITE_API_URL` is configured to use the deployed Render backend.

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

Integration/API tests use Vitest and Supertest.

Run:

```bash
cd backend
npm test
```

The project contains 7 backend integration tests covering:

- API availability
- Menu retrieval
- Lunch menu retrieval
- Fine-dining menu retrieval
- Individual menu item retrieval
- Protected menu operations
- Protected reservation operations

Current result:

```text
Test Files  1 passed (1)
Tests       7 passed (7)
```

### End-to-End Tests

End-to-end tests use Playwright.

Run:

```bash
cd frontend
npm run test:e2e
```

The project contains 7 E2E tests covering:

- Home page
- Lunch menu
- Fine-dining menu
- Reservation page
- Login
- Registration
- Protected account behaviour

Current result:

```text
Tests  7 passed
```

## Technical Validation

The deployed application was tested with Google Lighthouse.

Lighthouse results:

| Category       | Score |
| -------------- | ----: |
| Performance    |    69 |
| Accessibility  |    95 |
| Best Practices |   100 |
| SEO            |    91 |

The deployed frontend was also checked using the W3C HTML and CSS validation services.

- HTML validation: no validation errors; informational messages only
- CSS validation: no errors found (CSS Level 3 + SVG)

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

The production MySQL database is hosted on Aiven and is accessed securely by the deployed backend using environment variables and SSL.

## Security

The application includes:

- Password hashing
- JWT authentication
- Customer authorization
- Admin role authorization
- Protected order operations
- Protected reservation operations
- Environment variables for secrets and API keys
- Production database SSL configuration
- Backend proxy for the Digitransit API key

## Deployment Architecture

```text
User / Browser
      |
      v
Render Static Site
React Frontend
      |
      v
Render Web Service
Node.js / Express REST API
      |
      v
Aiven MySQL Database

Backend REST API
      |
      v
HSL / Digitransit API
```

## Authors

Web Development Project team:

- Khusbu - Backend REST API, authentication, customer accounts, admin dashboard and integration, menu management, ordering and pickup system, reservations, HSL / Digitransit API integration, backend integration testing, E2E testing, deployment, database migration, security, API documentation, and project documentation
- Riya - Frontend development and user interface
- Sakib - Initial database development

## Repository

GitHub repository:

https://github.com/elviirse/webdev-project

## Repository

Original team repository:

https://github.com/elviirse/webdev-project

Development fork:

https://github.com/khushbu7763/webdev-project

The final development, integration, testing, and deployment work was completed on the `menu-update` branch.
