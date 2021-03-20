import {AxiosInstance} from "axios";

export class OkaeriClient {

    private client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.client.defaults.headers["User-Agent"] = "okaeri-sdk/1 (node)"
    }

    public get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.client
                .get<T>(url)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response ? error.response.data : error));
        });
    }

    public post<T>(url: string, data: any): Promise<T> {
        return new Promise((resolve, reject) => {
            this.client
                .post<T>(url, data)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response ? error.response.data : error));
        });
    }
}
