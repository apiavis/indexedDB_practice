document.addEventListener('DOMContentLoaded', async function () {
    var getBooks = await fetch("./books.JSON")
        .then(req => req.json())
        .then(data => data);

    window.db = new Dexie("library_database");

    db.version(1).stores({
        books: 'title,author,numberOfPages,cover,synopsis,publishDate,rating'
    });

    var countRequest = db.books.count();
    countRequest
        .then(count => {
            if(count === 0) {
                db.books.bulkPut(getBooks).then(function () {
                    onDatabaseReady();
                    return db.books.each(book => {
                        console.log(book);
                    });
                }).catch(function (error) {
                    console.error(`Ooops: ${error}`);
                });
            } else {
                onDatabaseReady();
            }
        })
        .catch(error => console.log(error));
});