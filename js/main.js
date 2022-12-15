let form = document.querySelector("form");
let tasksParent = document.querySelector(".tasks");
let addBtn = document.querySelector(`input[type="submit"]`);
let input = document.querySelector(`input[type="text"]`);
let editBox = document.querySelector(".edit-box");
let editedVal = document.querySelector(".edit-box input");

let tasks = [];

// localStorage.clear();

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

returnData();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value != "") {
    addToList(input.value);
    input.value = "";
  }
});

function addToList(val) {
  let task = {
    id: Date.now(),
    title: val,
  };

  tasks.push(task);

  createTaskEl(tasks);

  addToLocal(tasks);
}

function createTaskEl(tasks) {
  tasksParent.innerHTML = "";
  tasks.forEach((task) => {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.setAttribute("id", task.id);

    let p = document.createElement("p");
    p.appendChild(document.createTextNode(task.title));

    let iconsDiv = document.createElement("div");
    iconsDiv.className = "icons";

    let edit = document.createElement("div");
    edit.className = "edit";
    let iconEdit = document.createElement("i");
    iconEdit.className = "fa-solid fa-pen-to-square";
    edit.appendChild(iconEdit);
    iconsDiv.appendChild(edit);

    let del = document.createElement("div");
    del.className = "del";
    let iconDel = document.createElement("i");
    iconDel.className = "fa-solid fa-trash-can";
    iconDel.classList.add("rem");
    del.appendChild(iconDel);
    iconsDiv.appendChild(del);

    taskDiv.appendChild(p);
    taskDiv.appendChild(iconsDiv);

    tasksParent.appendChild(taskDiv);
  });
}

function addToLocal(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function returnData() {
  let data = JSON.parse(localStorage.getItem("tasks"));
  if (data) {
    createTaskEl(data);
  }
}

// delete
tasksParent.addEventListener("click", (e) => {
  // if (e.target.tagName == "svg") {
  //   e.target.parentElement.parentElement.parentElement.remove();
  //   console.log(e.target.tagName);
  // }
  if (e.target.parentElement.classList.contains("del")) {
    deleteFromLocal(
      e.target.parentElement.parentElement.parentElement.getAttribute("id")
    );
    e.target.parentElement.parentElement.parentElement.remove();
    console.log(e.target.parentElement);
  }

  if (e.target.parentElement.classList.contains("edit")) {
    editedVal.value =
      e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;

    editBox.style.display = "block";

    document.onkeydown = function (ev) {
      if (ev.keyCode == "13") {
        e.target.parentElement.parentElement.parentElement.firstElementChild.textContent =
          editedVal.value;
        editBox.style.display = "none";
      }
    };

    console.log(editedVal.value);
  }
});

tasksParent.addEventListener("dblclick", (e) => {
  e.target.classList.toggle("done");
});

function deleteFromLocal(ele) {
  tasks = tasks.filter((task) => task.id != ele);
  addToLocal(tasks);
}

///////////// search for tasks //////////////////
let searchInput = document.querySelector(".search input[type=search]");

searchInput.addEventListener("input", () => {
  let data;
  if (searchInput.value != "") {
    data = tasks.filter((el) => el.title.includes(searchInput.value));
    createTaskEl(data);
  } else {
    createTaskEl(tasks);
  }
});
