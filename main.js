const myLibrary = [];
const libraryContainer = document.getElementById('libraryContainer');
const addBook = document.getElementById('add');

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
    }
}

function updateDisplay() {
    const book = myLibrary[myLibrary.length - 1];
    let newBook = document.createElement('p');
    newBook.textContent = book.info();
    newBook.classList.add("book");
    libraryContainer.appendChild(newBook)
  }  

addBook.addEventListener('click', () => {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
    <form method="dialog" id="book-form">
    <div class = "inputContainer">
    <span>Book Title:</span>
    <input type = "text" name = "title">
    </div>
    </br>
    <div class = "inputContainer">
    <span>Author:</span>
    <input type = "text" name = "author">
    </div>
    </br>
    <div class = "inputContainer">
    <span>Pages:</span>
    <input type = "number" name="pages">
    </di>
    </br>
    <button id="close-btn">OK</button>
    </form>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();
  
    dialog.querySelector('#book-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.target;
      
      const title = form.elements.title.value.trim();
      const author = form.elements.author.value.trim();
      const pages = parseInt(form.elements.pages.value, 10);
      
      addBookToLibrary(title, author, pages);
      updateDisplay();
      dialog.close();
      dialog.remove();
      
    });
})

