# Product Requirements Document (PRD)

## 1. Introduction

Olvy is an AI-powered cap table management software designed to streamline and automate the management of ownership records for startups and private companies. This document outlines the requirements and specifications for the Olvy platform, which includes a front-end user interface and a back-end server with database management.

## 2. Target Audience

The primary users of Olvy are startup founders, CFOs, and private company administrators who need to manage equity distribution, track shareholder information, and handle equity grants efficiently.

## 3. Key Features

### 3.1 User Authentication
- Secure login and registration system
- Password encryption and JWT-based session management

### 3.2 Dashboard
- Overview of company cap table
- Quick access to shareholder details and equity grants

### 3.3 Cap Table Management
- Real-time cap table updates
- Support for multiple classes of shares
- Visualization of ownership structure

### 3.4 Shareholder Management
- Add and manage shareholder information
- Record share transactions and ownership changes

### 3.5 Equity Grants
- Issue new equity grants
- Track vesting schedules and exercised options

### 3.6 Settings and Administration
- Manage platform settings
- User roles and permissions

## 4. User Interface (UI)

### 4.1 Login Page (`frontend/src/components/Login.js`)
- Form for user authentication
- Links to registration and password recovery

### 4.2 Dashboard Page (`frontend/src/components/Dashboard.js`)
- Summary of the cap table and recent activity
- Navigation to other sections of the platform

### 4.3 Cap Table Page (`frontend/src/components/CapTable.js`)
- Detailed view of the cap table
- Interactive tools for managing share allocations

### 4.4 Shareholder List Page (`frontend/src/components/ShareholderList.js`)
- List of all shareholders with search and filter capabilities
- Options to add or edit shareholder information

### 4.5 Equity Grants Page (`frontend/src/components/EquityGrants.js`)
- Form to issue new grants
- List of existing grants with status indicators

### 4.6 Settings Page (`frontend/src/components/Settings.js`)
- Configuration options for the platform
- User management and permissions

## 5. Technical Specifications

### 5.1 Front-End
- Built with React (`frontend/package.json`)
- Responsive design with CSS (`frontend/src/styles/main.css`)
- Axios for API requests (`frontend/src/services/apiService.js`)

### 5.2 Back-End
- Node.js with Express framework (`backend/server.js`)
- MongoDB with Mongoose ODM (`backend/config/db.js`)
- Authentication with bcryptjs and jsonwebtoken (`backend/controllers/authController.js`)

### 5.3 API Endpoints
- Authentication: `/api/auth/login`, `/api/auth/register`
- Cap Table: `/api/captable`, `/api/captable/:id`
- Shareholders: `/api/shareholders`, `/api/shareholders/:id`
- Equity Grants: `/api/equitygrants`, `/api/equitygrants/:id`
- Users: `/api/users`, `/api/users/:id`

### 5.4 Data Models
- User (`backend/models/User.js`)
- Company (`backend/models/Company.js`)
- Shareholder (`backend/models/Shareholder.js`)
- Equity Grant (`backend/models/EquityGrant.js`)

### 5.5 Testing
- Unit tests for API endpoints (`backend/tests/`)
- Jest as the testing framework

### 5.6 Deployment
- Scripts for setting up development, staging, and production environments (`deployment/`)
- Environment configuration examples (`backend/.env.example`)

## 6. Documentation

- Architectural Diagram (`docs/architecture_diagram.png`)
- System Flowchart (`docs/system_flowchart.png`)
- API Documentation (`docs/api_documentation.md`)
- Database Schema (`docs/database_schema.md`)
- Deployment Instructions (`deployment/README.md`)

## 7. Development and Deployment Practices

- Adherence to coding standards and best practices
- Comprehensive inline code documentation
- CI/CD pipeline for automated testing and deployment

## 8. Conclusion

This PRD provides a detailed roadmap for the development of Olvy. The platform will offer a comprehensive solution for cap table management with a focus on usability, security, and scalability. The deliverables will include a fully functional front-end and back-end, thorough documentation, and deployment scripts to ensure a smooth transition to production.