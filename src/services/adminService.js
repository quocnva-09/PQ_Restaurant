import api from '../interceptors/tokenInterceptor';

class AdminService {
    constructor() {
        // Đường dẫn API của Spring Boot backend
        this.baseUrl = 'http://localhost:8084/web_order';
        this.endpoints = {
            login: '/auth/log-in',
            adminDetails: '/auth/details',
            logout: '/auth/log-out',
            refresh: '/auth/refresh'
        };
    }

    // Đăng nhập
    async login(loginData) {
        try {
            const response = await api.post(`${this.baseUrl}${this.endpoints.login}`, {
                username: loginData.username,
                password: loginData.password
            });
            
            // Lưu token vào localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            if (response.data.refreshToken) {
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Đăng xuất
    async logout() {
        try {
            const token = localStorage.getItem('token');
            await api.post(`${this.baseUrl}${this.endpoints.logout}`, {
                token: token
            });
            
            // Xóa token khỏi localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        } catch (error) {
            throw error;
        }
    }

    // Refresh token
    async refreshToken() {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await api.post(`${this.baseUrl}${this.endpoints.refresh}`, {
                refreshToken: refreshToken
            });
            
            // Cập nhật token mới vào localStorage
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            if (response.data.refreshToken) {
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }
            
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Lấy token từ localStorage
    getToken() {
        return localStorage.getItem('token');
    }

    // Lấy refresh token từ localStorage
    getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    // Kiểm tra xem admin đã đăng nhập chưa
    isLoggedIn() {
        return !!this.getToken();
    }
}

const adminService = new AdminService();
export default adminService;