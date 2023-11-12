const salary = document.getElementById('salary');
const amountLeft = document.getElementById('amtLeft'); 
const amountSpent = document.getElementById('amtSpent'); 
const itemSpent = document.getElementById('itmSpent'); 
const boughtList = document.getElementById('bought_list');
const wageList = document.getElementById('wage_list');

// Global variables for tracking income and expenses
var expenses = 0;
var income = 0;

// Budget class to handle income and expenses
class Budget {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }

    appendSalary() {
        income += this.amount;
        var save = this.amount;
        this.updateBudgetDisplay();
        const wageText = document.createElement('li');
        wageText.innerHTML = `${this.name}: $${this.amount}`;
        wageList.appendChild(wageText);

        wageText.addEventListener('click', function () {
            wageText.remove();
            income -= save;
            this.updateBudgetDisplay();
        }.bind(this));
    }

    appendExpenses() {
        expenses += this.amount;
        var save = this.amount;
        this.updateBudgetDisplay();
        const expenseText = document.createElement('li');
        expenseText.innerHTML = `${this.name}: $${this.amount}`;
        boughtList.appendChild(expenseText);

        expenseText.addEventListener('click', function () {
            expenseText.remove();
            expenses -= save;
            this.updateBudgetDisplay();
        }.bind(this));
    }

    updateBudgetDisplay() {
        amountLeft.innerHTML = `$${(income - expenses).toFixed(2)}`;
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
