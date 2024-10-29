// Book Constructor and Library Array
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add two default books to the library
const defaultBook1 = new Book("1984", "George Orwell", 328, true);
const defaultBook2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);

myLibrary.push(defaultBook1, defaultBook2);

// DOM Elements
const bookForm = document.getElementById('bookForm');
const displayBookDetailsButton = document.getElementById('displayBookDetailsButton');
const bookDetailsContainer = document.getElementById('bookDetailsContainer');
const addBookSuccessMessage = document.getElementById('addBookSuccessMessage');
const libraryContainer = document.getElementById("displayLibrary");


// Event Listeners
displayBookDetailsButton.addEventListener('click', displayBookDetailsInfo);
bookForm.addEventListener('submit', handleFormSubmit);

// Prototypes
Book.prototype.deleteBook = function() {
  const index = myLibrary.indexOf(this);
  if (index !== -1){
    myLibrary.splice(index, 1);
  }
  libraryContainer.innerHTML ='';
  displayLibrary();
};

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read

}

// Functions
function handleFormSubmit(event) {
  event.preventDefault();

  const title = document.getElementById("titleInput").value;
  const author = document.getElementById("authorInput").value;
  const pages = document.getElementById("pagesInput").value;
  const read = document.getElementById("readInput").checked;

  addBookToLibrary(title, author, pages, read);
  handleBookAdded();
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  libraryContainer.innerHTML ='';
  displayLibrary();
}

function handleBookAdded() {
  bookDetailsContainer.setAttribute("hidden", "");
  displayBookDetailsButton.innerText = "New Book";
  bookForm.reset();
}

function displayBookDetailsInfo() {
  const isHidden = bookDetailsContainer.hasAttribute("hidden");

  if (isHidden) {
    bookDetailsContainer.removeAttribute("hidden");
    displayBookDetailsButton.innerText = "Cancel";
  } else {
    bookDetailsContainer.setAttribute("hidden", "");
    displayBookDetailsButton.innerText = "New Book";
  }
}

function displayLibrary (){
   myLibrary.forEach((book, index) => {

    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    // bookDiv.setAttribute('index', index);

    const titleElement = document.createElement('h2');
    titleElement.textContent = `Title: ${book.title}`;

    const authorElement = document.createElement('h3');
    authorElement.textContent = `Author: ${book.author}`;
    
    const pagesElement = document.createElement('p');
    pagesElement.textContent = `Number of Pages: ${book.pages}`;

    const readText = document.createElement('p')
    readText.textContent = 'Read Status: ';

    const buttonLabel = document.createElement('label');
    buttonLabel.classList.add('switch');

    const inputButton = document.createElement('input');
    inputButton.setAttribute('type', 'checkbox');

    // Set checkbox state based on the book's read status
    inputButton.checked = book.read;

    inputButton.addEventListener('change', () => {
      book.toggleReadStatus(); // Use the prototype method to toggle read status
    });

    const buttonSpan = document.createElement('span');
    buttonSpan.classList.add('slider', 'round');

    buttonLabel.appendChild(inputButton);
    buttonLabel.appendChild(buttonSpan);

    const newLine = document.createElement('br');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button')
    deleteButton.textContent = 'Delete Book';

    deleteButton.addEventListener('click', () => {
      book.deleteBook();
    })

    bookDiv.appendChild(titleElement);
    bookDiv.appendChild(authorElement);
    bookDiv.appendChild(pagesElement);
    bookDiv.appendChild(readText);
    bookDiv.appendChild(buttonLabel);
    

    bookDiv.appendChild(newLine);

    bookDiv.appendChild(deleteButton);

    
    libraryContainer.appendChild(bookDiv);
   })
}

// Call displayLibrary to show the default books on page load
displayLibrary();

