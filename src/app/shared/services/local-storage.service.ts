import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    /**
     * Retrieve the object with the specified key from the specified storage.
     * @param {string} key: key.
     * @param {boolean} session: true to use session instead of local storage.
     */
    public retrieve(key: string, session = false): any {
        let json = (session ?
            sessionStorage.getItem(key) :
            localStorage.getItem(key));

        if (!json) {
            return null;
        }
        return JSON.parse(json);
    }

    /**
     * Store the specified object with the specified key in the specified storage.
     * @param {string} key: key.
     * @param {any} value: object.
     * @param {boolean} session: true to use session instead of local storage.
     */
    public store(key: string, value: any, session = false) {
        if (session) {
            sessionStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    /**
     * Remove the object with the specified key from the specified storage.
     * @param {string} key: key.
     * @param {boolean} session: true to use session instead of local storage.
     */
    public remove(key: string, session = false) {
        if (session) {
            sessionStorage.removeItem(key);
        } else {
            localStorage.removeItem(key);
        }
    }
}
