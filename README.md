# PGATS Automation Exercise - Cypress

This project contains automation for the main flows of the [automationexercise.com](https://automationexercise.com/) website using the [Cypress](https://www.cypress.io/) framework.

## 📋 Description

End-to-end test automation for the Automation Exercise website, including:
- User registration
- Login/logout
- Product search
- Product details view
- Contact form test
- Newsletter subscription test
- Complete purchase flow (place order)

The tests are organized in a modular way, using Page Objects to facilitate maintenance and reuse.

## 📁 Project Structure

```
cypress/
  e2e/
    automation-exercise.-modules.cy.js   # Main test file
  modules/
    contact/
    login/
    menu/
    order/
    products/
    register/
    subscription/
  fixtures/
    ContactUs.json
  support/
    helpers.js
```

## 🚀 How to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the tests in interactive mode:**
   ```bash
   npx cypress open
   ```
   Or in headless mode:
   ```bash
   npx cypress run
   ```

## 🧩 Main Tests Implemented

- **TEST 01:** User registration
- **TEST 02:** Login with valid user
- **TEST 03:** Login with invalid user
- **TEST 04:** Logout
- **TEST 05:** Registration with existing email
- **TEST 06:** Contact form
- **TEST 08:** View all products and details
- **TEST 09:** Product search
- **TEST 10:** Newsletter subscription on home page
- **TEST 15:** Complete purchase flow (Place Order)

## 🛠️ Technologies

- [Cypress](https://www.cypress.io/)
- [Faker.js](https://fakerjs.dev/) (for dynamic data generation)
- JavaScript (ES6)

## 💡 Best Practices

- Modularization of flows in `modules/` for easier maintenance.
- All assertions are centralized in the spec files.
- Use of dynamic data to avoid conflicts in registrations.

## 🤝 Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

**Developed for study purposes and test automation demonstration.**
