import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupFormElement = this._popupElement.querySelector('.popup__form');
        this._inputList = this._popupFormElement.querySelector('.popup__form-item');
        // this._submitButton = this._popupFormElement.querySelector('.popup__submit-button');
    }

    _getInputValues() {
        this._formValues = {};
        Array.from(this._inputList).forEach(input => {this._formValues[input.title] = input.value});
    return this._formValues;
        // const formValues = {}; 
        // Array.from(this._inputList).forEach((inputElement) => formValues[inputElement.name] = inputElement.value); 
        // return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
    close() {
        this._popupFormElement.reset();
        super.close();
    }
}