export default class UserInfo {
    constructor({nameProfile, descriptionProfile, avatarProfile}) { 
        this._nameUser = document.querySelector(`${nameProfile}`);
        this._aboutUser = document.querySelector(`${descriptionProfile}`);
        this._avatar = document.quearySelector(`${avatarProfile}`);
    };

    getUserInfo() {
        return { 
            name: this._nameUser.textContent, 
            about: this._aboutUser.textContent
        };
    }
    setUserInfo(data) {
        this._nameUser.textContent = data.name;
        this._aboutUser.textContent = data.about;
        this._avatar.src = data.avatar;
        this._avatar.alt = data.name;
    }
}