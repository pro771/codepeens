# CodePen Clone

A CodePen-inspired web application with HTML, CSS, and JavaScript code editors and live preview functionality. This application allows users to create, save, and edit web projects with real-time preview.

## Features

- Live code editor for HTML, CSS, and JavaScript
- Real-time preview of code changes
- Persistent storage with PostgreSQL database
- Save and load projects
- Responsive design

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - CodeMirror (for code editors)
  - TanStack Query (for data fetching)
  - Shadcn/ui (for UI components)

- Backend:
  - Express.js
  - PostgreSQL
  - Drizzle ORM

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/codepen-clone.git
   cd codepen-clone
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   Make sure you have PostgreSQL installed and running.
   Create a `.env` file in the root directory with the following content:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/codepen_clone
   ```

4. Run the application:
   ```
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Screenshots

[Add screenshots of your application here]

## License

MIT

## Credits

Created by [Your Name]