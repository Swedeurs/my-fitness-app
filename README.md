
Fitness App Dashboard
This project is a Fitness App designed to help trainers and clients manage their workout sessions, track progress, communicate with each other, and much more. The app includes dashboards for both trainers and clients, allowing trainers to assign clients, chat with them, and manage their training plans. Clients, on the other hand, can track their workouts, communicate with their trainers, and manage their personal fitness data.

Table of Contents
Project Overview
Technologies Used
Features
Frontend
Backend
Project Structure
Installation
Usage
Future Enhancements
License
Project Overview
The Fitness App consists of the following key functionalities:

Trainer Dashboard: Allows trainers to view and manage assigned clients, chat with them, and assign new clients to themselves.
Client Dashboard: Clients can view their personal data, track their workout progress, and communicate with their trainer.
Chat Feature: Both trainers and clients can have direct communication through a real-time chat system.
Client Assignment: Trainers can assign unassigned clients to themselves, and clients can be viewed and managed on the dashboard.
This project is built using the Next.js framework, with a focus on a clean and intuitive UI, leveraging modern technologies for both frontend and backend development.

Technologies Used
Frontend:
React: For building the user interfaces and handling state.
Next.js: Server-side rendering (SSR) and API routes.
Tailwind CSS: For utility-first CSS styling.
TypeScript: For type safety and developer experience.
Backend:
Next.js API Routes: For handling server-side logic and database interactions.
Drizzle ORM: For interacting with the database.
PostgreSQL: As the database for storing user and session data.
Real-time Communication:
WebSockets: For real-time chat functionality between trainers and clients.
Features
Trainer Dashboard
View all assigned clients and unassigned clients.
Chat with clients directly.
Assign unassigned clients to themselves.
View and manage client data (e.g., name, email).
Client Dashboard
View their personal data (e.g., name, email, fitness level).
View assigned trainer information.
Chat with their assigned trainer.
Manage fitness data, such as weight, height, and training preferences.
Chat
Real-time messaging between trainers and clients.
Simple interface with the ability to start and close chats.
Frontend
The frontend is built with React and Next.js for server-side rendering (SSR).
Tailwind CSS is used for utility-based styling, providing a responsive and modern design.
User authentication and state management are handled via custom hooks.
Pages
Trainer Dashboard: Displays all clients (assigned and unassigned) for trainers. Allows interaction with clients, assigning new clients, and viewing their data.
Client Dashboard: Displays personal data and the assigned trainer. Also includes chat functionality with the trainer.
Backend
The backend is built with Next.js API Routes that handle server-side logic, such as fetching trainer-client relationships, managing sessions, and handling real-time messaging.

API Routes
/api/trainers/[id]/clients: Returns the list of clients assigned to a specific trainer.
/api/trainers/unassigned-clients: Returns a list of unassigned clients.
/api/assign-client: Allows a trainer to assign an unassigned client to themselves.
/api/clients/[id]/trainer: Fetches the trainer information for a given client.
Database
The project uses PostgreSQL as the database to store user, client, trainer, and session data. Drizzle ORM is used to query the database.

Project Structure
/components        # Reusable components (e.g., chat, side navigation)
/pages             # Pages for different routes (e.g., dashboard, client dashboard)
/lib               # Library files for utility functions (e.g., database connection)
/types             # TypeScript types (e.g., User, Trainer, Client)
/hooks             # Custom hooks (e.g., useUser)
/public            # Static assets (e.g., images)
/styles            # Global styles (e.g., Tailwind config)
Installation
Clone the repository:

git clone https://github.com/yourusername/fitness-app.git
Navigate into the project directory:

cd fitness-app
Install dependencies:

npm install
Set up the environment variables:

Create a .env file in the root of the project.
Add the required environment variables (e.g., database credentials).
Example:

NEXT_PUBLIC_DB_HOST=your_database_host
NEXT_PUBLIC_DB_USER=your_database_user
NEXT_PUBLIC_DB_PASSWORD=your_database_password
NEXT_PUBLIC_DB_NAME=your_database_name
Run the application:

npm run dev
The app should now be running on http://localhost:3000.

Usage
Navigate to the trainer or client dashboard.
Trainers can assign clients and interact with them.
Clients can view their trainer and chat with them in real time.
Future Enhancements
Workout Tracking: Add functionality for clients to log their daily workouts and progress.
Notifications: Implement a notification system for both trainers and clients.
Profile Settings: Allow users to update their personal details (e.g., name, email, fitness level).
Admin Panel: Add an admin panel for managing users, trainers, and clients.
Analytics: Implement analytics for trainers to track client performance over time.
License
This project is licensed under the MIT License.