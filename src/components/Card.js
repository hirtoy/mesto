export default class Card { 
constructor({ item, adminInfo, cardSelector, handleCardClick, handleDelClick, handleLikeEl, handleDelLikeEl }) {
  this._name = item.name;
  this._link = item.link;
  this._likesArr = item.likes;
  this._userId = item.owner._id;
  this._myId = adminInfo;
  this._id = item._id;
  this._cardSelector = cardSelector;
  this._handleCardClick = handleCardClick;
  this._handleDelClick = handleDelClick;
  this._handleLikeEl = handleLikeEl;
}

_getTemplate() {
  const cardEl = document
    .querySelector(this._cardSelector)
    .content.querySelector(".element")
    .cloneNode(true);

  return cardEl;
}

_handleLike() {
  if(this._likesArr.length !== 0) {
      this._element.querySelector('.element__heart-counter').textContent = this._likesArr.length;
  } else {
      this._element.querySelector('.element__heart-counter').textContent = '0';
    }
  this._likesArr.forEach((like) => {
    if(like._id === this._myId) {
        this._likesEl.classList.add('element__heart-icon_active');
      }
  })
}

updateLikes(likes) {
  this._likesEl.classList.toggle('element__heart-icon_active');
  if(likes !== 0) {
      this._element.querySelector('.element__heart-counter').textContent = likes;
  } else {
      this._element.querySelector('.element__heart-counter').textContent = '0';
  }
}

_setEventListeners() {
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick();
});

    if(this._myId === this._userId) {
      this._delButton.addEventListener('click', () => {
           this._handleDelClick(this._id, this._element);
    });
}
    this._likesEl.addEventListener('click', () => {
      if(!this._likesEl.classList.contains('element__heart-icon_active'))  {
        this._handleLikeEl.handleLikeElement(this._id);
      } else {
        this._handleLikeEl.handleDelLikeElement(this._id);
    };
});
}

generateCard() {
  this._element = this._getTemplate();

  this._elementTitle = this._element.querySelector(".element__title");
  this._elementImage = this._element.querySelector(".element__image");
  this._likesEl = this._element.querySelector(".element__heart-icon");
  this._delButton = this._element.querySelector(".element__remove-button");

  this._elementTitle.textContent = this._name;
  this._elementImage.src = this._link;
  this._elementImage.alt = `Это ${this._name}? Введите корректную ссылку.`;


  this._setEventListeners();
  this._handleLike();

  if(this._myId !== this._userId) {
    this._delButton.remove();
}

  return this._element;
}
}