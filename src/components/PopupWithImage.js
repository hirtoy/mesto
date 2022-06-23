import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._namePopup = this._popupElement.querySelector('.popup__image-subtitle');
        this._imagePopup = this._popupElement.querySelector('.popup__image');
    }

    open(data) {
        this._imagePopup.src = data.link;
        this._imagePopup.alt = data.title;
        this._namePopup.textContent = data.title;
        super.open();
    }
}