let toDoContainer = document.querySelector("#toDoContainer");
let form = document.querySelector("#form");
let savedElements = JSON.parse(localStorage.getItem("layoutlist"));

/**
 * It takes a todo and a target element, and adds the todo to the target element.
 * @param todo - The todo text
 * @param targetElement - The element that the todo will be added to.
 */
const ADD_TODO = (todo, targetElement) => {
  targetElement.innerHTML += `
    <div class="todo">
      <li class="todo-text">
        ${todo}
      </li>

      <div class="buttons-div">
        <button class="removeTodo-btn" onclick="DELETE_TODO(this.parentElement.parentElement)">
          <i class="fas fa-trash"></i>
        </button>
        <button class="checkTodo-btn" onclick="COMPLETE_TODO(this)">
          <i class="fas fa-check"></i>
        </button>
      </div>
    </div>
  `;
};

/* Checking to see if there is anything saved in localStorage. If there is, it clears the toDoContainer
element and then loops through the savedElements array and calls the ADD_TODO function for each item
in the array. */
if (savedElements) {
  toDoContainer.innerHTML = "";

  savedElements.forEach((item) => {
    ADD_TODO(item.todo, toDoContainer);
  });
}

/* Listening for a submit event on the form. When the submit event is triggered, it prevents the
default action of the event, which is to reload the page. It then gets the target of the event,
which is the form. It then creates a new FormData object with the form as the parameter. It then
gets the value of the input with the name of "todo". If the value of the input is not empty, it
calls the ADD_TODO function, passing in the value of the input and the toDoContainer element. It
then resets the form and calls the SAVE_TODO function. */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formTarget = e.target;
  let formData = new FormData(formTarget);
  let todo = formData.get("todo");

  if (todo) {
    ADD_TODO(todo, toDoContainer);

    formTarget.reset();
    SAVE_TODO();
  }
});

/**
 * It takes the todo-text from each todo-item and saves it to localStorage.
 */
const SAVE_TODO = () => {
  let nodeList = toDoContainer.querySelectorAll(".todo");

  let elementsObj = [...nodeList].map((item) => {
    return {
      todo: item.querySelector(".todo-text").textContent.trim(),
    };
  });

  localStorage.setItem("layoutlist", JSON.stringify(elementsObj));
};

/**
 * When the user clicks the delete button, the todo item is removed from the DOM and the todo list is
 * saved to local storage.
 * @param element - The element that is being deleted.
 */
const DELETE_TODO = (element) => {
  element.remove();
  SAVE_TODO();
};

/**
 * It takes the element that was clicked on, finds the parent element of that element, finds the li element within
 * that element, and then changes the color of the text within that li element to green.
 *
 * @param element - The element that was clicked.
 */
const COMPLETE_TODO = (element) => {
  let paragraph = element.parentElement.parentElement.querySelector("li");

  paragraph.style.color = "#00ca00";
  element.style.display = "none";
};
