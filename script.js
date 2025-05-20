const foodForm = document.getElementById('food-form');
const foodList = document.getElementById('food-items');
const totalCalories = document.getElementById('total-calories');
const resetBtn = document.getElementById('reset-btn');
const message = document.getElementById("displayMessage");
const message2 = document.getElementById("displaymessage");

let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];

function calculateTotalCalories() {
    let total = 0;
    foodItems.forEach(item => {
        total += parseFloat(Number(item.calories));
    });
    totalCalories.textContent = total;
}

function updateFoodItems() {
    foodList.innerHTML = '';
    foodItems.forEach((item, index) => {
        const list = document.createElement('li');
        list.classList.add("list");
        list.innerHTML = `
            <div class ="name">
                <h4>${item.name}</h4>
            </div>
            <div class="calories">
                <span>${item.calories} Calories</span>
            </div>
        `;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = 'X';
        deleteButton.style.backgroundColor = 'red';
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", () => {
            foodItems.splice(index, 1);
            localStorage.setItem('foodItems', JSON.stringify(foodItems));
            message2.textContent = "Item deleted successfully!";
            message2.style.color = "green";
            setTimeout(() => {
                message2.textContent = "";
            }, 2000);
            updateFoodItems();
        });
        list.appendChild(deleteButton);
        foodList.appendChild(list);
    });
    calculateTotalCalories();
}

foodForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const foodName = document.getElementById("food-name").value.trim();
    if (foodName) {
        message.textContent = "Entry added successfully!";
        message.style.color = "green";
        setTimeout(() => {
            message.textContent = "";
        }, 2000);
        const data = await caloriesCount(foodName);
        while (data.length > 0) {
            foodItems.push(data[0]);
            data.shift();
        }
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        updateFoodItems();
    } else {
        message.textContent = "Invalid input";
        message.style.color = "red";
        setTimeout(() => {
            message.textContent = "";
        }, 2000);
    }
});

async function caloriesCount(foodName) {
    let url = 'https://api.calorieninjas.com/v1/nutrition?query=' + encodeURIComponent(foodName);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'XFDsxc3xj/8HJ+kr0Q3stg==Maxw3NfG4WV3O5Bc',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        const result = await response.json();
        return result.items.map(item => ({
            name: item.name,
            calories: item.calories
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

resetBtn.addEventListener('click', () => {
    foodItems = [];
    localStorage.removeItem('foodItems');
    updateFoodItems();
});

updateFoodItems();
