export default class Section {
    constructor({ renderer }, container) {
        this._renderer = renderer;
        this._container = container;
      }
    
      rendererItems(itemsArr) {
        itemsArr.forEach((item) => this._renderer(item));
      }
    
      addItemPrepend(element) {
        this._container.prepend(element);
      }

      addItemAppend(element) {
        this._container.append(element);
      }
    }