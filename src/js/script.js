{
  ('use strict');

  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
  };
  const className = {
    bookImage: 'favorite'
  };
  const templates = {
    menuProduct: Handlebars.compile(
      document.querySelector(select.templateOf.bookProduct).innerHTML
    ),
  };

  const render = function () {
    for (let book of dataSource.books) {
      const thisBook = this;

      const generatedHTML = templates.menuProduct(book);

      thisBook.bookParams = utils.createDOMFromHTML(generatedHTML);

      const bookContainer = document.querySelector(select.containerOf.bookList);

      bookContainer.appendChild(thisBook.bookParams);
    }
  };

  const favoriteBook = [];

  const initActions = function () {
    const thisBook = this;

    thisBook.container = document.querySelector(select.containerOf.bookList);
    thisBook.bookImages = thisBook.container.querySelectorAll('.book a')
    // thisBook.images = thisBook.book.querySelectorAll('.book_image');

    console.log('elem:', thisBook.container);
    console.log('book:', thisBook.bookImages);
    // console.log('images:', thisBook.images);

    for(let bookImage of thisBook.bookImages){
      console.log('bookImage:', bookImage);
      bookImage.addEventListener('dblclick', function(event){
        event.preventDefault();
        bookImage.classList.toggle(className.bookImage);
        let bookImageId = bookImage.getAttribute('data-id');
        console.log('id:', bookImageId);
        favoriteBook.push(bookImageId);
        console.log('fav:', favoriteBook);
      })
    }
  };
  
  render();
  initActions();
} 
