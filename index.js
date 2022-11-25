


async function getBooksInfo() {
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

  console.log(this.createBlock, this.className = clName);

  return this.createBlock;
}

function createElem (tag, clName, content) {
  this.tag = tag;
  this.clName = clName;
  this.content = content;

  this.createElem = document.createElement(tag);
  this.createElem.className = clName;
  this.createElem.innerHTML = content;

  console.log(this.createElem, this.className = clName);

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

  if (target.className != 'book__show-more') return;

  let el = target.closest('.book__card').querySelector('.book__title').textContent;

        event.preventDefault();
        popup.classList.add('active');
        popupWrapper.classList.add('active');
        popupText.textContent = getBookDescription(el);
        console.log(popupText.textContent);
        return popupText.textContent;
}

async function getBookDescription(el) {
  const res = await fetch('./books.json');
  const data = await res.json();

  for (let i = 0; i < data.length; i++) {
    if (data[i].title == el) {
      console.log('data title', data[i].title, 'data description', data[i].description)
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



