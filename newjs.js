let popup = document.querySelector(".popup"),
  left_menu = document.querySelector(".left-menu"),
  right_menu = document.querySelector(".right-menu"),
  editBtn = document.querySelector(".edit"),
  closeBtn = document.querySelector(".closeBtn"),
  container = document.querySelector(".container"),
  menu = document.querySelector(".menu"),
  popuoBox = document.querySelector(".popuo-box"),
  donebtn = document.querySelector(".doneBtn");

//

let imgSrc;

function getLocalStorage() {
  if (localStorage.getItem("img") === null) return;
  imgSrc = localStorage.getItem("img");
  container.style.background = `url(${imgSrc})`;
}

getLocalStorage();

///
function changeBg(el) {
  donebtn.addEventListener("click", () => {
    localStorage.setItem("img", JSON.stringify(el.src));
    getLocalStorage();
    hide(popup);
    console.log(el.src);
  });
}

function hide(el) {
  el.classList.remove("active");
}

function view_popup(el) {
  el.classList.add("active");
}

function changeActive(el) {
  document
    .querySelectorAll(".tool")
    .forEach((el) => el.classList.remove("active"));

  let id = el.getAttribute("data-index");
  el.classList.add("active");

  document
    .querySelectorAll(".box")
    .forEach((el) => el.classList.remove("active"));

  document.querySelector(`.box[data-in="${id}"]`).classList.add("active");
}

function changeColor(color) {
  try {
    donebtn.addEventListener("click", () => {
      document.querySelector("body").className = "";
      localStorage.setItem("color", JSON.stringify(color));
      document
        .querySelector("body")
        .classList.add(localStorage.getItem("color").slice(1, -1));
      hide(popup);
    });
  } catch (error) {
    console.error(error);
  }
}

changeColor();

right_menu.addEventListener("click", (e) => {
  e.preventDefault();
  let target = e.target;
  if (target.tagName === "IMG") {
    document
      .querySelectorAll(".bg-img")
      .forEach((el) => el.classList.remove("active"));

    target.parentElement.classList.add("active");

    changeBg(target);
    console.log(target);
  }

  if (target.classList.contains("color-is")) {
    changeColor(target.id);
    document
      .querySelectorAll(".color-is")
      .forEach((el) => el.classList.remove("active"));
    target.classList.add("active");
  }
});

left_menu.addEventListener("click", (e) => {
  e.preventDefault();
  let target = e.target;
  if (target.classList.contains("tool")) {
    changeActive(target);
  }
});

document.querySelectorAll(".tool").forEach((el) => {
  el.addEventListener("click", () => {
    left_menu.classList.toggle("active");
    menu.classList.toggle("active");
  });
});

menu.addEventListener("click", () => {
  left_menu.classList.toggle("active");
  menu.classList.toggle("active");
});

editBtn.addEventListener("click", () => {
  view_popup(popup);
});
closeBtn.addEventListener("click", () => {
  hide(popup);
});

let urlInput = document.querySelector(".url-input"),
  nameInput = document.querySelector(".name-input"),
  addedContainer = document.querySelector(".addedDiv"),
  closeUrlBtn = document.querySelector(".closeUrl"),
  addLebel = document.querySelector("#add-lebel"),
  doneUrlBtn = document.querySelector(".doneUrlBtn"),
  lebelsContainer = document.querySelector(".labels");





//////////////////////////////////////////////////////


// let items = JSON.parse(localStorage.getItem("ids"));
// let ids = JSON.parse(localStorage.getItem("ids")) || [];

function getLocalS(ids) {
  console.log(ids);

  if (!ids) return;

  ids.forEach((id) => {
    if (localStorage.getItem(`lebel-${id}`) === null) return;
    let lebel = JSON.parse(localStorage.getItem(`lebel-${id}`));
    lebelsContainer.insertAdjacentHTML("afterbegin", lebel);
  });
}

getLocalS(items);

