// UI DOM Selectors
const addButton = document.querySelector(".add-link");
const popup = document.querySelector(".add-popup");
const listPopup = document.querySelector(".add-list-popup");
const closePopupBtn = document.querySelector(".popup-close");
const closeListPopupBtn = document.querySelector(".list-popup-close");
const blur = document.querySelector("#blur");
const newListField = document.querySelector(".title-field");
const addCard = document.querySelector("#addCard");
const subListField = document.querySelector(".list-field");
const addList = document.querySelector("#addList");
const cardContainer = document.querySelector(".card-container");
const taskTitle = document.querySelector(".title");
const taskCard = document.querySelector(".task-card");
const emptyMessage = document.querySelector(".empty-message");
let addSubListContext;
let addSubListParentContext;
// UI Event Listener
addButton.addEventListener("click", displayPopup);
closePopupBtn.addEventListener("click", closePopup);
closeListPopupBtn.addEventListener("click", closeListPopup);
addCard.addEventListener("click", AddNewCard);
addList.addEventListener("click", addNewList);

// Array of card with card list
let cardTodo = [];

// UI LOADER
function uiLoader(cardTodo) {
    // Displaying empty task message
    if (cardTodo.length) {
        emptyMessage.style.display = "none";
    }
    for(let i = 0; i < cardTodo.length; i++) {
        const div = document.createElement("div");
        div.classList.add("task-card");
        div.setAttribute("cardid", cardTodo[i].id);
        div.innerHTML = `
            <div class="task-content">
                <p class="title">${cardTodo[i].cardTitle}</p>
                <hr class="task-content-horizontal">
                <div class="sub-task">
                <ul class="sub-task-ul">
                </ul>
                </div>
                <div class="card-crud">
                    <div class="crud-logo">
                    <i class="fas fa-trash-alt" onclick="removeCard(this)"></i>
                    <i onclick="displayAddListPopup(this)" class="add-link-sub content-add-icon fas fa-plus-circle"></i>
                    </div>
                </div>
            </div>
        `
        cardContainer.append(div);
        let SubListLength = cardTodo[i].subListTodo.length;
        cardId = div.getAttribute("cardid");
        for(let j = 0; j < SubListLength; j++) {
            const li = document.createElement("li");
            li.innerHTML = cardTodo[i].subListTodo[j].listName + " " + `<a class="mark-done" onclick="markItem(this)">mark</a>`;
            div.childNodes[1].childNodes[5].childNodes[1].append(li);
        }
    }
}
// Loading the ui
uiLoader(cardTodo);

// UI Functions
// Display add card popup 
function displayPopup() {
    popup.style.display = "block";
    blur.classList.toggle("active");
}
// Close add card Popup
function closePopup() {
    popup.style.display = "none";
    blur.classList = "";
}
// Display add list popup
function displayAddListPopup(context) {
    listPopup.style.display = "block";
    blur.classList.toggle("active");
    addSubListContext = context.parentNode.parentNode.parentNode.parentNode.getAttribute("cardid");
    addSubListParentContext = context.parentNode.parentNode.parentNode.childNodes[5].childNodes[1];
}
// Close add list Popup
function closeListPopup() {
    listPopup.style.display = "none";
    blur.classList = "";
}
// Add New Card
function AddNewCard() {
    let taskTitle = newListField.value;
    if(taskTitle == "") {
        alert("Please add the card name");
        return;
    }
    const item = {
        id: Date.now(),
        cardTitle: taskTitle,
        subListTodo: []
    }
    cardTodo.push(item);
    closePopup();
    // Rendering recently created card
    uiLoader([item]);
}

// Add new list
function addNewList() {
    let listItem = subListField.value;
    if(listItem == "") {
        alert("please add the list name");
        return;
    }
    const subListItem = {
        id: Date.now(),
        listName: listItem
    }
    for(let i = 0; i < cardTodo.length; i++) {
        if(addSubListContext == cardTodo[i].id) {
            // pushing sublist data into sublist array
            cardTodo[i].subListTodo.push(subListItem);
            // Passing the added item to render
            let itemIndex = cardTodo[i].subListTodo.length - 1;
            const li = document.createElement("li")
            li.innerHTML = cardTodo[i].subListTodo[itemIndex].listName + " " + `<a class="mark-done" onclick="markItem(this)">mark</a>`;
            addSubListParentContext.append(li);
        }
    }
    closeListPopup();
}
// Line through when sub task is completed
function markItem(liItem) {
    liItem.parentNode.style.textDecoration = "line-through";
}
// Delete the card
function removeCard(cardItem) {
    cardItem.parentNode.parentNode.parentNode.parentNode.remove();
}
