/**
 * Configuration class needed in base class.
 * The config is provided to the API client at initialization time.
 * API clients inherit from #AuthorizedApiBase and provide the config.
 */
export class ApiConfig {
    /**
     * Returns a valid value for the Authorization header.
     * Used to dynamically inject the current auth header.
     */
    getAuthorization() {
        return "Bearer " + localStorage.getItem('AdminAuthToken') || "";
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

    protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
        options.headers = {
            ...options.headers,
            Authorization: this.config.getAuthorization(),
        };
        return Promise.resolve(options);
    };
}