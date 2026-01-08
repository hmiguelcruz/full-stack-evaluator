# Full Stack Evaluator: Project Notes

## Overview

This project is a simple Task Manager application built with a .NET 9 Backend and a React (Vite) Frontend. The goal was to fix existing issues, refactor the design to be cleaner and logic-focused, and implement basic user separation.

## Implemented Features

### Backend (.NET API)

- **User Separation**: Tasks are now filtered by `X-User-Id` header. This simulates a multi-user environment without full authentication.
- **Swagger Update**: Added `X-User-Id` header parameter to Swagger UI for easier testing.
- **CORS Policy**: Configured to allow requests from the frontend (localhost:5173/5175).
- **Service Layer**: `TaskService` now respects the `userId` when retrieving, updating, or deleting tasks.

### Frontend (React + Vite)

- **Design Refactor**: Removed TailwindCSS in favor of clean, maintainable Vanilla CSS variables and utility classes (`index.css`).
- **Context API**: Implemented `UserContext` to manage the selected user state globally.
- **User Switching**: Added a `UserSelect` component to easily switch between "currentUser" contexts.
- **Delete Confirmation**: Replaced immediate deletion with a custom `ConfirmationModal` for better UX.
- **Error Handling**: Improved error messages in the `Tasks` component when the backend is unavailable.

## Missing / Future Improvements

- **Real Authentication**: Currently uses a simulated User ID. Proper JWT auth (Identity) should be the next step.
- **Database Persistence**: Currently using `InMemory` or `SQLite` (depending on local config). Should switch to a persistent SQL Server or Postgres for production.
- **Task Sorting/Filtering**: Add ability to sort by priority or completion status.

## How to Test

1. **Start Backend**:

   ```bash
   cd backend
   dotnet run
   ```

   Backend runs on `http://localhost:5215` (or configured port).

2. **Start Frontend**:

   ```bash
   cd frontend
   npm run dev
   ```

   Frontend runs on `http://localhost:5173`.

3. **Usage**:
   - Use the dropdown in the top right to switch users.
   - Create tasks. They will be assigned to the current user.
   - Switch users to verify data isolation (User 1 shouldn't see User 2's tasks).
   - Try deleting a task to see the confirmation modal.
