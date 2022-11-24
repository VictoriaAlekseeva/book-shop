const showMoreButton = document.querySelectorAll('.book__show-more');

async function getBooksInfo() {
  const res = await fetch('./books.json');
  const data = await res.json();

  console.log(data[1].author)

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

    bookCard.append(bookCardImg, bookTitle, bookAuthor, bookShowMore, bookPrice, buttonAdd)

    }

    // quote.textContent = data[quoteNumber].text;
    // author.textContent = data[quoteNumber].author;
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



