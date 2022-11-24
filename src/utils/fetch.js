import { URL } from '../constants/index'

class Api {
    constructor({ url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _handleRes(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialTodos() {
        return fetch(`${this._url}/users/1/todos`, {
            headers: this._headers
        })
            .then(this._handleRes)
    }
}

const api = new Api({
    url: URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export {
    api
}