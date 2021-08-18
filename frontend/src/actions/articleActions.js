import axios from 'axios';
import {
    CREATE_ARTICLE,
    GET_ALL_ARTICLES,
    UPDATE_ARTICLE,
    DELETE_ARTICLE,
    SEARCH_ARTICLES
} from '../constants/adminConstants';


//Create an Article FOR ADMIN ONLY
export const createArticle = (articleData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/admin/article/create`, articleData, config)
        dispatch({
            type: CREATE_ARTICLE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

//Create an Article FOR ADMIN ONLY
export const editArticle = (id,articleData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/article/update/${id}`, articleData, config)
        dispatch({
            type: UPDATE_ARTICLE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const deleteArticle = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/article/delete/${id}`)
        dispatch({
            type: DELETE_ARTICLE,
            payload: data
        })
        return data
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const searchArticles = (searchTerm,orderBy) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/articles/search?searchTerm=${searchTerm}&orderBy=${orderBy}`)
        dispatch({
            type: SEARCH_ARTICLES,
            payload: data
        })
        return data.articles
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};

export const getAllArticles = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/articles/all`)
        dispatch({
            type: GET_ALL_ARTICLES,
            payload: data
        })
        return data.articles
    } catch (err) {
        
        return { message: 'An error has occured' }
    }

};