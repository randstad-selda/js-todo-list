/*--------------------
    VARIABLES
---------------------*/
const formElement = document.querySelector("#form");

// const lists = ["Fare la spesa", "Guardare la Roma", "Portare fuori il cane"];
// const lists = [
//   {
//     userId: 1,
//     id: 1,
//     title: "Fare la spesa",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 2,
//     title: "Guardare la Roma",
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 3,
//     title: "Portare fuori il cane",
//     completed: true,
//   },
// ];
/*--------------------
    FUNCTIONS
---------------------*/

const renderList = function () {
  document.querySelector("#list").innerHTML = "";
  lists.forEach(function (elm) {
    const liElement = document.createElement("li");
    liElement.textContent = elm.title;
    if (elm.completed) {
      liElement.classList.add("done");
    }
    liElement.id = elm.id;
    document.querySelector("#list").append(liElement);
  });
};

/*--------------------
    INIT - Caricamento della pagina
---------------------*/
let lists = [];
fetch(`https://jsonplaceholder.typicode.com/todos`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    lists = data;
    renderList();
  });
/*--------------------
    EVENTS
---------------------*/
formElement.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = document.querySelector("#input-field").value;
  const newTodo = {
    userId: 1,
    id: 3,
    title: inputValue,
    completed: false,
  };
  lists.unshift(newTodo);
  renderList();
  formElement.reset();
});

document.querySelector("#list").addEventListener("click", function (e) {
  let i = 0;

  while (i < lists.length) {
    if (lists[i].id == e.target.id) {
      lists[i].completed = !lists[i].completed;
      e.target.classList.toggle("done");
      return;
    }
    i++;
  }
});
