//  HTML structure
//
//  body
//    .wrapper
//      .welcome
//        .welcome-text
//        .basket
//      .books__wrapper
//        .book-card
//          .book-card__img
//          .book__title
//          .book__author
//          button.book__show-more
//          .book__price
//          button button__add-to-bag
//        .book-card
//        ...........
//    .popup__wrapper   //invisible, but shows up when "Show more" button was pushed
//      .popup
//      .popup__text



//alert("Hello! I managed to make only layout generation with java script and popup appearance with a 'Show more' button");


async function getBooksInfo() {  // create books card and add book info inside
  const res = await fetch('./books.json');
  const data = await res.json();

  for (let i = 0; i < data.length; i++) {

    const bookCard = new createBlock ('div', 'book__card');
    booksWrapper.append(bookCard);

    const bookCardImg = new createElem ('img', 'book-card__img');
    bookCardImg.src = `${data[i].imageLink}`;
    bookCardImg.alt= "book cover";

    const bookTitle = new createElem ('p','book__title', `${data[i].title}`);
    const bookAuthor = new createElem ('p', 'book__author', `${data[i].author}`);
    const bookShowMore = new createElem ('button', 'book__show-more', 'Show more');
    const bookPrice = new createElem ('p', 'book__price', `$ ${data[i].price}`);
    const buttonAdd = new createElem ('button', 'button button__add-to-bag', 'Add to bag')

    bookCard.append(bookCardImg, bookTitle, bookAuthor, bookShowMore, bookPrice, buttonAdd);
    }
};

getBooksInfo();

function createBlock(tag, clName) {
  this.tag = tag;
  this.clName = clName;

  this.createBlock = document.createElement(tag);
  this.createBlock.className = clName;

  return this.createBlock;
}

function createElem (tag, clName, content) {
  this.tag = tag;
  this.clName = clName;
  this.content = content;

  this.createElem = document.createElement(tag);
  this.createElem.className = clName;
  this.createElem.innerHTML = content;

  return this.createElem;
}

const wrapper = new createBlock ('div', 'wrapper');
document.body.prepend(wrapper);

const welcome = new createBlock ('div', 'welcome');
wrapper.prepend(welcome);

const welcomeText = new createElem('p', 'welcome-text','Welcome to the Book Shop');
welcome.prepend(welcomeText);


const booksWrapper = new createBlock ('div', 'books__wrapper');
welcome.after(booksWrapper);

const popupWrapper = new createBlock ('div', 'popup__wrapper');
booksWrapper.after(popupWrapper);

const popup = new createBlock ('div', 'popup');
popupWrapper.prepend(popup);

const popupClose = new createElem('span', 'popup__close', 'x');
popup.prepend(popupClose);

const popupText = new createElem('p', 'popup__text', '');
popupClose.after(popupText);



booksWrapper.onclick = function(event) {
  let target = event.target;
  console.log(target.className)

  if (target.classList.contains('button__add-to-bag') ) {
    addToBusket(target);
  }

  if (target.className != 'book__show-more') return;

  let el = target.closest('.book__card').querySelector('.book__title').textContent;

        event.preventDefault();
        popup.classList.add('active');
        popupWrapper.classList.add('active');
        popupText.textContent = getBookDescription(el);
        return popupText.textContent;
}

async function getBookDescription(el) {
  const res = await fetch('./books.json');
  const data = await res.json();

  for (let i = 0; i < data.length; i++) {
    if (data[i].title == el) {
      popupText.textContent = data[i].description;
    }
  }

  return popupText.textContent;
}

popupClose.addEventListener('click', ()=> { // закрыть окно по клику на крестик
  popup.classList.remove('active');
  popupWrapper.classList.remove('active');
});

popupWrapper.addEventListener('click', (event) => { // закрыть окно по клику на фон
  if (event.target.closest('.popup')) return;
    popup.classList.remove('active');
    popupWrapper.classList.remove('active');
})


//basket
// //.welcome
//  //.welcome-text
//    .basket__wrapper;
//      .basket
//        span.basket__counter
//      .basket__popup
//        p.basket__header;
//        .basket__book-card;
//          .......
//        a.basket__confirm;



const basketWrapper = new createBlock('div', 'basket__wrapper');
welcomeText.after(basketWrapper);

const basket = new createBlock('div', 'basket');
basketWrapper.prepend(basket);

const basketCounter = new createElem('span', 'basket__counter', '0');
basket.prepend(basketCounter);

const basketPopup = new createBlock('div', 'basket__popup');
basket.after(basketPopup);

const basketHeader = new createElem('p', 'basket__header', 'Your shopping list')
basketPopup.prepend(basketHeader);

const basketConfirm = new createElem('a', 'basket__confirm', 'Confirm');
basketConfirm.href = '#';
basketPopup.append(basketConfirm);


let booksSettoBuy = []; // books added to basket

async function addToBusket (target) {

  const res = await fetch('./books.json');
  const data = await res.json();

  let el = target.closest('.book__card').querySelector('.book__title').textContent;
  console.log(el)

  for (let i = 0; i < data.length; i++) {
    if (data[i].title == el) {
      booksSettoBuy.push(data[i]);

      const basketBookCard = new createBlock ('div', 'basket__card');
      basketConfirm.before(basketBookCard);

      const basketBookCardImg = new createElem ('img', 'basket__book-img');
      basketBookCardImg.src = `${data[i].imageLink}`;
      basketBookCardImg.alt= "book cover";

      const basketBookTitle = new createElem ('p','basket__title', `${data[i].title}`);
      const basketBookAuthor = new createElem ('p', 'basket__author', `${data[i].author}`);
      const basketBookPrice = new createElem ('p', 'basket__price', `$ ${data[i].price}`);
      const baskerRemoveItem = new createElem ('span', 'basket__remove-button', 'Remove')

      basketBookCard.append(basketBookCardImg, basketBookTitle, basketBookAuthor, basketBookPrice, baskerRemoveItem);

    }
  }

  basketCounter.innerHTML = booksSettoBuy.length
  console.log(booksSettoBuy)
  return booksSettoBuy, basketCounter;
}


console.log(booksSettoBuy);

function busketShowPopup() {
  basketPopup.classList.toggle('active');
}


basketWrapper.onclick = function(event) {
  let target = event.target;

  if (target.classList.contains('basket') || target.classList.contains('basket__counter')) {
    busketShowPopup();
  }

  // if (target.className != 'basket' || 'basket__counter') return;


  if (target.className == 'basket__confirm') {
    window.location.href = './order.html';
  }
}