{
  ('use strict');

  const select = {
    templateOf: {
      bookProduct: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    filters: '.filters',
  };

  const className = {
    bookImageClass: 'favorite'
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

  const favoriteBooks = [];

  const initActions = function () {
    const thisBook = this;

    thisBook.container = document.querySelector(select.containerOf.bookList);
    thisBook.bookImages = thisBook.container.querySelectorAll('.book a');        
      
    thisBook.container.addEventListener('dblclick', function(event){
      event.preventDefault();
        
      if(event.target.offsetParent.classList.contains('book__image')){       
       
         event.target.offsetParent.classList.toggle(className.bookImageClass);

          const bookImageId = event.target.offsetParent.getAttribute('data-id');

          if(favoriteBooks.includes(bookImageId)){
            const list = favoriteBooks;
            const idIndex = list.indexOf(bookImageId);
            list.splice(idIndex, 1);
          }
          else {
            favoriteBooks.push(bookImageId);
          }

          console.log('fav:', favoriteBooks); 
      }
    });
  };
  
  render();
  initActions();
} 
