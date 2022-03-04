const addBookButton = document.querySelector('#addBook')
const bookList = document.querySelector('#bookList')
const formContainer = document.querySelector('#formContainer')
const closeContainer = document.querySelector('#closeContainer')
const submitButton = document.querySelector('#submitValues')
const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const pagesInput = document.querySelector('#pages')
const readInput = document.querySelector('#readCheckBox')
const openAndClose = document.querySelector('#openAndClose')
const form = document.querySelector('form')
const data = document.querySelector('#data')

let myLibrary = [];

class Book {
  
  constructor(title, author, pages, isRead) { 

this.title = title,
this.author = author,
this.pages = pages,
this.isRead = isRead
  }

}


let close = () => {
  openAndClose.style.transform = 'rotate(0deg)'
  formContainer.style.display = 'none'
}

let open = () => {
  openAndClose.style.transform = 'rotate(45deg)'
  formContainer.style.display = 'flex'
}

let showsForm = (opened) => {
  openAndClose.style.transition = '150ms'
    opened ? open() : close() 
}


let addBookToLibrary = () =>  {
    let title = titleInput.value
    let author = authorInput.value
    let pages = pagesInput.value
    let read = readInput.checked

    myLibrary.push(new Book(title, author, pages, read))
}


let createCard = (title, author, pages, read) => {
  let card = document.createElement('div')
  let cardContent = document.createElement('div')
  let readContext = document.createElement('div')

  card.classList.add('card')
  cardContent.classList.add('cardContent')
  readContext.classList.add('alreadyRead')

  let titleDisplay = document.createElement('h4')
  let authorDisplay = document.createElement('h4')
  let pagesDisplay = document.createElement('h4')

  titleDisplay.textContent = title
  authorDisplay.textContent = author
  pagesDisplay.textContent = pages

  let readDisplay = document.createElement('h5')
  readDisplay.textContent = read ? 
  'Already read' : 'Not read yet'

  cardContent.append(titleDisplay, authorDisplay, pagesDisplay)
  readContext.append(readDisplay)
  
  card.append(cardContent, readContext)
  console.log(this.card)
  return card
}


let opened = true
addBookButton.addEventListener('click', () => {
  console.log(opened)
    showsForm(opened)
  opened = opened ? false : true

})


let updateBookList = () => {

  addBookToLibrary()
  titleInput.value = ''
  authorInput.value = ''
  pagesInput.value = ''
  readInput.checked = false
  showsForm(opened)

    
    bookList.textContent = ' '
  myLibrary.forEach((item) => {

    let li = document.createElement("li");

    li.appendChild(createCard(item.title, item.author, item.pages, item.isRead))

    bookList.appendChild(li);
  })
}


let updateData = () => {
  let quantityOfBooks = myLibrary.length
  let totalPages = 0
  let completedBooks = 0
  let percentageRead = 0

  myLibrary.forEach(book => {
    book.isRead? completedBooks++ : completedBooks

    totalPages += (book.pages == '' ?
     0: parseInt(book.pages))

  })

  percentageRead = (completedBooks / quantityOfBooks).toFixed(2)
  percentageRead = isNaN(percentageRead) ?
   '0%' : `${percentageRead * 100}%`

  data.innerHTML = `
  <h2>Books: ${quantityOfBooks}</h2>
  <h2>Completed books: ${completedBooks}</h2>
  <h2>Total pages: ${totalPages}</h2>
  <h2>Percentage read: ${percentageRead}</h2>
  `
}


let updateInformations = () => {
  updateBookList()
  updateData()
}


updateData()
submitButton.addEventListener('click', updateInformations)
form.addEventListener('submit', e => e.preventDefault())