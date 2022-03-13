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
    bookImageClass: 'favorite',
    hidden: 'hidden',
  };

  const templates = {
    menuProduct: Handlebars.compile(
      document.querySelector(select.templateOf.bookProduct).innerHTML
    ),
  };

  const render = function () {
    for (let book of dataSource.books) {
      const thisBook = this;

      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

      const generatedHTML = templates.menuProduct(book);

      thisBook.bookParams = utils.createDOMFromHTML(generatedHTML);

      const bookContainer = document.querySelector(select.containerOf.bookList);

      bookContainer.appendChild(thisBook.bookParams);
    }
  };

  const favoriteBooks = [];
  const filters = [];

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
      const bookFilter = event.target;    
     
      if(bookFilter.tagName == 'INPUT' && bookFilter.type == 'checkbox' && bookFilter.name == 'filter'){
        if(bookFilter.checked == true){
          filters.push(bookFilter.value);
        } else if(filters.includes(bookFilter.value)) {
          const idIndex = filters.indexOf(bookFilter.value);
          filters.splice(idIndex, 1);
        }            
      } 
      filterBooks();        
    });
  };
  
  const filterBooks = function(){
    for(let book of dataSource.books){
    
      // const container = document.querySelector(select.containerOf.bookList);
      // const bookImages = container.querySelectorAll('.book a');         
      // console.log('images:', bookImages); 
      const bookId = [];     
      let shouldBeHidden = false;
    
      for(let filter of filters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          bookId.push(book.id);
          break;
        }
      }
     
      if(shouldBeHidden == true){        
        const bookImage = document.querySelector('[data-id="' + book.id + '"]');
        bookImage.classList.add(className.hidden);        
      }  else if (shouldBeHidden == false){
        const bookImage = document.querySelector('[data-id="' + book.id + '"]');
        bookImage.classList.remove(className.hidden); 
      }
    }
  };

  const determineRatingBgc = function(rating){
    let ratingBgc = '';    
    if(rating < 6){
      ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      //console.log(ratingBgc);

    } else if(rating > 6 && rating <= 8){
      ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      //console.log(ratingBgc);

    } else if (rating > 8 && rating <= 9){
      ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      //console.log(ratingBgc);

    } else if(rating > 9){
      ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      //console.log(ratingBgc);

    }
    return ratingBgc;

  };


  render();
  initActions();
} 
