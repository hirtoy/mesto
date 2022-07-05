export default class Api {
  constructor({address, token}) {
    this._address = address;
    this._token = token;
}

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  async getUserProfile() {
    const res = await fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    });
    return this._handleResponse(res);
  }
  // Редактирование профиля
  async setUserProfile(data) {
    const res = await fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    });
    return this._handleResponse(res);
  }
  // Обновление аватара пользователя
  async editUserAvatar(data) {
    const res = await fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    });
    return this._handleResponse(res);
  }
  // Загрузка карточек с сервера
  async getInitialCards() {
    const res = await fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    });
    return this._handleResponse(res);
  }
  // Добавление новой карточки
  async addNewCard(data) {
    const res = await fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
    return this._handleResponse(res);
  }
  // Удаление карточки
  async removeCard(id) {
    const res = await fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    });
    return this._handleResponse(res);
  }
  // Постановка лайка
  async addLikeCard(id) {
    const res = await fetch(`${this._address}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    });
    return this._handleResponse(res);
  }
  // Снятие лайка
  async removeLikeCard(id) {
    const res = await fetch(`${this._address}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    });
    return this._handleResponse(res);
  }
}