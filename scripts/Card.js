import { openImagePopup } from "./index.js";
export class Card {
    constructor(title, link, templateSelector) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
    };
  
  _getTemplate() {
    const templateElement = document.querySelector(this._templateSelector);
    const cardElement = templateElement.content.firstElementChild.cloneNode(true);
    return cardElement;
  };

  _addLike(event) {
    event.target.classList.toggle("element__heart-icon_active");
  };
  
  _deleteElement = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListners() {
    this._element.querySelector(".element__remove-button").addEventListener("click", this._deleteElement);
    this._element.querySelector(".element__heart-icon").addEventListener("click", this._addLike);
    this._element.querySelector(".element__image").addEventListener("click", () => { openImagePopup(this._title, this._link) });
  };

  _generateCard() {
    
    this._element = this._getTemplate();

    const elementTitle = this._element.querySelector(".element__title");
    const elementImage = this._element.querySelector(".element__image");

    elementTitle.textContent = this._title;
    elementImage.setAttribute("src", this._link);
    elementImage.setAttribute("alt", this._title);

    this._element.elementTitle = elementTitle;
    this._element.elementImage = elementImage;
  
      this._setEventListners();

      return this._element;
  };
}