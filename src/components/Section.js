export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = containerSelector;
      }
    
      rendererItems(itemsArr) {
        itemsArr.forEach((item) => this._renderer(item));
      }
    
      addItemPrepend(element) {
        this._containerSelector.prepend(element);
      }

      addItemAppend(element) {
        this._containerSelector.append(element);
      }
    }