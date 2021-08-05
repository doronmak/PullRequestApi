import { FULL_URL, PR_ROUTE } from './config';
import axios from 'axios';

export class PrController {
    constructor() {
        this.instance = axios.create({ baseURL: FULL_URL })
    }

    fetchData() {
        return new Promise((resolve, reject) => {
            this.instance.get(PR_ROUTE, {}, {
                "headers": {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject()
            });
        })
    }
}