import axios, {AxiosInstance, AxiosResponse} from "axios";
import {OkaeriClient} from "./helper";


interface ServerRealAddress {
    ip: string,
    port: number,
    wildcard: boolean
}

interface MinecraftJavaProtocolVersion {
    name: string,
    protocol: number
}

interface MinecraftJavaSpecificVersion {
    name: string,
    protocol: number,
    full_name: string
}

interface MinecraftJavaVersionRange {
    display: string,
    minimal_version: MinecraftJavaSpecificVersion,
    maximal_version: MinecraftJavaSpecificVersion
}

interface MinecraftJavaVersion {
    raw: MinecraftJavaProtocolVersion,
    range: MinecraftJavaVersionRange
}

interface ServerPlayers {
    max: number,
    online: number,
    list: string[]
}

interface ServerIcon {
    generic: boolean,
    base64: string,
    url: string
}

interface ServerMotd {
    raw: string,
    text: string,
    normalized: string,
    html: string
}

interface MinecraftJavaInfo {
    address: ServerRealAddress,
    version: MinecraftJavaVersion,
    players: ServerPlayers,
    favicon: ServerIcon,
    motd: ServerMotd,
    query: Map<string, object>
}

interface ServerHistory {
    highest: ServerHistoryEntry,
    entries: ServerHistoryEntry[]
}

interface ServerHistoryEntry {
    time: string,
    online: number
}

interface Gamespy4MinecraftJavaResponse {
    address: ServerRealAddress,
    version: MinecraftJavaVersion,
    players: ServerPlayers,
    motd: ServerMotd,
    plugins: string[]
}

interface MinecraftBedrockVersion {
    raw: string
}

interface Gamespy4MinecraftBedrockResponse {
    address: ServerRealAddress,
    version: MinecraftBedrockVersion,
    players: ServerPlayers,
    motd: ServerMotd,
    plugins: string[]
}

interface GameDataConfig {
    baseURL?: string,
    timeout?: number,
    token?: string
}

export class GameData {

    private axios: AxiosInstance;
    private client: OkaeriClient;

    public constructor(config: GameDataConfig = {}) {

        const baseURL = config.baseURL || process.env.OKAERI_SDK_GAMEDATA_BASE_PATH || "https://gamedata-api.okaeri.eu";
        const timeout = config.timeout || parseInt(process.env.OKAERI_SDK_TIMEOUT as string, 10) || 5000;
        const token = config.token || process.env.OKAERI_SDK_GAMEDATA_TOKEN || "";
        const headers = token ? {'Authorization': `Bearer ${token}`} : {};

        this.axios = axios.create({baseURL, timeout, headers});
        this.client = new OkaeriClient(this.axios);
    }

    public getGamespy4MinecraftJava(address: string): Promise<Gamespy4MinecraftJavaResponse> {
        return this.client.get<Gamespy4MinecraftJavaResponse>(`/v1/gamespy4/${address}/minecraftjava`)
    }

    public getGamespy4MinecraftBedrock(address: string): Promise<Gamespy4MinecraftBedrockResponse> {
        return this.client.get<Gamespy4MinecraftBedrockResponse>(`/v1/gamespy4/${address}/minecraftbedrock`)
    }

    public getMinecraftJavaFavicon(address: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            this.axios
                .get(`/v1/minecraftjava/${address}/favicon`, {responseType: 'arraybuffer'})
                .then(response => {
                    resolve(Buffer.from(response.data, 'binary'))
                })
                .catch(error => reject(error.response ? error.response.data : error));
        });
    }

    public getMinecraftJavaHistory(address: string, days: number): Promise<ServerHistory> {
        return this.client.get<ServerHistory>(`/v1/minecraftjava/${address}/history/${days}`);
    }

    public getMinecraftJavaInfo(address: string): Promise<MinecraftJavaInfo> {
        return this.client.get<MinecraftJavaInfo>(`/v1/minecraftjava/${address}/info`)
    }
}
