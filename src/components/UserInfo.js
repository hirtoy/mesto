export default class UserInfo {
    constructor({nameProfile, descriptionProfile}) { 
        this._nameUser = document.querySelector(`${nameProfile}`);
        this._infoUser = document.querySelector(`${descriptionProfile}`);
    };

    getUserInfo() {
        return { 
            name: this._nameUser.textContent, 
            description: this._infoUser.textContent
        };
    }
    setUserInfo(data) {
        this._nameUser.textContent = data.name;
        this._infoUser.textContent = data.description;
    }
}