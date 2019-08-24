function onDatabaseReady() {
    populateTableUI() 

    console.log(`This is our database: `, db);
}

function deleteBook(bookTitle) {
    var deletedBook = db.books.delete(bookTitle);
    deletedBook
        .then(() => console.log("Book deleted: " + bookTitle))
        .catch(err => console.log(err));
    let bookTitleRow = document.getElementById(bookTitle);
    bookTitleRow.remove(bookTitle);
}


function addBook(event){
    event.preventDefault();
    var addNewBookObj = {};
    for (var i = 0; i < event.currentTarget.form.length - 1; i++) {
        addNewBookObj[event.currentTarget.form[i].name] = event.currentTarget.form[i].value;
    }
    var numBooksSameTitle = db.books.where(":id").equals(addNewBookObj.title).count();
    numBooksSameTitle
        .then(count => {
            if (count > 0){
                editBook(addNewBookObj);
                populateTableUI(addNewBookObj.title);
            } else {
                var addedBook = db.books.add(addNewBookObj);  
                addedBook
                    .then(objectId => console.log("Book added: " + objectId))
                    .catch(error => console.log(error));
                populateTableUI(addNewBookObj.title);
            }
        })
        .catch(error => console.log(error));
    event.currentTarget.form.reset();
    return true;
}


function editBook(updateBookObj) {
    var updatedBook = db.books.put(updateBookObj);  
    updatedBook
        .then(objectId => console.log("Book updated: " + objectId))
        .catch(error => console.log(error));
    let bookTitleRow = document.getElementById(updateBookObj.title);
    bookTitleRow.remove(updateBookObj.title);  
    return true;
}