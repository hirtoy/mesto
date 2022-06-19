export class UserInfo {
    constructor(name, userInfo) {
        this.name = name;
        this.userInfo = userInfo;
    };

    setUserInfo(data) {
        this.name.textContent = data.name;
        this.userInfo.textContent = data.userInfo;
    };

    getUserInfo() {
        const data = {
            name: this.name.textContent,
            info: this.userInfo.textContent
        };
        return data;
    };
}