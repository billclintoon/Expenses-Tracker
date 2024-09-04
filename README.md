# Expense Tracker CLI

This is a simple command-line interface (CLI) application for tracking and managing your expenses.

## Features

- Add a new expense with a description and amount
- Update an existing expense
- Delete an expense by ID
- List all expenses
- View a summary of all expenses
- View a summary of expenses for a specific month

## Usage

### Adding an Expense
```
node expenseTracker.js add --description "Lunch" --amount 20

```

### Listing Expenses
```
node expenseTracker.js list
```
### Deleting an Expense
```
node expenseTracker.js delete --id 1

```

### Viewing Expense Summary
```
node expenseTracker.js summary
node expenseTracker.js summary --month 8
```
### Data Storage
Expenses are stored in a expenses.json file in the following structure:
```
[
    {
        "id": 1,
        "date": "2024-08-06",
        "description": "Lunch",
        "amount": 20
    }
]
```

