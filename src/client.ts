/*
 * Okaeri SDK (Node)
 * Copyright (C) 2021 Okaeri, Dawid Sawicki
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
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
