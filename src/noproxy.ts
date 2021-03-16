import axios, {AxiosInstance} from "axios";

interface NoProxyAddressInfoGeneral {
    ip: string,
    asn: number,
    provider: string,
    country: string
}

interface NoProxyAddressInfoRisks {
    total: number,
    proxy: boolean,
    country: boolean,
    asn: boolean,
    provider: boolean,
    abuser: boolean
}

interface NoProxyAddressInfoScore {
    noproxy: number,
    abuseipdb: number
}

interface NoProxyAddressInfoSuggestions {
    verify: boolean,
    block: boolean
}

interface NoProxyAddressInfo {
    general: NoProxyAddressInfoGeneral,
    risks: NoProxyAddressInfoRisks,
    score: NoProxyAddressInfoScore,
    suggestions: NoProxyAddressInfoSuggestions
}

interface NoProxyConfig {
    baseURL?: string,
    timeout?: number,
    token?: string
}

export class NoProxy {

    private client: AxiosInstance;

    public constructor(config: NoProxyConfig = {}) {

        const baseURL = config.baseURL || process.env.OKAERI_SDK_NOPROXY_BASE_PATH || "https://noproxy-api.okaeri.eu";
        const timeout = config.timeout || parseInt(process.env.OKAERI_SDK_TIMEOUT as string, 10) || 5000;
        const token = config.token || process.env.OKAERI_SDK_NOPROXY_TOKEN;
        const headers = {'Authorization': `Bearer ${token}`};

        this.client = axios.create({baseURL, timeout, headers});
    }

    public getInfo(address: string): Promise<NoProxyAddressInfo> {
        return new Promise((resolve, reject) => {
            this.client
                .get<NoProxyAddressInfo>(`/v1/${address}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response ? error.response.data : error));
        });
    }
}
