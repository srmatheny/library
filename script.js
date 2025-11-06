

let newBookButton = document.querySelector("#new-book-button");

newBookButton.addEventListener("click", function() {
    //alert("Hello world");
    let newBookForm = document.querySelector("#new-book-form");
    newBookForm.style.display = "";
});

//document.querySelector("#new-book-form").addEventListener("submit", getData);


/*
**  Modal form section
**
*/
const openModalBtn = document.getElementById("openModal");
const newBookModal = document.getElementById("newBookModal");
const closeButton = document.querySelector(".close-button");
const dataForm = document.getElementById("dataForm");

openModalBtn.addEventListener("click", () => {
    newBookModal.style.display = "block";
});

closeButton.addEventListener("click", () => {
    newBookModal.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target === newBookModal) {
        myModal.style.display = 'none';
    }
});

dataForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(dataForm);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = document.getElementById("read").checked;

    console.log(title);
    console.log(author);
    console.log(pages);
    console.log(read);

    let newBook = new Book(title, author, pages, read);

    myLibrary.addBook(newBook);

    myLibrary.displayBooks();

});

/* won't need this now that we set up the modal
function getData(event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;

    if ((title == "") || (author == "") || (pages == "")) {
        return;
    };

    console.log(title);
    console.log(author);
    console.log(pages);
    console.log(read);

    let newBook = new Book(title, author, pages, read);

    myLibrary.addBook(newBook);

    myLibrary.displayBooks();

}
*/

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    toggleReadStatus() {
        this.read = !this.read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    }

}


class Library {

    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
    }

    displayBooks() {
        console.log("Current Library");
        this.books.forEach(book => console.log(book.info()));

        //remove all card divs from card section
        const removeDivs = document.querySelectorAll(".card");
        for (let i=0; i < removeDivs.length; i++) {
            removeDivs[i].remove();
        };

        let index = 0;
        this.books.forEach(book => {
        
            //create card for each book section
            const librarySection = document.querySelector(".card-section");

            const card = document.createElement("div");
            card.classList.add("card");
            librarySection.appendChild(card);

            const para = document.createElement("p");
            para.textContent = (this.books[index].info());
            card.appendChild(para);
            //end card section creation

            //create remove button - add class attribute
            const removeBookButton = document.createElement("button");
            removeBookButton.classList.add("remove-book-button")
            removeBookButton.textContent = "Delete";

            //removeBookButton.dataset.linkedID = book.id;
            console.log(book.id);
            card.appendChild(removeBookButton);

            removeBookButton.addEventListener("click", removeItem);

            function removeItem() {
                console.log("Made it t othe function");
                console.log(book.id);
                myLibrary.removeBook(book.id);
                card.remove();
                myLibrary.displayBooks();
            };
            //end remove button and card section

            //create toggle read status button section
            

            index++;
        });
        
        //start listener, call remove book

    }

}

myLibrary = new Library;
myLibrary.addBook( new Book("The Hobbit", "J.R. Tolkien", 295, true));
myLibrary.addBook( new Book("The Art of the Deal", "Trump", 500, false));
myLibrary.addBook( new Book("The Dark", "Surfer", 115, true));


myLibrary.displayBooks();


// addBookToLibrary ();
// addBookToLibrary("Art of the Deal", "Trump", 560, "No");
// addBookToLibrary("The Hobbit", "J.R. Tolkien", 295, "Yes");
// addBookToLibrary("Art of the Deal", "Trump", 560, "No");
// addBookToLibrary("The Hobbit", "J.R. Tolkien", 295, "No");
// addBookToLibrary("Art of the Deal", "Trump", 560, "Yes");
