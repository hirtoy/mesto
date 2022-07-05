export default class Card { 
    constructor(data, item, adminInfo, cardSelector, handleCardClick, handleDelClick, handleLike, handleDelLike) { 
    this._data = data;
    this._card = item;
    this._likesArr = item.likes;
    this._userId = item.owner._id;
    this._myId = adminInfo._id;
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
    this._likesArr = item.likes;
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
    return Boolean(this._likesArr.find((item) => item._id == this._myId));
  }

  _deleteElement() { 
    this._element.remove();
  };

  _setEventListners() {
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

    if (this._userId == this._myId)
    this._elementRemove.classList.add("element__remove-button_active");
    if (this._checkMyLike()) {
    this._element
      .querySelector(".element__heart-icon")
      .classList.add("element__heart-icon_active");
  }

    this._elementTitle.textContent = this._data.name;
    this._elementImage.src = this._data.link;
    this._elementImage.alt = this._data.name;
    this._elementHeart.textContent = this._likesArr.length;

    this._setEventListners();

      return this._element; 
  }; 
} 