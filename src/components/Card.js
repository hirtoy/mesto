
export class Card { 
    constructor({item, cardSelector, handleCardClick}) { 
    this._title = item.title; 
    this._link = item.link; 
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    };

  _getTemplate() { 
    // const templateElement = document.querySelector(this._templateSelector); 
    // const cardElement = templateElement.content.cloneNode(true); 
    const cardElement = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
    return cardElement; 
  }; 

  _addLike() {
    this._element.querySelector(".element__heart-icon").addEventListener('click', function (event) {
      event.target.classList.toggle("element__heart-icon_active");
    });
  }; 

  _deleteElement() { 
    this._element.querySelector(".element__remove-button").addEventListener('click', function (event) {
      event.target.closest(".element").remove();
  });
  };

  // _handleCardClickImage() {
  //   this._element.querySelector(".element__image").addEventListener('click', () => {
  //     this._handleCardClick();
  //   });
  // }

  _setEventListners() { 
    // this._element.querySelector(".element__remove-button").addEventListener("click", this._deleteElement); 
    this._element.querySelector(".element__heart-icon").addEventListener("click", () =>  this._addLike()); 
    this._element.querySelector(".element__image").addEventListener("click", () => this._handleCardClick(this._title, this._link)); 
  }; 

  generateCard() { 
    this._element = this._getTemplate(); 
     this._deleteElement();
    // // this._handleCardClickImage();
     this._addLike();

    this._elementTitle = this._element.querySelector(".element__title");
    this._elementImage = this._element.querySelector(".element__image");

    this._elementTitle.textContent = this._title;
    this._elementImage.setAttribute("src", this._link);
    this._elementImage.setAttribute("alt", this._title);

    this._setEventListners();

      return this._element; 
  }; 
} 