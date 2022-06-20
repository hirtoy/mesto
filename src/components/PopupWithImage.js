import Popup from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._namePopup = document.querySelector('.popup__image-subtitle');
        this._imagePopup = document.querySelector('.popup__image');
    }

    open({ link, title }) {
        this._imagePopup.src = link;
        this._imagePopup.alt = title;
        this._namePopup.textContent = title;
        super.open();
    }
}