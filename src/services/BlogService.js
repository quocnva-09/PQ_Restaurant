import api from '../api/api';  

const BlogService = {
    
    getPublishedBlogs: async () => {
        try {
            const response = await api.get('/blogs');
            return response.data.result;
        } catch (error) {
            console.error("Error fetching published blogs:", error);
            throw error;
        }
    },

    getBlogBySlug: async (slug) => {
        try {
            const response = await api.get(`/blogs/${slug}`);
            return response.data.result;
        } catch (error) {
            console.error(`Error fetching blog with slug ${slug}:`, error);
            throw error;
        }
    },

    // ADMIN

    getAllBlogs: async () => {
        try {
            const response = await api.get('/admin/blogs');
            return response.data.result;
        } catch (error) {
            console.error("Error fetching all blogs (admin):", error);
            throw error;
        }
    },

    createBlog: async (blogRequest) => {
        try {
            const response = await api.post('/admin/blogs', blogRequest);
            return response.data.result;
        } catch (error) {
            console.error("Error creating blog:", error);
            throw error;
        }
    },

    updateBlog: async (id, blogRequest) => {
        try {
            const response = await api.put(`/admin/blogs/${id}`, blogRequest);
            return response.data.result;
        } catch (error) {
            console.error(`Error updating blog ${id}:`, error);
            throw error;
        }
    },

    publishBlog: async (id) => {
        try {
            const response = await api.put(`/admin/blogs/${id}/publish`, {});
            return response.data;
        } catch (error) {
            console.error(`Error publishing blog ${id}:`, error);
            throw error;
        }
    },

    deleteBlog: async (id) => {
        try {
            const response = await api.delete(`/admin/blogs/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting blog ${id}:`, error);
            throw error;
        }
    },
    getBlogById: async (id) => {
        try {
            const response = await api.get(`/admin/blogs/${id}`);
            return response.data.result;
        } catch (error) {
            console.error(`Lỗi khi lấy chi tiết blog ID ${id}:`, error);
            throw error;
        }
    },
};

export default BlogService;