function addLebelFn() {
  if (nameInput && urlInput === "") return;
  let inputValue = nameInput.value.toLowerCase();

  let generateId = Date.now().toString().slice(-6);

  let newLebel = `
   <div class="lebel" data-id ="${generateId}">
        <div class="popup-lebel">
            <p>Remove<i class="fa-solid fa-trash"></i></p>
        </div>
       <i class="fa-solid fa-ellipsis-vertical" id="option"></i>
       <div class="lebel-logo"><i class="fa-brands fa-${inputValue}"></i></div>
       <div class="title">${nameInput.value}</div>
   </div>   
   `;

  localStorage.setItem(`lebel-${generateId}`, JSON.stringify(newLebel));
  getLocalS([generateId]);

  ids.push(generateId);
  localStorage.setItem("ids", JSON.stringify(ids));
}

/////

lebelsContainer.addEventListener("click", (e) => {
  let target = e.target;
  if (target.id === "option") {
    let lebel = target.parentElement.querySelector(".popup-lebel");
    lebel.classList.toggle("active");

    lebel.querySelector("p").addEventListener("click", function () {
      // lebel.classList.remove("active");

      let id = target.parentElement.dataset.id;
      localStorage.removeItem(`lebel-${id}`);

      this.parentElement.parentElement.remove();
    });
  }
});

//////////////////////////////////////////////////////

closeUrlBtn.addEventListener("click", (e) => {
  e.preventDefault();
  hide(addedContainer);
});
addLebel.addEventListener("click", () => {
  view_popup(addedContainer);
});

doneUrlBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addLebelFn();
  hide(addedContainer);
});

nameInput.addEventListener("input", () => {
  if (nameInput.value !== "") {
    doneUrlBtn.style.display = "block";
  } else {
    doneUrlBtn.style.display = "none";
  }
});



let form = document.querySelector(".search");
let searchInput = document.querySelector(".search input");

form.addEventListener("submit", () => {
  let url = "https://www.google.com/search?q=";
  window.open(url + searchInput.value);
});













//////////////////////////////////////////////////////


let items = JSON.parse(localStorage.getItem("ids"));
let ids = JSON.parse(localStorage.getItem("ids")) || [];

function getLocalS(ids) {
    console.log(ids);

    if (!ids) return;

    ids.forEach((id) => {
        if (localStorage.getItem(`lebel-${id}`) === null) return;
        let lebel = JSON.parse(localStorage.getItem(`lebel-${id}`));
        lebelsContainer.insertAdjacentHTML("afterbegin", lebel);
    });
}

getLocalS(items);

function addLebelFn() {
    if (nameInput && urlInput === "") return;
    let inputValue = nameInput.value.toLowerCase();

    let generateId = Date.now().toString().slice(-6);

    let newLebel = `
   <div class="lebel" data-id ="${generateId}">
        <div class="popup-lebel">
            <p>Remove<i class="fa-solid fa-trash"></i></p>
        </div>
       <i class="fa-solid fa-ellipsis-vertical" id="option"></i>
       <div class="lebel-logo"><i class="fa-brands fa-${inputValue}"></i></div>
       <div class="title">${nameInput.value}</div>
   </div>   
   `;


   

    localStorage.setItem(`lebel-${generateId}`, JSON.stringify(newLebel));
    getLocalS([generateId]);

    ids.push(generateId);
    localStorage.setItem("ids", JSON.stringify(ids));
}

/////

lebelsContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target.id === "option") {
        let lebel = target.parentElement.querySelector(".popup-lebel");
        lebel.classList.toggle("active");

        lebel.querySelector("p").addEventListener("click", function () {
            // lebel.classList.remove("active");

            let id = target.parentElement.dataset.id;
            localStorage.removeItem(`lebel-${id}`);

            this.parentElement.parentElement.remove();
        });
    }
});

//////////////////////////////////////////////////////







closeUrlBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hide(addedContainer);
});
addLebel.addEventListener('click', () => {
    view_popup(addedContainer);
});



doneUrlBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addLebelFn();
    hide(addedContainer);
});
