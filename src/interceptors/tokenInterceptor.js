import axios from 'axios';

// Token Service
class AuthService {
    constructor() {
        this.baseUrl = 'http://localhost:8084/web_order';
    }

    async refreshAccessToken() {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await axios.post(`${this.baseUrl}/auth/refresh`, {
                refreshToken: refreshToken
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            if (response.data.refreshToken) {
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }

            return response.data;
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            throw error;
        }
    }

    clearTokens() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }
}

// Router Service using React Router
class RouterService {
    constructor() {
        // We'll use the navigate function from useNavigate hook
        // Since we can't use hooks directly in a class,
        // this will be injected from the component that uses the interceptor
        this.navigate = null;
    }

    setNavigate(navigateFunction) {
        this.navigate = navigateFunction;
    }

    goTo(path) {
        if (this.navigate) {
            this.navigate(path);
        } else {
            // Fallback to window.location if navigate is not set
            window.location.href = path;
        }
    }
}

// Token Interceptor
class TokenInterceptor {
    constructor() {
        this.authService = new AuthService();
        this.router = new RouterService();
        
        // Create axios instance
        this.axiosInstance = axios.create();
        this.setupInterceptors();
    }

    attachToken(config, token = null) {
        const authToken = token || localStorage.getItem('token');
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    }

    setupInterceptors() {
        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            (config) => this.attachToken(config),
            (error) => Promise.reject(error)
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const response = await this.authService.refreshAccessToken();
                        return this.axiosInstance(this.attachToken(originalRequest, response.token));
                    } catch (refreshError) {
                        this.authService.clearTokens();
                        this.router.goTo('/login');
                        return Promise.reject(new Error('RefreshToken is expired!'));
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    getAxiosInstance() {
        return this.axiosInstance;
    }
}

// Create and export instance
const tokenInterceptor = new TokenInterceptor();
export default tokenInterceptor.getAxiosInstance();