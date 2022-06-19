import Popup from './Popup.js';

export class PopupWithImage extends Popup {

    open({ link, title }) {
        this._popupElement.querySelector('.popup__image-subtitle').textContent = title;
        const imageElement = this._popupElement.querySelector('.popup__image');

        imageElement.src = link;
        imageElement.alt = `Изображение ${title}`;

        super.open();
    }
}