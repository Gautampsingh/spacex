
# SpaceX Energy Dashboard

This project is a React-based dashboard for visualizing SpaceX launch data and energy statistics. It features authentication, data charts, and a modern UI.

## Features

- User authentication (admin/guest)
- Dashboard with launch statistics and energy information
- Interactive charts for launches and energy
- Pagination and navigation
- Responsive design using Material UI

## Technologies Used

- React, TypeScript
- Redux Toolkit for state management
- Apollo Client for GraphQL data fetching
- Material UI for UI components
- React Router for navigation

## Architecture Overview

- **Frontend:** React components (Login, Dashboard, Launches, LaunchChart, EnergyInformation, Navigation, Pagination)
- **State:** Redux store with launchesSlice
- **Data:** Apollo Client connects to SpaceX API via GraphQL
- **Auth:** AuthContext manages login/logout and error state
- **Logic:** Utility functions for energy calculations

## Setup & Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm start
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Testing

- Unit tests for components and utilities
- Run `npm test` to launch the test runner

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
