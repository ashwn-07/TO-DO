//login validation using callback
function tocheck(event, rdcrt) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var pass = document.getElementById("password").value;

  if ((username == "admin") & (pass == "12345")) {
    rdcrt();
  } else {
    alert("invalid login");
  }
}
// callback to redirect to main page
var rd=  () => {
  window.location.href = "main.html";
}

//to fetch json by xmlhttp request
function fetchTodos() {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(Error(xhr.statusText));
      }
    };
    xhr.onerror = function () {
      reject(Error("Network Error"));
    };
    xhr.send();
  });
}
//calling the function to execute promise
function processTodos() {
  fetchTodos()
    .then((todos) => {
      var completedCount = 0;
      var todoList = document.getElementById("todo-list");

      todos.forEach(function (todo) {
        var listItem = document.createElement("li");
        listItem.classList.add("myitem");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("mycheck");

        listItem.appendChild(checkbox);
        var titleNode = document.createTextNode(todo.title); // Create a text node with the todo title
        listItem.appendChild(titleNode); // Append the text node to the listItem
        todoList.appendChild(listItem);

        checkbox.addEventListener("change", function (event) {
          if (checkbox.checked) {
            completedCount++;
            console.log(completedCount);
          } else {
            completedCount--;
          }

          if (completedCount === 5) {
            alert("Congrats. 5 Tasks have been Successfully Completed");
          }
        });
      });
    })
    .catch(function (error) {
      console.log("Error:", error);
    });

  var cng = document.getElementById("demodiv");
  console.log(cng);
  cng.parentNode.removeChild(cng);
}