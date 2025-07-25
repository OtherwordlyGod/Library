const myLibrary = [];
const libraryContainer = document.getElementById('libraryContainer');

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    const id = crypto.randomUUID();
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, pg: ${this.pages}`;
};

function addBookToLibrary(name, author, pages) {
    myLibrary.push(new Book(name, author, pages));
}

function displayBooks() {
    for (let book of myLibrary) {
      let newBook = document.createElement('p');
      newBook.textContent = book.info();
      newBook.classList.add("book");
      libraryContainer.appendChild(newBook)
      console.log("hello");
    }
}

addBookToLibrary("a", "river", 72);
addBookToLibrary("b", "river", 79);
addBookToLibrary("b", "river", 70);
addBookToLibrary("b", "river", 40);
addBookToLibrary("b", "river", 75);
addBookToLibrary("b", "river", 48);

displayBooks();
