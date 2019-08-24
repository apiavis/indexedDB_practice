let initialTable = true;

async function populateTableUI(newBookTitle) {
  const tBody = document.querySelector('tbody');
  const columns = ['cover', 'title', 'author', 'numberOfPages', 'synopsis', 'publishDate', 'rating'];
  
  if (initialTable) {
    let allBooks = await db.books.where('numberOfPages').aboveOrEqual(0).toArray()
    
    for (let i = allBooks.length - 1; i >= 0; i--) {
      const row = document.createElement('tr');
      row.setAttribute("id", allBooks[i][columns[1]]);

      for (let j = 0; j < columns.length; j++) {
        var td = document.createElement('td');
        var value = allBooks[i][columns[j]]
        td.innerText = value ? value : null;
        row.append(td);
      }

      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'delete book';
      row.append(deleteBtn);
      deleteBtn.addEventListener('click',function(event) {
        event.preventDefault();
        deleteBook(this.parentElement.id);
      });
      tBody.append(row);
    }

  } else {
    let newBook = await db.books.where('title').equals(newBookTitle).toArray()
    const row = document.createElement('tr');
    row.setAttribute("id", newBook[0].title);

    for (let j = 0; j < columns.length; j++) {
      var td = document.createElement('td');
      var value = newBook[0][columns[j]]
      td.innerText = value ? value : null;
      row.append(td);
    }
    
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'delete book';
    row.append(deleteBtn)
    deleteBtn.addEventListener('click',function(event) {
      event.preventDefault();
      deleteBook(this.parentElement.id);
      });
    tBody.append(row);
  }
  initialTable = false;
}