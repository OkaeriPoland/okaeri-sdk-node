import axios, {AxiosInstance} from "axios";
import {OkaeriClient} from "./client";

interface VoteIdentifier {
    type: string,
    value: string
}

interface ListVote {
    list: string,
    server: string,
    game: string,
    lang: string,
    background: string,
    backgroundType: string,
    identifiers: VoteIdentifier[],
    identifiersHash: string
}

interface ServerVoteStartRequest {
    list: string,
    stats_id: string,
    singleCooldown: number,
    generalCooldown: number,
    passIdentifiers: boolean,
    identifiers: VoteIdentifier[],
    server: string,
    game: string,
    lang: string,
    background: string
}

interface ServerVoteCheckRequest {
    votes: string[]
}

interface ServerVoteCheckResult {
    votes: Map<string, string>
}

interface ServerVote {
    url: string,
    serverVoteId: string
}

interface OpenVoteConfig {
    baseURL?: string,
    timeout?: number,
    token?: string
}

export class OpenVote {

    private axios: AxiosInstance;
    private client: OkaeriClient;

    public constructor(config: OpenVoteConfig = {}) {

        const baseURL = config.baseURL || process.env.OKAERI_SDK_OPENVOTE_BASE_PATH || "https://openvote-api.okaeri.eu";
        const timeout = config.timeout || parseInt(process.env.OKAERI_SDK_TIMEOUT as string, 10) || 5000;

        this.axios = axios.create({baseURL, timeout});
        this.client = new OkaeriClient(this.axios);
    }

    public postServerVoteNew(voteStartRequest: ServerVoteStartRequest): Promise<ServerVote> {
        return this.client.post<ServerVote>("/v1/server/vote/new", voteStartRequest)
    }

    public postServerVoteCheck(voteCheckRequest: ServerVoteCheckRequest): Promise<ServerVoteCheckResult> {
        return this.client.post<ServerVoteCheckResult>("/v1/server/vote/check", voteCheckRequest)
    }

    public postListSuccess(listVoteId: string, key: string): Promise<ListVote> {
        return this.client.post<ListVote>(`/v1/list/vote/success/${listVoteId}`, {key})
    }

    public postListError(listVoteId: string, key: string, errorCode: string, errorMessage: string): Promise<ListVote> {
        return this.client.post<ListVote>(`/v1/list/vote/error/${listVoteId}`, {key, error_code: errorCode, error_message: errorMessage})
    }

    public getListVote(listVoteId: string): Promise<ListVote> {
        return this.client.get<ListVote>(`/v1/list/vote/${listVoteId}`)
    }
}
