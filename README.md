# Bug Alert

![BUG Alert am i responsive image](src/assets/main_image_responsive.png)

## Overview

Bug Alert is a frontend application designed to help developers track bugs and manage issues in their applications. Users can log in and add a project they want to track. Bugs, issues and console errors can be added. All registered users can add bugs and issues that they have observed. The issues are marked with their relative priority eg. Critical, High, Medium or Low.
Users can also add comments about specific issues. The owner of an added issue can mark the issue as resolved.
The goal of Bug Alert is to have a place where all issues are stored, so that teams working on specific projects can be alerted about bugs and therefore have them squashed more efficiently.

## Features

**Navigation Bar**

The logged out Navbar contains the app title and logo; sign in and sign up links.
The title is also a link to the start page.

![navbar logged out](src/assets/navbar_logged_out.png)

The logged in Navbar contains the logged in user's username, a link to the add a project page and a link to log out.

![navbar logged in](src/assets/navbar_logged_in.png)

**Sign in Page**
The Sign in page contains the form to sign in. It also contains 2 buttons: one to sign in and one to close the form. Also a link to the sign up form if the user doesn't have an account.

![sign in form](src/assets/signin_page.png)

**Sign up Page**
The sign up page contains a form for the user to create an account.
It contains 2 buttons: a submit button to sign up and a button to close the form. It also contains a link to the sign in page.

- Real-time updates
- Customizable notifications

## Installation

To install the Bug Alert frontend application, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bug-alert-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd bug-alert-frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the development server, run:

```bash
npm start
```

Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact us at [support@bugalert.com](mailto:support@bugalert.com).

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have a GitHub account.
- You have internet access.

### Setting Up the Development Environment

1. **Fork the repository**: Click the "Fork" button at the top right of the repository page to create a copy of the repository under your GitHub account.

2. **Clone your fork**: Clone the forked repository to your local machine.

   ```bash
   git clone https://github.com/yourusername/bug-alert-frontend.git
   ```

3. **Navigate to the project directory**:

   ```bash
   cd bug-alert-frontend
   ```

4. **Install the dependencies**:
   ```bash
   npm install
   ```

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

This will execute the test suite and display the results in the terminal.

### Building for Production

To create a production build of the application, run:

```bash
npm run build
```

The production-ready files will be generated in the `build` directory.

## Project Structure

The project structure is as follows:

```
bug-alert-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

- **public/**: Contains the static assets and the main HTML file.
- **src/**: Contains the source code of the application.
  - **components/**: Reusable UI components.
  - **pages/**: Page components for different routes.
  - **services/**: API service functions.
- **.gitignore**: Specifies files to be ignored by Git.
- **package.json**: Contains the project metadata and dependencies.
- **README.md**: The README file you are currently reading.

## Deployment

To deploy the application, you can use any static site hosting service such as Vercel, Netlify, or GitHub Pages. Follow the instructions provided by the hosting service to deploy the `build` directory.

## Acknowledgements

We would like to thank the following open-source projects and libraries that made this project possible:

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Axios](https://axios-http.com/)
- [Jest](https://jestjs.io/)

## Support

If you encounter any issues or have any questions, please open an issue on GitHub or contact us at [support@bugalert.com](mailto:support@bugalert.com).
