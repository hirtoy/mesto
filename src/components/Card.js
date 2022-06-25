export default class Card { 
    constructor(data, cardSelector, handleCardClick) { 
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    };

  _getTemplate() { 
    const cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector(".element")
    .cloneNode(true);
    return cardElement; 
  }; 

  _addLike() {
    this._element.querySelector(".element__heart-icon").classList.toggle("element__heart-icon_active");
  }; 

  _deleteElement() { 
    this._element.remove();
  };

  _setEventListners() { 
    this._element.querySelector(".element__remove-button").addEventListener("click", () => this._deleteElement()); 
    this._element.querySelector(".element__heart-icon").addEventListener("click", () =>  this._addLike()); 
    this._element.querySelector(".element__image").addEventListener("click", () => this._handleCardClick(this._data));
  }; 

  generateCard() { 
    this._element = this._getTemplate(); 

    this._elementTitle = this._element.querySelector(".element__title");
    this._elementImage = this._element.querySelector(".element__image");

    this._elementTitle.textContent = this._data.name;
    this._elementImage.src = this._data.link;
    this._elementImage.alt = this._data.name;

    this._setEventListners();

      return this._element; 
  }; 
} 