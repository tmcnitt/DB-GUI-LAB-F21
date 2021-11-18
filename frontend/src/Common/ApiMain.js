import axios from 'axios';

export class ApiMain {
    
    url = "http://localhost:8000";

    getArticles() {
        return axios.get(`${this.url}/articles`);
    }

    getArticle(id) {
        return axios.get(`${this.url}/articles/${id}`);
    }

    addArticle(article) {
        return axios.post(`${this.url}/articles`, article);
    }

    editArticle(article) {
        return axios.put(`${this.url}/articles`, article);
    }

    deleteArticle(id) {
        return axios.delete(`${this.url}/articles/${id}`);
    }

    getSources() {
        return axios.get(`${this.url}/sources`);
    }

    getSource(id) {
        return axios.get(`${this.url}/sources/${id}`);
    }

    addSource(source) {
        return axios.post(`${this.url}/sources`, source);
    }

    login(user) {
        return axios.post(`${this.url}/login`, user);
    }

    signup (user) {
        return axios.post(`${this.url}/users`, user);
    }

    checkUser (token) {
        return axios.get(`${this.url}/users/check`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    getTags() {
        return axios.get(`${this.url}/tags`);
    }

    addTag(tag) {
        return axios.post(`${this.url}/tags`, tag);
    }

    addTagToArticle(id, tagId) {
        return axios.post(`${this.url}/articles/${id}/tags`, tagId);
    }

    removeTagFromArticle(id, tagId) {
        return axios.delete(`${this.url}/articles/${id}/tags/${tagId}`);
    }
}