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
  // const filters = [];

  const initActions = function () {
    const thisBook = this;

    
    thisBook.container = document.querySelector(select.containerOf.bookList);
    thisBook.bookImages = thisBook.container.querySelectorAll('.book a');
    thisBook.filter = document.querySelector(select.filters);
            
      
    thisBook.container.addEventListener('dblclick', function(event){
      event.preventDefault();
      const book = event.target.offsetParent;

      if(book.classList.contains('book__image')){       
       
         book.classList.toggle(className.bookImageClass);

          const bookImageId = book.getAttribute('data-id');

          if(favoriteBooks.includes(bookImageId)){
            const list = favoriteBooks;
            const idIndex = list.indexOf(bookImageId);
            list.splice(idIndex, 1);
          }
          else {
            favoriteBooks.push(bookImageId);
          }         
      }
    });

    thisBook.filter.addEventListener('click', function(event){      

      if(book.tagName == 'INPUT' && book.type == 'checkbox' && book.name == 'filter'){
      console.log('filter:', thisBook.filter.value);
      // return thisBook.filter.value;
      }
    });
  };  
  render();
  initActions();
} 
