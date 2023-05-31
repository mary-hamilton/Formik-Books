import FormikFormDemo from './FormikFormDemo';
import { Box, Container, styled, Typography } from '@mui/material';
import { useState } from 'react';
import FormDemo from './FormDemo';

const App = () => {
  const [people, setPeople] = useState([]);

  const StyledBox = styled(Box)({
    borderRadius: '10px',
    padding: '10px',
    border: '1px solid grey',
    margin: '10px 0',
  })
  return (
    <Container>
      <FormikFormDemo people={people} setPeople={setPeople}/>
      {/*<FormDemo people={people} setPeople={setPeople}/>*/}
      {people.map((person, i) => (
        <StyledBox key={i}>
          <Typography>{`First Name: ${person.firstName}`}</Typography>
          <Typography>{`Surname: ${person.surname}`}</Typography>
          <Typography>{`Email: ${person.email}`}</Typography>
        </StyledBox>
      ))}
    </Container>
  );
};

export default App;
