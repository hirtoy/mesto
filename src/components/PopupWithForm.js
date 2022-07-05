import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupFormElement = this._popupElement.querySelector('.popup__form');
        this._inputList = this._popupElement.querySelectorAll('.popup__form-item');
        this._button = this._popupElement.querySelector('button[type="submit"]');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => 
            this._formValues[input.name] = input.value);
        return this._formValues;
    }

    _submitForm(event) { 
        event.preventDefault(); 
        this._handleFormSubmit(this._getInputValues()); 
    } 

    setEventListeners() {
        super.setEventListeners(); 
        this._popupElement.addEventListener('submit', this._submitForm.bind(this)); 
  }

    setUserForm(isSending) {
    this._button.textContent = isSending ? 'Загрузка...' : this._buttonDefaultText;
  }
    close() {
        this._popupFormElement.reset();
        super.close();
    }
}