# Copilot Instructions for CV Generator Front End

## Overview
This project is a CV generator front end that interacts with a backend service to manage and display portfolio data. Understanding the architecture and workflows is crucial for effective contributions.

## Architecture
- **Components**: The application is structured into various components, each responsible for specific UI elements and functionalities. Key components include:
  - `ProjectComponent`: Manages project data and interactions.
  - `FooterComponent`: Displays footer information and links.
  - `ReferenceArchitectureComponent`: Extends `FooterComponent` and provides additional functionalities related to the reference architecture.

- **Services**: Services are used for data management and business logic. Important services include:
  - `PortfolioService`: Handles portfolio data retrieval and manipulation.
  - `DataService`: Manages data loading and processing.
  - `InputService`: Manages user input across components.

## Developer Workflows
- **Building the Project**: Use `ng build` to compile the project. For production builds, include the `--configuration production` flag.
- **Running Tests**: Execute unit tests with `ng test`. This will run tests defined in the `*.spec.ts` files using Karma.
- **Debugging**: Utilize Angular's built-in debugging tools. Ensure that debugging information is preserved by using the appropriate flags during the build process.

## Project Conventions
- **Component Structure**: Each component should have a corresponding HTML template and SCSS file. Follow the naming convention of `component-name.component.ts`.
- **Service Injection**: Services are injected into components via the constructor. Ensure to use Angular's dependency injection properly to maintain clean and testable code.

## Integration Points
- The front end communicates with the backend via RESTful APIs. Ensure that all API calls are handled in the respective services.
- Use observables for asynchronous data handling, particularly when dealing with HTTP requests.

## External Dependencies
- The project relies on Angular and various Angular modules. Ensure that all dependencies are listed in `package.json` and are properly installed using npm.

## Communication Patterns
- Components communicate with each other through services. Use shared services to manage state and data flow between components.
- Event emitters can be used for parent-child component communication, especially for handling user interactions.

## Key Files
- **`src/app/components/`**: Contains all component files.
- **`src/app/services/`**: Contains all service files.
- **`package.json`**: Lists all project dependencies and scripts.

## Conclusion
This document serves as a guide for AI coding agents to understand the structure and workflows of the CV Generator Front End project. For further details, refer to the specific component and service files as needed.