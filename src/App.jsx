import BookForm from './BookForm';
import { Box, Container, styled, Typography } from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import AppContext from "./context";
import AuthorForm from "./AuthorForm";
import CategoryForm from "./CategoryForm";

const App = () => {

  const { client } = useContext(AppContext);

  const [ books, setBooks ] = useState([]);
  const [ categories, setCategories ] = useState([]);

  const getBooks = () => {
    client.getBooksApi().then(({ data }) => {
      setBooks(data)
    });
  }

  const getCategories = () => {
    client.getCategoriesApi().then(({ data }) => {
      setCategories(data)
    });
  }

  const getAuthors = () => {
    client.getAuthorsApi().then(({ data }) => {
      setCategories(data)
    });
  }

  useEffect(() => getBooks(), []);
  useEffect(() => getCategories(), []);
  useEffect(() => getAuthors(), [])

  const StyledBox = styled(Box)({
    borderRadius: '10px',
    padding: '10px',
    border: '1px solid grey',
    margin: '10px 0',
  })
  return (
      <>
    <Container>
      <Typography>Add Book</Typography>
      <BookForm getBooks={getBooks}/>
      <Typography>Add Category</Typography>
      <CategoryForm getCategories={getCategories}/>
      <Typography>Add Author</Typography>
      <AuthorForm getAuthors={getAuthors}/>
      <Typography>{categories.map(cat => cat.title).join(", ")}</Typography>
      {books.map((book, i) => (
        <StyledBox key={i}>
          <Typography>{`Title: ${book.title}`}</Typography>
          <Typography>{`Synopsis: ${book.synopsis}`}</Typography>
          <Typography>{`Author: ${book.authorName}`}</Typography>
          <Typography>{`Category title: ${book.categoryTitle}`}</Typography>
          <Typography>{`Category description: ${book.categoryDescription}`}</Typography>
        </StyledBox>
      ))}
    </Container>

        </>

  );
};

export default App;
