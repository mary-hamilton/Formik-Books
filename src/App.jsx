import BookForm from './BookForm';
import {Box, Container, styled, Typography} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import AppContext from "./context";
import AuthorForm from "./AuthorForm";
import CategoryForm from "./CategoryForm";
import Home from "./Home"
import AdminBorrowingForm from "./AdminBorrowingForm";
import {Route, Routes} from "react-router-dom";


const App = () => {

    const {
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
    } = useContext(AppContext);

    const getBooks = () => {
        client.getBooksApi().then(({data}) => {
            setBooks(data)
        });
    }

    const getCategories = () => {
        client.getCategoriesApi().then(({data}) => {
            setCategories(data)
        });
    }

    const getAuthors = () => {
        client.getAuthorsApi().then(({data}) => {
            setAuthors(data);
        });
    }

    const getMembers = () => {
        client.getMembersApi().then(({data}) => {
            setMembers(data);
        });
    }

    useEffect(() => {
            if(token) {
             getBooks();
             getCategories();
             getAuthors();
             getMembers();
        }},[])

    const StyledBox = styled(Box)({
        borderRadius: '10px',
        padding: '10px',
        border: '1px solid grey',
        margin: '10px 0',
    })
    return (
        <>
            <Container>
                <header>

                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home getBooks={getBooks} getMembers={getMembers} members={members} books={books}/>}/>
                        <Route path="/books" element={<BookForm getBooks={getBooks} authors={authors} categories={categories}/>}/>
                        <Route path="/categories" element={<CategoryForm getCategories={getCategories}/>}/>
                        <Route path="/authors" element={<AuthorForm getAuthors={getAuthors}/>}/>
                        <Route path="/borrow" element={<AdminBorrowingForm getBooks={getBooks} getMembers={getMembers} members={members} books={books}/>}/>
                    </Routes>
                </main>
                {/*{books.map((book, i) => (*/}
                {/*    <StyledBox key={i}>*/}
                {/*        <Typography>{`Title: ${book.title}`}</Typography>*/}
                {/*        <Typography>{`Synopsis: ${book.synopsis}`}</Typography>*/}
                {/*        <Typography>{`Author: ${book.authorName}`}</Typography>*/}
                {/*        <Typography>{`Category title: ${book.categoryTitle}`}</Typography>*/}
                {/*        <Typography>{`Category description: ${book.categoryDescription}`}</Typography>*/}
                {/*        <Typography>{`Borrowed by: ${book.borrowedBy.map(person => person.firstName).join(", ")}`}</Typography>*/}
                {/*    </StyledBox>*/}
                {/*))}*/}
            </Container>

        </>

    );
};

export default App;
