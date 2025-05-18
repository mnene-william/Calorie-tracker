// Get DOM elements
const foodForm = document.getElementById('food-form');
const foodList = document.getElementById('food-items');
const totalCalories = document.getElementById('total-calories');
const resetBtn = document.getElementById('reset-btn');

// Initialize food items from localStorage or empty array
let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];

// Calculate total calories
function calculateTotalCalories() {
    let total = 0;
    foodItems.forEach(item => {
       sum += item.calories;
    });
    totalCalories.textContent = total;
}

// Render food items to the list
function updateFoodItems() {
    foodList.innerHTML = '';
    foodItems.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
            ${item.name}: ${item.calories} calories
            <button data-index="${index}">Remove</button>
        `;
        foodList.appendChild(li);
    });
    calculateTotalCalories();
}

// Add new food item
function addFoodItem(event) {
    event.preventDefault();
    const foodName = document.getElementById('food-name').value;
    const calories = (document.getElementById('calories').value);

    if (foodName && calories) {
        foodItems.push({ name: foodName, calories: calories });
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        updateFoodItems();
        foodForm.reset();
    }
}

// Remove food item
function removeFoodItem(event) {
    if (event.target.tagName === 'BUTTON') {
        const index = (event.target.dataset.index);
        foodItems.splice(index, 1);
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        updateFoodItems();
    }
}

// Reset the calorie counter
function resetCalorieCounter() {
    foodItems = [];
    localStorage.removeItem('foodItems');
    updateFoodItems();
}

// Event listeners
foodForm.addEventListener('submit', addFoodItem);
foodList.addEventListener('click', removeFoodItem);
resetBtn.addEventListener('click', resetCalorieCounter);

// Initial render
updateFoodItems();