const myLibrary = [];
const libraryContainer = document.getElementById('libraryContainer');
const addBook = document.getElementById('add');
const removeBtn = document.getElementById('remove');


function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.status = false;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, pg: ${this.pages}`;
};

Book.prototype.getId = function() {
    return this.id;
};

function addBookToLibrary(name, author, pages) {
    myLibrary.push(new Book(name, author, pages));
}

function displayBooks() {
    for (let book of myLibrary) {
      let newBook = document.createElement('div');
      newBook.innerHTML = `      
      <p>${book.info()}</p>
      <button class ="remove" data-id = "${book.getId()}">Remove</button>
      <button class ="read" data-id = "${book.getId()}">Read</button>
      `;
      
      newBook.classList.add("book");
      libraryContainer.appendChild(newBook);

      const removeBtn = newBook.querySelector('.remove');
      const readBtn = newBook.querySelector('.read');

      removeBtn.addEventListener('click', () => {
        console.log("clicked");
        const clickedId = readBtn.dataset.id;
        const b = myLibrary.find(book => book.getId() === clickedId);       
          if (clickedId === b.getId()) {
            console.log("Matched Book:", b.info());
            removeBook(b, newBook);
          }
      }) 

      readBtn.addEventListener('click', () => {
        console.log("clicked");
        const clickedId = readBtn.dataset.id;
        const b = myLibrary.find(book => book.getId() === clickedId); 
        if (b) {
            b.read = !b.read;
            if (b.read) {
                newBook.classList.add("read");
                newBook.classList.remove("not-read");
            } else {
                newBook.classList.add("not-read");
                newBook.classList.remove("read");
            }
        }
    })
    }
}

function updateDisplay() {
    const book = myLibrary[myLibrary.length - 1];
    let newBook = document.createElement('div');
    newBook.innerHTML = `      
      <p>${book.info()}</p>
      <button class ="remove" data-id = "${book.getId()}">Remove</button>
      <button class ="read" data-id = "${book.getId()}">Read</button>
    `;
    newBook.classList.add("book");
    libraryContainer.appendChild(newBook);

    const removeBtn = newBook.querySelector('.remove');
    const readBtn = newBook.querySelector('.read');

    removeBtn.addEventListener('click', () => {
        console.log("clicked");
        const clickedId = readBtn.dataset.id;
        const b = myLibrary.find(book => book.getId() === clickedId);       
          if (clickedId === b.getId()) {
            console.log("Matched Book:", b.info());
            removeBook(b, newBook);
          }
    }) 

    readBtn.addEventListener('click', () => {
        console.log('clicked');
        const clickedId = readBtn.dataset.id;
        const b = myLibrary.find(book => book.getId() === clickedId); 
        if (b) {
            b.read = !b.read;
            if (b.read) {
                newBook.classList.add("read");
                newBook.classList.remove("not-read");
            } else {
                newBook.classList.add("not-read");
                newBook.classList.remove("read");
            }
        }
    })
  }

  function removeBook(book, element) {
    const index = myLibrary.indexOf(book);
    if (index !== -1) {
        myLibrary.splice(index, 1); // Removes 1 item at that index
    }

    element.remove();
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

addBookToLibrary('a', 'river', 10);
addBookToLibrary('b', 'river', 20);

displayBooks();
