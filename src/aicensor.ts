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
import axios, {AxiosInstance} from "axios";
import {OkaeriClient} from "./helper";

interface CensorPredictionInfoGeneral {
    swear: boolean,
    breakdown: string,
    domains: boolean
}

interface CensorPredictionInfoDetails {
    basic_contains_hit: boolean,
    exact_match_hit: boolean,
    ai_label: string,
    ai_probability: number,
    domains_list: string[]
}

interface CensorPredictionInfoElapsed {
    all: number,
    processing: number
}

interface CensorPredictionInfo {
    general: CensorPredictionInfoGeneral;
    details: CensorPredictionInfoDetails;
    elapsed: CensorPredictionInfoElapsed;
}

interface AiCensorConfig {
    baseURL?: string,
    timeout?: number,
    token?: string
}

export class AiCensor {

    private axios: AxiosInstance;
    private client: OkaeriClient;

    public constructor(config: AiCensorConfig = {}) {

        const baseURL = config.baseURL || process.env.OKAERI_SDK_AICENSOR_BASE_PATH || "https://ai-censor.okaeri.eu";
        const timeout = config.timeout || parseInt(process.env.OKAERI_SDK_TIMEOUT as string, 10) || 5000;
        const token = config.token || process.env.OKAERI_SDK_AICENSOR_TOKEN;
        const headers = {'Token': token};

        this.axios = axios.create({baseURL, timeout, headers});
        this.client = new OkaeriClient(this.axios);
    }

    public getPrediction(phrase: string): Promise<CensorPredictionInfo> {
        return this.client.post<CensorPredictionInfo>("/predict", {"phrase": phrase});
    }
}
