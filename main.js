
// Declare an empty array for library
let myLibrary = [];


const addBookButton = document.querySelector(".add-book-button");
addBookButton.addEventListener("click", displayTheForm);

function displayTheForm() {
    document.getElementById("add-book-form").style.display = "";
};

//Start event listener / add input to array for new entry form
const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", intakeFormData);

// Transform form data to variables for intake
function intakeFormData() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;

    // break out if form is invalid
    if ((title == "") || (author == "" ) || (pages == "") || (read == "")) {
        return;
    }

    // Call function to input book into array
    addBookToLibrary(title, author, pages, read);

    // reset form after submission
    document.getElementById("add-book").reset();
    
};

// start event listener for clear form button
const clearButton = document.querySelector(".reset-button");
clearButton.addEventListener("click", clearForm);

function clearForm() {
    document.getElementById("add-book").reset();
};

//function Object Constructor
function Book(title, author, numPages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
};

// function to add book to library
function addBookToLibrary (title, author, pages, read) {

    // take params, create a book then store it in the array
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    renderLibrary();
};

// Function to render library array to cards
function renderLibrary () {

    const books = document.querySelector(".books");

    // remove all prevously displayed cards...
    const removeDivs = document.querySelectorAll(".card");
    for ( let i=0; i < removeDivs.length; i++) {
        removeDivs[i].remove();
    };

    //Loop over Library array and dispaly cards
    let index = 0;
    myLibrary.forEach( myLibrarys => {
        const card = document.createElement("div");
        card.classList.add("card");
        books.appendChild(card);

        //Create remove book button and add class attribute
        const removeBookButton = document.createElement("button");
        removeBookButton.classList.add("remove-book-button");
        removeBookButton.textContent = "Delete"

        //Link the data attricbute of the delete button to the array
        removeBookButton.dataset.linkedArray = index;
        card.appendChild(removeBookButton);

        // start event listener / remove array item from array and card fro mparent div via datralink
        removeBookButton.addEventListener("click", removeBookFromLibrary);

        function removeBookFromLibrary() {
            let retrieveBookToRemove = removeBookButton.dataset.linkedArray;
            myLibrary.splice(parseInt(retrieveBookToRemove), 1);
            card.remove();
            renderLibrary();
        };

        // create a read status button and add class attribute for each array card
        const readStatusButton = document.createElement("button");
        readStatusButton.classList.add("read-status-button");
        readStatusButton.textContent = "Toggle Read Status";

        //link the data attribute of the toggle button to the array and card
        readStatusButton.dataset.linkedArray = index;
        card.appendChild(readStatusButton);

        //create event listener/toggle logic for array objects prototype for read status change
        readStatusButton.addEventListener("click", toggleReadStatus);

        function toggleReadStatus () {
            let retrieveBookToToggle = readStatusButton.dataset.linkedArray;
            Book.prototype = Object.create(Book.prototype);
            const toggleBook = new Book();
            // console.log("What is the initial value?...", myLibrary[parseInt(retrieveBookToToggle)].read);

            //Run check to see what read value is present to toggle from
            if ((myLibrary[parseInt(retrieveBookToToggle)].read) == "Yes") {
                toggleBook.read = "No";
                myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
            } else if ((myLibrary[parseInt(retrieveBookToToggle)].read) == "No") {
                toggleBook.read = "Yes";
                myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
            };
            renderLibrary();
        
        };

        // loop over object keys and values and display to each child
        for ( let key in myLibrarys) {
            const para = document.createElement("p");
            para.textContent = (`${key}: ${myLibrarys[key]}`);
            card.appendChild(para);
        };

    index++;
    });

};




// addBookToLibrary ("The Hobbit", "J.R. Tolkien", 295, "Yes");
// addBookToLibrary("Art of the Deal", "Trump", 560, "No");
// addBookToLibrary("The Hobbit", "J.R. Tolkien", 295, "Yes");
// addBookToLibrary("Art of the Deal", "Trump", 560, "No");
// addBookToLibrary("The Hobbit", "J.R. Tolkien", 295, "No");
// addBookToLibrary("Art of the Deal", "Trump", 560, "Yes");



