let popup = document.querySelector('.popup'),
    left_menu = document.querySelector('.left-menu'),
    right_menu = document.querySelector('.right-menu'),
    editBtn = document.querySelector('.edit'),
    closeBtn = document.querySelector('.closeBtn'),
    container = document.querySelector('.container'),
    menu = document.querySelector('.menu'),
    popuoBox = document.querySelector('.popuo-box'),
    donebtn = document.querySelector('.doneBtn');



let srcImg;
let color;


function getlocalStorage() {
    srcImg = localStorage.getItem('img');
    container.style.background = `url(${srcImg})`;
}

getlocalStorage();

function changeBg(el) {
    donebtn.addEventListener('click', () => {
        localStorage.setItem('img', el.src);
        getlocalStorage();
        hide(popup);
    });
}



function hide(el) {
    el.classList.remove('active');
}


function view_popup(el) {
    el.classList.add('active');
}


function changeActive(el) {
    document.querySelectorAll('.tool')
        .forEach(el => el.classList.remove('active'));

    let id = el.getAttribute('data-index');
    el.classList.add('active');


    document.querySelectorAll('.box')
        .forEach(el => el.classList.remove('active'));

    document.querySelector(`.box[data-in="${id}"]`)
        .classList.add('active');
}


function getlocalStorageColor() {
    document.querySelector('body').className = '';
    color = localStorage.getItem('color');
    document.querySelector('body').className = color;
}

getlocalStorageColor();

function changeColor(color) {
    try {
        donebtn.addEventListener('click', () => {
            localStorage.setItem('color', color);
            getlocalStorageColor();
            hide(popup);
        });
    } catch (error) {
        console.error(error);
    }
}




right_menu.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;
    if (target.tagName === 'IMG') {
        document.querySelectorAll('.bg-img')
            .forEach(el => el.classList.remove('active'));

        target.parentElement.classList.add('active')

        changeBg(target);
    }

    if (target.classList.contains('color-is')) {
        changeColor(target.id);
        document.querySelectorAll('.color-is')
            .forEach(el => el.classList.remove('active'));
        target.classList.add('active');
    }
});




left_menu.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;

    if (!target.classList.contains('tool')) return;
    changeActive(target);
});




document.querySelectorAll('.tool')
    .forEach(el => {
        el.addEventListener('click', () => {
            left_menu.classList.toggle('active');
            menu.classList.toggle('active');
        });
    });

let menu_res = document.querySelector('.menu-res');


menu.addEventListener('click', () => {
    left_menu.classList.toggle('active');
    menu.classList.toggle('active');
});


menu_res.addEventListener('click', () => {
    left_menu.classList.toggle('active');
    menu.classList.toggle('active');
});


editBtn.addEventListener('click', () => {
    view_popup(popup);
});
closeBtn.addEventListener('click', () => {
    hide(popup);
});





let urlInput = document.querySelector('.url-input'),
    nameInput = document.querySelector('.name-input'),
    addedContainer = document.querySelector('.addedDiv'),
    closeUrlBtn = document.querySelector('.closeUrl'),
    addLebel = document.querySelector('#add-lebel'),
    doneUrlBtn = document.querySelector('.doneUrlBtn'),
    lebelsContainer = document.querySelector('.labels');




let notes = JSON.parse(localStorage.getItem('notes')) || [];



function arr_push() {
    let note_info = {
        title: nameInput.value,
        href: urlInput.value,
    }

    notes.push(note_info);
    add_label(note_info);
}



function add_label(obj, id) {
        let newLebel =
        `
        <div class="lebel" id="${id}">
            <div class="popup-lebel">
                <p>Remove<i class="fa-solid fa-trash"></i></p>
            </div>
            <i class="fa-solid fa-ellipsis-vertical" id="option"></i>
            <a href="${obj.href}" class="lebel-logo"><i class="fa-solid fa-link"></i></a>
            <div class="title">${obj.title}</div>
        </div>   
        `;
        localStorage.setItem('notes', JSON.stringify(notes));
        lebelsContainer.insertAdjacentHTML('afterbegin', newLebel);
}


notes.forEach((el, i) => {
    add_label(el,i);
});



let option_btns = document.querySelectorAll('#option');







option_btns.forEach(el => {
    el.addEventListener('click', () => {
        let id = el.parentElement.id;
        let lebel = el.parentElement.querySelector(".popup-lebel");
        lebel.classList.toggle("active");
        

        lebel.querySelector("p").addEventListener("click", function () {
            notes.splice(id,1);
            localStorage.setItem('notes', JSON.stringify(notes));
            this.parentElement.parentElement.remove();
        });
    });
});






closeUrlBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hide(addedContainer);
});
addLebel.addEventListener('click', () => {
    view_popup(addedContainer);
});



doneUrlBtn.addEventListener('click', (e) => {
    e.preventDefault();
    arr_push();
    hide(addedContainer);
    nameInput.value = urlInput.value = '';
});




nameInput.addEventListener('input', () => {
    nameInput.value !== '' ? doneUrlBtn.style.display = 'block' : doneUrlBtn.style.display = 'none';
});





let form = document.querySelector('.search');
let searchInput = document.querySelector('.search input');

form.addEventListener('submit', () => {
    let url = 'https://www.google.com/search?q=';
    window.open(url + searchInput.value);
});

