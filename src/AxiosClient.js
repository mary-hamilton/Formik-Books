import axios from "axios";
import App from "./App";
import AppContext from "./context";
import {useState} from "react";

const baseUrl = `http://localhost:8080/api`;

const AxiosClient = () => {

    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [ books, setBooks ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ authors, setAuthors ] = useState([]);
    const [ members, setMembers ] = useState([]);

    const apiCall = ({method, url, data, ...rest}) => {
        return axios({
            method: method,
            url: `${baseUrl}${url}`,
            data: data,
            headers: {
                authorization: token ? `Bearer ${token}` : undefined,
            },
            ...rest
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

    const getMembersApi = () => {
        return apiCall({
            url: `/members`,
            method: 'get'
        }).catch((error) => alert(error.response.data.error));
    }

    const createMemberApi = (member) => apiCall({
        method: 'post',
        url: '/members/signup',
        data: member
    })
        .then(({data}) => {
            setToken(data.token);
            setUsername(data.username);
        })
        .catch((error) => alert(error.response.data.error));

    const memberLoginApi = ({ username, password }) => apiCall({
        method: 'post',
        url: '/members/login',
        auth: {username, password}
    }).then(({data}) => {
        setToken(data.token);
        setUsername(data.username);
    }).catch((error) => alert(error.response.data.error));


    const borrowBookApi = (lendingData) => apiCall({
        method: 'post',
        url: '/members/borrow',
        data: {bookId: Number(lendingData.bookId)}
    }).catch((error) => alert(error.response.data.error));


    const client = {
        getBooksApi,
        createBookApi,
        createCategoryApi,
        getCategoriesApi,
        createAuthorApi,
        getAuthorsApi,
        getMembersApi,
        createMemberApi,
        borrowBookApi,
        memberLoginApi,
    };

    return (
        <AppContext.Provider
            value={{
                client,
                token,
                username,
                books,
                setBooks,
                categories,
                setCategories,
                authors,
                setAuthors,
                members,
                setMembers
            }}>
            <App/>
        </AppContext.Provider>
    )
}

export default AxiosClient;