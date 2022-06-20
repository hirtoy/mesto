export default class Popup {
    constructor(popupSelector) {
        // this._popupSelector = document.querySelector(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._handleClickClose = this._handleClickClose.bind(this);
        this._handleKeydownClose = this._handleKeydownClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleKeydownClose);
    }

    close() {
        this._popupElement.classList.remove('popup_visible');
        document.removeEventListener('keydown', this._handleKeydownClose);
    }

    _handleKeydownClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _handleClickClose(event) {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }

    _removeEventListeners() {
        this._popupElement.removeEventListener('click', this._handleClickClose);

    }

    setEventListeners() {
        this._popupElement.querySelector('.popup__close-button').addEventListener('click', () => this.close());
        this._popupElement.addEventListener('click', this._handleClickClose);
    }
}