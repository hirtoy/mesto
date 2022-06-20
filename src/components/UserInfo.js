export default class UserInfo {
    constructor(name, info) {
        this.name = name;
        this.info = info;
    };

    setUserInfo() {
        const data = {
        name: this.name.textContent,
        info: this.info.textContent
        }
        return data;
    };

    getUserInfo() {
        const userInfo = {
            name: this.name.textContent,
            info: this.info.textContent
        };
        return userInfo;
    };
}