import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

/**
 * Configuration class needed in base class.
 * The config is provided to the API client at initialization time.
 * API clients inherit from #AuthorizedApiBase and provide the config.
 */
export type ApiOptions = {
    apiKey: string | undefined,
};

export class ApiConfig {

    private _apiKey: string = "";

    constructor(options: ApiOptions | null = null) {
        if (options != null) {
            this._apiKey = options.apiKey || "";
        }
    }

    isAnonymous() {
        return !this.isApiKeyAuth() && !this.isJwtAuth();
    }

    isApiKeyAuth() {
        return this._apiKey != "";
    }

    isJwtAuth() {
        return this.getAuthorization() != "";
    }
    /**
     * Returns a valid value for the Authorization header.
     * Used to dynamically inject the current auth header.
     */
    getAuthorization() {
        try {
            return ("Bearer " + localStorage.getItem('AdminAuthToken')) || "";
        } catch(e) {
        }
        return "";
    }

    getApiKey() {
        return this._apiKey;
    }
}

export function setAuthorizationToken(token: string | null) {
    if (token == null) {
        localStorage.removeItem('AdminAuthToken');
    } else {
        localStorage.setItem('AdminAuthToken', token);
    }
} 

export class AuthorizedApiBase {
    private readonly config: ApiConfig;

    protected constructor(config: ApiConfig) {
        this.config = config;
    }

    protected transformOptions = (options: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        options.headers = {
            ...options.headers,
        };
        if (!this.config.isAnonymous()) {

            if (options.headers.common == undefined) options.headers.common = new AxiosHeaders();

            if (this.config.isApiKeyAuth()) {
                options.headers.common['X-Api-Key'] = this.config.getApiKey();
            } else {
                options.headers.common['Authorization'] = this.config.getAuthorization();
            }
        }
        return Promise.resolve(options);
    };
}