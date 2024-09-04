const fs = require('fs');
const path = require('path');

const expensesFile = path.join(__dirname, 'expenses.json');

function loadExpenses() {
    if (!fs.existsSync(expensesFile)) {
        return [];
    }
    const data = fs.readFileSync(expensesFile, 'utf-8');
    return JSON.parse(data);
}

function saveExpenses(expenses) {
    fs.writeFileSync(expensesFile, JSON.stringify(expenses, null, 4));
}

function generateId(expenses) {
    return expenses.length > 0 ? Math.max(...expenses.map(expense => expense.id)) + 1 : 1;
}

const command = process.argv[2];
const args = process.argv.slice(3);

// Implement functions for add, update, delete, list, and summary
function addExpense(description, amount) {
    const expenses = loadExpenses();
    const newExpense = {
        id: generateId(expenses),
        date: new Date().toISOString().split('T')[0],  // YYYY-MM-DD format
        description,
        amount: parseFloat(amount),
    };
    expenses.push(newExpense);
    saveExpenses(expenses);
    console.log(`Expense added successfully (ID: ${newExpense.id})`);
}

if (command === 'add') {
    const descriptionIndex = args.indexOf('--description');
    const amountIndex = args.indexOf('--amount');

    if (descriptionIndex === -1 || amountIndex === -1) {
        console.log('Usage: node expenseTracker.js add --description "Description" --amount Amount');
    } else {
        const description = args[descriptionIndex + 1];
        const amount = args[amountIndex + 1];
        addExpense(description, amount);
    }
}
function listExpenses() {
    const expenses = loadExpenses();
    console.log('ID  Date       Description  Amount');
    expenses.forEach(expense => {
        console.log(`${expense.id}   ${expense.date}  ${expense.description}  $${expense.amount}`);
    });
}

if (command === 'list') {
    listExpenses();
}
function deleteExpense(id) {
    let expenses = loadExpenses();
    const initialLength = expenses.length;
    expenses = expenses.filter(expense => expense.id !== parseInt(id, 10));
    
    if (expenses.length === initialLength) {
        console.log(`Expense with ID ${id} not found.`);
    } else {
        saveExpenses(expenses);
        console.log(`Expense deleted successfully (ID: ${id})`);
    }
}

if (command === 'delete') {
    const idIndex = args.indexOf('--id');

    if (idIndex === -1) {
        console.log('Usage: node expenseTracker.js delete --id ID');
    } else {
        const id = args[idIndex + 1];
        deleteExpense(id);
    }
}
function getMonthFromDate(dateString) {
    return new Date(dateString).getMonth() + 1; // Get month from date (1-based)
}

function summary(month = null) {
    const expenses = loadExpenses();
    let filteredExpenses = expenses;

    if (month) {
        filteredExpenses = expenses.filter(expense => getMonthFromDate(expense.date) === parseInt(month, 10));
        console.log(`Total expenses for month ${month}: $${filteredExpenses.reduce((total, expense) => total + expense.amount, 0)}`);
    } else {
        console.log(`Total expenses: $${filteredExpenses.reduce((total, expense) => total + expense.amount, 0)}`);
    }
}

if (command === 'summary') {
    const monthIndex = args.indexOf('--month');

    if (monthIndex !== -1) {
        const month = args[monthIndex + 1];
        summary(month);
    } else {
        summary();
    }
}
