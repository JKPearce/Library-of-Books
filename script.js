let myLibrary = [];
const cardWrapper = document.getElementById("card-wrapper");

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
