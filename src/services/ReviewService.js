import api from '../api/api';
const ReviewService = {

    createReview: async (reviewData) => {
        try {
            const response = await api.post('/reviews', reviewData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllReviews: async () => {
        try {

            const response = await api.get(`/reviews`);
            
            if (Array.isArray(response.data)) {
                return response.data.map(item => item.result);
            }
            
            return [];
        } catch (error) {
            console.error("Error fetching all reviews:", error);
            throw error;
        }
    },

    getReviewsByProductId: async (productId) => {
        try {
            const response = await api.get(`/reviews/by-product/${productId}`);
            
            if (Array.isArray(response.data)) {
                return response.data.map(item => item.result);
            }
            
            return [];
        } catch (error) {
            console.error("Error fetching product reviews:", error);
            throw error;
        }
    },

    getMyReviews: async () => {
        try {
            const response = await api.get('/reviews/by-current-user');
            if (Array.isArray(response.data)) {
                return response.data.map(item => item.result);
            }
            return [];
        } catch (error) {
            throw error;
        }
    },

    getReviewsByUserId: async (userId) => {
        try {
            const response = await api.get(`/reviews/by-user/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getReviewById: async (reviewId) => {
        try {
            const response = await api.get(`/reviews/${reviewId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteReview: async (reviewId) => {
        try {
            const response = await api.delete(`/reviews/${reviewId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateReview: async (reviewId, reviewData) => {
        try {
            const response = await api.put(`/reviews/${reviewId}`, reviewData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

};

export default ReviewService;