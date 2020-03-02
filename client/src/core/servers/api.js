import { getToken } from "../services/auth.service";

export const SERVER_URL = 'http://localhost:3001';

class Api{
    get(url, body, params) {
        return send(url, {body, ...params})
    }
    
    post(url, body, params) {
        return send(url, {method: 'post', body, ...params})
    }
    
    put(url, body, params) {
        return send(url, {method: 'put', body, ...params})
    }
    
    delete(url, body, params) {
        return send(url, {method: 'delete', body, ...params})
    }
}

function send(url, {body, ...params}) {
    return fetch(`${SERVER_URL}/${url}`, {...configs(), ...params, body: JSON.stringify(body)})
        .then(handleErrors)
        .then(res => res.json())

        function handleErrors(response) {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response;
        }
}

function configs() {
    return {
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client,
    }
}

export default new Api();