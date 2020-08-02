export default class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  signup(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res.status);
    });
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res;
    });
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res;
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }

  saveNews(keyword, title, text, date, source, link, image) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        keyword, title, text, date, source, link, image,
      }),
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }

  getNews() {
    return fetch(`${this._baseUrl}/articles/`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }

  deleteNews(articlesId) {
    return fetch(`${this._baseUrl}/articles/${articlesId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) return Promise.reject(res.status);
      return res.json();
    });
  }
}
