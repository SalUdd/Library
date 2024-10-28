// Book Constructor and Library Array
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// DOM Elements
const bookForm = document.getElementById('bookForm');
const displayBookDetailsButton = document.getElementById('displayBookDetailsButton');
const bookDetailsContainer = document.getElementById('bookDetailsContainer');
const addBookSuccessMessage = document.getElementById('addBookSuccessMessage');

// Event Listeners
displayBookDetailsButton.addEventListener('click', displayBookDetailsInfo);
bookForm.addEventListener('submit', handleFormSubmit);

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
}

function handleBookAdded() {
  bookDetailsContainer.setAttribute("hidden", "");
  displayBookDetailsButton.innerText = "New Book";
  bookForm.reset();
  addBookSuccessMessage.removeAttribute("hidden");
}

function displayBookDetailsInfo() {
  const isHidden = bookDetailsContainer.hasAttribute("hidden");

  if (isHidden) {
    bookDetailsContainer.removeAttribute("hidden");
    displayBookDetailsButton.innerText = "Cancel";
    addBookSuccessMessage.setAttribute("hidden", "");
  } else {
    bookDetailsContainer.setAttribute("hidden", "");
    displayBookDetailsButton.innerText = "New Book";
  }
}

function displayLibrary (){

}