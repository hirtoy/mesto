export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
}

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Загрузка информации о пользователе с сервера
  getUserProfile() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleResponse)
  }
  // Редактирование профиля
  setUserProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => this._handleResponse(res));
  }
  // Обновление аватара пользователя
  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then((res) => this._handleResponse(res));
  }
  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => this._handleResponse(res));
  }
  // Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then((res) => this._handleResponse(res));
  }
  // Удаление карточки
  removeCard(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._handleResponse(res));
  }
  // Постановка лайка
  addLikeCard(_id) {
    return fetch(`${this._url}/cards/likes/${_id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => this._handleResponse(res));
  }
  // Снятие лайка
  removeLikeCard(_id) {
    return fetch(`${this._url}/cards/likes/${_id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._handleResponse(res));
  }
}