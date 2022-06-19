export class Section {
    constructor({renderer, items}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems = () => {
        this._items.forEach(item => {
            this._renderer(item);
        })
    }

    addItem = (element) => {
        this._container.prepend(element);
    }
}