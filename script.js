const cardWrapper = document.getElementById("card-wrapper");
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const addBookForm = document.getElementById('add-book-form');
const overlay = document.getElementById('overlay');
let myLibrary = [];

addBookForm.onsubmit = addBookToLibrary;

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", "295 pages", "not read yet");

myLibrary.push(theHobbit);

displayBooks();

const getBookFromInput = () => {
    const title = document.getElementById('form-book-title').value;
    const author = document.getElementById('form-book-author').value;
    const pages = document.getElementById('form-book-pages').value;
    const isRead = document.getElementById('isRead').checked;
    return new Book(title, author, pages, isRead);
}

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    })
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
});

function openModal(modal){
    if(modal == null) return;
    addBookForm.reset();
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal){
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function Book(title, author, page, read){
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.page}, ${this.read}`;
}

function addBookToLibrary(e){
    e.preventDefault();
    const newBook = getBookFromInput();

    myLibrary.push(newBook);
    closeModal(addBookForm.closest('.modal'));
    displayBooks();
}

function clearBookDisplay(){
    cardWrapper.innerHTML = '';
}

function displayBooks(){
    clearBookDisplay();
    myLibrary.forEach((book, i) => {
        const card = document.createElement('div');
        const title = document.createElement('h1');
        const author = document.createElement('h2');
        const pages = document.createElement('h3');
        const read = document.createElement('p');
        const readBtn = document.createElement('button');
        const removeBtn = document.createElement('button');

        card.classList.add('card');
        card.dataset.bookId = i;
        title.innerText = book.title;
        author.innerText = book.author;
        pages.innerText = book.page;
        book.read ? read.innerHTML = "Read" :read.innerHTML = "Not read"
        readBtn.innerText = "Toggle read";
        readBtn.classList.add("read-btn");
        removeBtn.innerText = "Remove Book";
        removeBtn.classList.add('remove-btn');
        removeBtn.dataset.bookId = i;

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(readBtn);
        card.appendChild(removeBtn);
        cardWrapper.appendChild(card);
    });
}

//using event bubbling to find remove btn or toggle read
cardWrapper.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove-btn')){
        myLibrary.splice(e.target.dataset.bookId, 1);
        displayBooks();
    }
    //TODO: Toggle Read
})