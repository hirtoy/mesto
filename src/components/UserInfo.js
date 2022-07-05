export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) { 
        this._nameUser = document.querySelector(nameSelector);
        this._aboutUser = document.querySelector(aboutSelector);
        this._avatar = document.quearySelector(avatarSelector);
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