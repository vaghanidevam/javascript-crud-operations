const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const list = document.querySelector('#list');

let items = JSON.parse(localStorage.getItem('items')) || [];

function saveItems() {
    localStorage.setItem('items', JSON.stringify(items));
}

function displayItems() {
    list.innerHTML = ''; 
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `Name: ${item.name}, Email: ${item.email} 
            <button onclick="editItem(${index})" class="edit">Edit</button>
            <button onclick="deleteItem(${index})" class="delete">Delete</button>`;
        list.appendChild(li);
    });
}

function addItem() {
    const name = nameInput.value;
    const email = emailInput.value;
    if (name && email) {
        const newItem = { name, email }; 
        items.push(newItem);
        nameInput.value = ''; 
        emailInput.value = ''; 
        saveItems(); 
        displayItems(); 
}
}

function editItem(index) {
    const newName = prompt('Edit name:', items[index].name);
    const newEmail = prompt('Edit email:', items[index].email);

    if (newName && newEmail) {
        items[index] = { name: newName, email: newEmail };
        saveItems(); 
        displayItems(); 
    }
}

function deleteItem(index) {
   
        items.splice(index, 1);
        saveItems();
        displayItems();
    
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    addItem();
});
displayItems();
