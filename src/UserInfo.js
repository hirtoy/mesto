export default class UserInfo {
    constructor({nameProfile, descriptionProfile, avatarProfile}) { 
        this._nameUser = document.querySelector(`${nameProfile}`);
        this._avatar = document.querySelector(`${avatarProfile}`);
        this._aboutUser = document.querySelector(`${descriptionProfile}`);
    };

    getUserInfo() {
        return { 
            name: this._nameUser.textContent, 
            about: this._aboutUser.textContent,
            avatar: this._avatar.src
        };
    }
    setUserInfo(data) {
        this._nameUser.textContent = data.name;
        this._aboutUser.textContent = data.about;
        this._avatar.src = data.avatar;
        this._avatar.alt = data.name;
    }
}