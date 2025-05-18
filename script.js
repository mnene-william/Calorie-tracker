
const foodForm = document.getElementById('food-form');
const foodList = document.getElementById('food-items');
const totalCalories = document.getElementById('total-calories');
const resetBtn = document.getElementById('reset-btn');
const displayMessage = document.getElementById("display-message");


let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];


function calculateTotalCalories() {
    let total = 0;
    foodItems.forEach(item => {
       total += Number(item.calories);
    });
    totalCalories.textContent = total;
}


function updateFoodItems() {
    foodList.innerHTML = '';
    foodItems.forEach((item, index) => {
        let list = document.createElement('li');
        list.innerHTML = `
            ${item.name}: ${item.calories} calories
            <button data-index="${index}">Remove</button>
        `;
        foodList.appendChild(list);
    });
    calculateTotalCalories();
}


function addFoodItem(event) {
    event.preventDefault();
    const foodName = document.getElementById('food-name').value;
    const calories = (document.getElementById('calories').value);

    if (foodName && calories) {
        foodItems.push({ name: foodName, calories: calories });
        displayMessage.textContent = "Entry successfully made"
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        updateFoodItems();
        foodForm.reset();
    }
}



function removeFoodItem(event) {
    if (event.target.tagName === 'BUTTON') {
        const index = (event.target.dataset.index);
        foodItems.splice(index, 1);
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        updateFoodItems();
    }
}

function resetCalorieCounter() {
    foodItems = [];
    localStorage.removeItem('foodItems');
    updateFoodItems();
}


foodForm.addEventListener('submit', addFoodItem);
foodList.addEventListener('click', removeFoodItem);
resetBtn.addEventListener('click', resetCalorieCounter);


updateFoodItems();