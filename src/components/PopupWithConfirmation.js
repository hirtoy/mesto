import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleSubmitDelete }) {
    super(popupSelector);
    this._handleSubmitDelete = handleSubmitDelete;
    this._form = this._popupElement.querySelector('.popup__form');
    this._confirmButton = this._form.querySelector('.popup__submit-button');
  }

  getCard(id, element) {
  this._clear();
  this.id = id;
  this._cardElement = element;
}

  _clear(){
  this.id = '';
  this._cardElement = '';
}

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (event) => {
      this.showLoadingStatus(true)
      event.preventDefault();
      this._handleSubmitDelete(this.id, this._cardElement);
    });
  }

  showLoadingStatus(isLoading, buttonText='Да') {
    if(isLoading) {
        this._confirmButton.textContent = 'Удаление...';
    } else {
        this._confirmButton.textContent = buttonText;
    }
}
}