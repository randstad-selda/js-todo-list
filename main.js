/*--------------------
    VARIABLES
---------------------*/
const formElement = document.querySelector("#form");
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
    document.querySelector("#list").prepend(liElement);
  });
};

const renderError = function (err) {
  document.querySelector("#list").innerHTML = err;
};

/*--------------------
    INIT - Caricamento della pagina
---------------------*/
let lists = [];
fetch(`http://localhost:3000/todos`)
  .then(function (response) {
    if (!response.ok) throw new Error("Something went wrong! 😥");

    return response.json();
  })
  .then(function (data) {
    lists = data;
    renderList();
  })
  .catch(function (err) {
    renderError(err);
  });
/*--------------------
    EVENTS
---------------------*/
formElement.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = document.querySelector("#input-field").value;
  const newTodo = {
    title: inputValue,
    completed: false,
  };

  fetch(`http://localhost:3000/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then(function (response) {
      if (!response.ok) throw new Error("Something went wrong! 😥");
      return response.json();
    })
    .then(function (data) {
      lists.push(data);
      renderList();
    })
    .catch(function (err) {
      renderError(err);
    })
    .finally(function () {
      formElement.reset();
    });
});

document.querySelector("#list").addEventListener("click", function (e) {
  let i = 0;

  while (i < lists.length) {
    if (lists[i].id == e.target.id) {
      fetch(`http://localhost:3000/todos/${e.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !lists[i].completed }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          lists[i] = data;
          e.target.classList.toggle("done");
        });
      return;
    }
    i++;
  }
});
