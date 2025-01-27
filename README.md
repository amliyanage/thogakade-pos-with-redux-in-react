# Thogakade POS with Redux in React

Welcome to the **Thogakade POS** project! 🛍️ This is a modern **Point of Sale (POS)** system built with **React** and **Redux** for state management. It allows businesses to manage their inventory and sales efficiently, all within a sleek, user-friendly interface. 

This project demonstrates how to integrate **React**, **Redux**, and **Redux Thunk** to handle asynchronous actions in a React app, providing a seamless POS experience.

---

## Table of Contents 📚

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features 🚀

- **Product Management**: Add, edit, or remove products from the inventory.
- **Shopping Cart**: Add and remove items to/from the shopping cart with real-time price updates.
- **Order History**: Keep track of completed transactions and their details.
- **Responsive Design**: Works seamlessly across desktop and mobile devices.
- **State Management with Redux**: Centralized state for managing products, cart, and user actions.
- **Asynchronous Actions**: Handle complex state changes with Redux Thunk for smooth user experience.

---

## Tech Stack ⚙️

- **Frontend**: React
- **State Management**: Redux, Redux Thunk
- **UI Framework**: tailwind (or any custom CSS)
- **TypeScript**: ES6+ JavaScrip

---

## Installation 🛠️

### Prerequisites

Before starting, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (or Yarn if preferred)

### Steps

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/amliyanage/thogakade-pos-with-redux-in-react.git
   ```

2. Navigate to the project directory:
   ```bash
   cd thogakade-pos-with-redux-in-react
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

Your app will be available at `http://localhost:3000`.

---

## Usage 💡

- **Viewing Products**: The products available for sale will be displayed on the main screen.
- **Managing Cart**: Add products to the cart by clicking on the "Add to Cart" button. You can view the cart at any time.
- **Checkout**: After adding products to the cart, proceed to checkout to complete the transaction.
- **Order History**: View completed transactions from the order history section.

The app leverages **Redux** for state management, allowing you to see updates in real-time as actions like adding or removing products are performed.

---

## Folder Structure 📁

Here’s an overview of the folder structure for the project:

```
thogakade-pos-with-redux-in-react/
├── public/
│   └── index.html           # Main HTML file
├── src/
│   ├── actions/             # Redux action creators
│   ├── components/          # Reusable UI components (e.g., Product, Cart)
│   ├── reducers/            # Redux reducers
│   ├── store/               # Redux store configuration
│   ├── App.js               # Main App component
│   ├── index.js             # Entry point for React app
│   └── styles/              # Custom styles
├── package.json             # Project dependencies and scripts
└── README.md                # This README file
```

---

