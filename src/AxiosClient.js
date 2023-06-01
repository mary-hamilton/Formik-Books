import axios from "axios";
import App from "./App";
import AppContext from "./context";

const baseUrl = `http://localhost:8080/api`;

const AxiosClient = () => {

    const apiCall = ({ method, url, data }) => {
        return axios({
            method: method,
            url: `${baseUrl}${url}`,
            data: data
        }).catch((error) => {
            throw error;
        })
    }
    const getBooksApi = () => {
        return apiCall({
            url: `/books`,
            method: 'get'
        }).catch((error) => alert(error.response.data.error));
    }

    const createBookApi = (book) => apiCall({
        method: 'post',
        url: `/books`,
        data: {...book, categoryId: Number(book.categoryId), authorId: Number(book.authorId)}
    }).catch((error) => alert(error.response.data.error));

    const getCategoriesApi = () => {
        return apiCall({
            url: `/categories`,
            method: 'get'
        }).catch((error) => alert(error.response.data.error));
    }

    const createCategoryApi = (category) => apiCall({
        method: 'post',
        url: '/categories',
        data: category
    }).catch((error) => alert(error.response.data.error));

    const getAuthorsApi = () => {
        return apiCall({
            url: `/authors`,
            method: 'get'
        }).catch((error) => alert(error.response.data.error));
    }

    const createAuthorApi = (author) => apiCall({
        method: 'post',
        url: '/authors',
        data: author
    }).catch((error) => alert(error.response.data.error));


    const client = {getBooksApi, createBookApi, createCategoryApi, getCategoriesApi, createAuthorApi, getAuthorsApi};

    return (
        <AppContext.Provider
            value={{
                client,
            }}>
            <App/>
        </AppContext.Provider>
    )
}

export default AxiosClient;