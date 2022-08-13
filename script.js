let myLibrary = [];
const cardWrapper = document.getElementById("card-wrapper");
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

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

function addBookToLibrary(book){
    myLibrary.push(book);
}

function displayBooks(){
    myLibrary.forEach((book, i) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const bookDetails = document.createElement('div');
        bookDetails.classList.add('book-details');
        bookDetails.innerHTML = `${book.title}<br /> ${book.author}<br />${book.page}<br /> ${book.read} <button data-book-number=${i}>I have Read</button>`;

        card.appendChild(bookDetails);
        cardWrapper.appendChild(card);
    })
}

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", "295 pages", "not read yet");


addBookToLibrary(theHobbit);

displayBooks();
