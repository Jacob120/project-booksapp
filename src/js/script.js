{
  'use strict';

  const select = {
    templateOf: {
      bookProduct: '#template-book', 
    },
    containerOf:{
      bookList: '#books-list'
    },
  };
  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
  };

  const render = function(){
    // const thisBook = this;

    for(let book of dataSource.books) {      
       const thisBook = this;

      const generatedHTML = templates.menuProduct(dataSource.books);

      thisBook.book = utils.createDOMFromHTML(generatedHTML);
      
      const bookContainer = document.querySelector(select.containerOf.bookList);

      console.log('bookContainer:', bookContainer);

      bookContainer.appendChild(thisBook.book);
      // console.log('book:', book);
    }   
  };
 
  render();

















}