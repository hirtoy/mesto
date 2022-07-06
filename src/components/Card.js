export default class Card { 
    constructor({ data, adminInfo, handleCardClick, handleDelClick, handleLike, handleDelLike }, cardSelector) { 
    this._name = data.name;
    this._link = data.link;

    this._card = data;
    this._likes = data.likes;
    this._id = data.owner._id;
    this._adminInfo = adminInfo._id;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelClick = handleDelClick;
    this._handleLike = handleLike;
    this._handleDelLike = handleDelLike;
    };

  _getTemplate() { 
    const cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector(".element")
    .cloneNode(true);
    return cardElement; 
  };

  getCurrentCard() {
    return this._card;
  }

  handleLikeElement(item) {
    this._likes = item.likes.length;
    this._addLike(item);
    if (this._checkMyLike()) {
      this._element
        .querySelector(".element__heart-icon")
        .classList.add("element__heart-icon_active");
    } else {
      this._element
        .querySelector(".element__heart-icon")
        .classList.remove("element__heart-icon_active");
    }
  }

  _addLike(item) {
    this._element.querySelector(".element__heart-counter").textContent = item.likes.length;
  }

  _checkMyLike() {
    return Boolean(this._likes.find((item) => item._id == this._adminInfo));
  }

  removeCard() { 
    this._element.remove();
  };

  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._card);
      });

    this._element
      .querySelector(".element__heart-icon")
      .addEventListener("click", () => {
        if (this._checkMyLike()) {
          this._handleDelLike();
        } else {
          this._handleLike();
        }
      });

    this._element
      .querySelector(".element__remove-button")
      .addEventListener("click", () => this._handleDelClick(this._card._id));
  }; 

  generateCard() { 
    this._element = this._getTemplate(); 


    this._elementTitle = this._element.querySelector(".element__title");
    this._elementImage = this._element.querySelector(".element__image");
    this._elementRemove = this._element.querySelector("element__remove-button_active");
    this._elementHeart = this._element.querySelector(".element__heart-counter");

    if (this._id == this._adminInfo)
    this._elementRemove.classList.add("element__remove-button_active");
    if (this._checkMyLike()) {
    this._element
      .querySelector(".element__heart-icon")
      .classList.add("element__heart-icon_active");
  }

    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementHeart.textContent = this._likes.length;

    this._setEventListeners();

      return this._element; 
  }; 
} 