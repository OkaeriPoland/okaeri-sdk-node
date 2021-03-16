import axios, {AxiosInstance} from "axios";

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

export class AiCensor {

    private client: AxiosInstance;

    public constructor(config: any = {}) {

        const basePath = config.basePath || process.env.OKAERI_SDK_AICENSOR_BASE_PATH || "https://ai-censor.okaeri.eu";
        const timeout = config.timeout || process.env.OKAERI_SDK_TIMEOUT || 5000;
        const token = config.token || process.env.OKAERI_SDK_AICENSOR_TOKEN;

        this.client = axios.create({
            baseURL: basePath,
            timeout: timeout,
            headers: {'Token': token}
        });
    }

    public getPrediction(phrase: string): Promise<CensorPredictionInfo> {
        return new Promise((resolve, reject) => {
            this.client
                .post<CensorPredictionInfo>("/predict", {"phrase": phrase})
                .then(response => resolve(response.data))
                .catch(err => reject(err));
        });
    }
}