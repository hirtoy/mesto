import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, callbackForm) {
        super(popupSelector);
        this._callbackForm = callbackForm;
        this._popupFormElement = this._popupElement.querySelector('.popup__form');
        // this._inputList = this._popupFormElement.querySelector('.popup__form-item');
        // this._submitButton = this._popupFormElement.querySelector('.popup__submit-button');
    }

    _getInputValues() {
        const formValues = {};
        const inputList = Array.from(this._popupFormElement.querySelectorAll('.popup_form-item'));
        inputList.forEach(inputElement => formValues[inputElement.name] = inputElement.value());

        return formValues;
    }

    setEventListeners() {
        this._popupFormElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._callbackForm(this._getInputValues());
            this.close();
        });
        super.setEventListeners();
    }

    close() {
        this._popupFormElement.reset();
        super.close();
    }

}