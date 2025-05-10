# Sentinel - Real-time Web Attack Detection System

Sentinel is a security dashboard application designed to monitor and visualize web attacks in real-time. It helps security administrators identify, analyze, and respond to potential security threats targeting web applications.

## Features

- **Security Dashboard**: Comprehensive overview of security metrics and threat statistics
- **Attack Visualization**: Multiple chart types (Pie, Bar, Line) to visualize attack distributions
- **Real-time Monitoring**: View recent malicious activities with detailed information
- **Detailed Attack Logs**: Comprehensive logs with filtering by attack type, IP address, and time range
- **Threat Analysis**: Detailed view of attack payloads with sensitive information redaction
- **Responsive Design**: Works across desktop and mobile devices

## Tech Stack

- **Frontend**: 
  - Next.js 14
  - React 18
  - Tailwind CSS
  - Chart.js with react-chartjs-2
  - Lucide React (icons)
  - TypeScript

- **Backend**:
  - Next.js API Routes
  - Prisma ORM
  - MySQL Database

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL database

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd sentinel
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="mysql://username:password@localhost:3306/sentinel"
   ```

4. Set up the database
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to access the dashboard

## Project Structure

- `/src/app`: Next.js app router components and API routes
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions and shared libraries
- `/src/utils`: Helper utilities and type definitions
- `/prisma`: Database schema and migrations

## Usage

1. **Login**: Use the login page with default credentials (username: admin, password: admin123)
2. **Dashboard**: View security metrics, attack distributions, and recent activities
3. **Security Threats**: Browse detailed logs of detected attacks with filtering options

## Authentication

The dashboard uses a simple token-based authentication system. In a production environment, consider implementing a more robust authentication solution.

## Development

### Building for production

```bash
npm run build
```

### Starting production server

```bash
npm start
```
