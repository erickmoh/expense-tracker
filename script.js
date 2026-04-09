let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addExpense);

function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (!name || !amount || !date) {
        alert("Fill all fields");
        return;
    }

    const expense = {
        id: Date.now(),
        name,
        amount: Number(amount),
        category,
        date
    };

    expenses.push(expense);

    saveData();
    render();

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
}

function deleteExpense(id) {
    expenses = expenses.filter(e => e.id !== id);
    saveData();
    render();
}

function render() {
    const list = document.getElementById("list");
    const totalEl = document.getElementById("total");

    list.innerHTML = "";

    let total = 0;

    expenses.forEach(e => {
        total += e.amount;

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="top">
                ${e.name}
                <span>$${e.amount}</span>
            </div>
            <div class="meta">
                <span>${e.category} • ${formatDate(e.date)}</span>
                <span class="delete" onclick="deleteExpense(${e.id})">Delete</span>
            </div>
        `;

        list.appendChild(li);
    });

    totalEl.textContent = total;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
}

render();