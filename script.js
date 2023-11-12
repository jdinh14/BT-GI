const salary = document.getElementById('salary');
const amountLeft = document.getElementById('amtLeft'); 
const amountSpent = document.getElementById('amtSpent'); 
const itemSpent = document.getElementById('itmSpent'); 
const boughtList = document.getElementById('bought_list');
const wageList = document.getElementById('wage_list');

// Global variables for tracking income and expenses
var expenses = 0;
var income = 0;


class Budget {
    // Constructor for the Budget class
    constructor(name, amount) {
        this.name = name;      // Name of the budget item
        this.amount = amount;  // Amount of the budget item
    }

    // Method to add salary to the overall budget
    appendSalary() {
        income += this.amount;  // Add the salary amount to the total income
        var save = this.amount;  // Save the current amount for later use

        // Update the budget display
        this.updateBudgetDisplay();

        // Create a list item for the salary
        const wageText = document.createElement('li');
        wageText.innerHTML = `${this.name}: $${this.amount}`;
        wageList.appendChild(wageText); // Append the salary item to the wage list in the UI

        // Add click event listener to the salary item for removal
        wageText.addEventListener('click', function () {
            wageText.remove();   // Remove the item from the list
            income -= save;      // Deduct the salary amount from the total income
            this.updateBudgetDisplay(); // Update the budget display
        }.bind(this));
    }

    // Method to add expenses to the overall budget
    appendExpenses() {
        expenses += this.amount; // Add the expense amount to the total expenses
        var save = this.amount;   // Save the current amount for later use

        // Update the budget display
        this.updateBudgetDisplay();

        // Create a list item for the expense
        const expenseText = document.createElement('li');
        expenseText.innerHTML = `${this.name}: $${this.amount}`;
        boughtList.appendChild(expenseText); // Append the expense item to the expenses list in the UI

        // Add click event listener to the expense item for removal
        expenseText.addEventListener('click', function () {
            expenseText.remove();  // Remove the item from the list
            expenses -= save;      // Deduct the expense amount from the total expenses
            this.updateBudgetDisplay(); // Update the budget display
        }.bind(this));
    }

    // Method to update the budget display in the UI
    updateBudgetDisplay() {
        // Calculate and display the amount left after expenses
        amountLeft.innerHTML = `$${(income - expenses).toFixed(2)}`;
        // Change the color of the display based on the budget status
        amountLeft.style.color = (income - expenses) < 0 ? 'red' : 'white';
    }
}


// Event listener for adding a new wage
document.getElementById('newWage').addEventListener('click', function () {
    if (salary.value !== '') {
        var amountAdd = parseFloat(salary.value);
        let newWage = new Budget('Salary', amountAdd);
        newWage.appendSalary();
        salary.value = '';
    }
});

// Event listener for adding a new expense
document.getElementById('newExpense').addEventListener('click', function () {
    if (itemSpent.value !== '' && amountSpent.value !== '') {
        var amountAdd = parseFloat(amountSpent.value);
        let newExpense = new Budget(itemSpent.value, amountAdd);
        newExpense.appendExpenses();
        itemSpent.value = '';
        amountSpent.value = '';
    } else {
        alert('Please Enter MISSING Values');
    }
});
