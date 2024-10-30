# Event Request Management System

A basic website application built with Next.js for the frontend, SQLite as the database, Clerk for authentication, Prisma as an ORM, and Jest for testing. This project was part of an assignment for the Modern Methods of Software Engineering course at KTH. The primary objective was to design and implement a workflow application for an imaginary business, where different user roles interact to manage and approve event requests.

## Project Overview

This application allows various stakeholders in a business to process event requests through several stages, enabling collaboration between team members with distinct roles and permissions. The process flow is as follows:

1. **Customer Service Officer (CSO)** initiates an event request.
2. **Senior Customer Service Officer (SCSO)** reviews and forwards the request to the Financial Manager.
3. **Financial Manager (FM)** adds a budget estimate and forwards it to the Administrative Manager.
4. **Administrative Manager (AM)** finalizes the request status, either accepting or rejecting it.
5. **CSO** communicates the decision to the client.

In addition, the application supports task, staffing, and budget management for sub-teams, providing a centralized workflow for resource allocation and departmental communication.

## Features

### Event Request Logic

- **Request Creation**: The CSO submits event requests with specific client details.
- **Multi-Stage Review**: Requests move through sequential approvals from the SCSO, FM, and AM.
- **Decision Communication**: Once finalized, the decision is communicated back to the CSO for client notification.

### Sub-Team Collaboration

- **Task Management**: Sub-teams receive task lists, submit plans, and make budget requests.
- **Budget Tracking**: Department managers track and manage budget requests and can initiate hiring through HR if necessary.

## Technical Stack

- **Frontend**: [Next.js](https://nextjs.org/) - for building interactive, server-rendered pages.
- **Database**: [SQLite](https://sqlite.org/index.html) - a simple, self-contained SQL database.
- **Authentication**: [Clerk](https://clerk.dev/) - handles user login, role-based access, and permissions.
- **ORM**: [Prisma](https://www.prisma.io/) - for type-safe, SQL-based data modeling and querying.
- **Testing**: [Jest](https://jestjs.io/) - a JavaScript testing framework to ensure code reliability.

## Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Initialize a [Clerk](https://clerk.com/) project**

    Create a new project, and add the following required users:
    [Required Users](requiredUsers.png)
    (These are required for pathing and role based access control. Clerk does not
    allow more than 5 distinct roles in the free plan, so I had to use the usernames as their roles)

    Once the users are created, grab the API keys under the configure tab, 
    create `env.local` in the root directory and paste them in.

3. **Database Setup (SQLite & Prisma)**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **View Database with Prisma Studio (blocks terminal)**

   ```bash
   npx prisma studio
   ```

5. **Start Development Server (blocks terminal)**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
