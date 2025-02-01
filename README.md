# Equipment Maintenance Management System

This is a RESTful API for managing equipment and maintenance records, built with Express.js and MongoDB using Mongoose. It provides CRUD operations for both equipment and maintenance records.

## Features

- **Equipment Management**

  - Create, read, update, and delete equipment records
  - Track equipment details (name, location, department, model, serial number, etc.)
  - Equipment status tracking (Operational, Down, Maintenance, Retired)

- **Maintenance Management**

  - Create, read, update, and delete maintenance records
  - Track maintenance details (type, technician, hours spent, parts replaced, etc.)
  - Maintenance status tracking (Complete, Incomplete, Pending Parts)
  - Association with equipment records

- **RESTful API**
  - Standard HTTP methods (GET, POST, PUT, DELETE)
  - JSON responses
  - Proper status codes
  - Error handling

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Deployment**: Vercel
- **Other**: CORS, dotenv

## API Endpoints

### Equipment Endpoints

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| GET    | `/api/equipment`     | Get all equipment records     |
| GET    | `/api/equipment/:id` | Get a single equipment record |
| POST   | `/api/equipment`     | Create a new equipment record |
| PUT    | `/api/equipment/:id` | Update an equipment record    |
| DELETE | `/api/equipment/:id` | Delete an equipment record    |

### Maintenance Endpoints

| Method | Endpoint               | Description                     |
| ------ | ---------------------- | ------------------------------- |
| GET    | `/api/maintenance`     | Get all maintenance records     |
| GET    | `/api/maintenance/:id` | Get a single maintenance record |
| POST   | `/api/maintenance`     | Create a new maintenance record |
| PUT    | `/api/maintenance/:id` | Update a maintenance record     |
| DELETE | `/api/maintenance/:id` | Delete a maintenance record     |

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/equipment-maintenance-system.git
   cd equipment-maintenance-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with the following content:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   PORT=4000
    ```

6. Start the development server:
   ```bash
   npm run dev
   ```

# Contact

For any inquiries, please contact Mohamed Saleh at [mohamed20163858@gmail.com]
