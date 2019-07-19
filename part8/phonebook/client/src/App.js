import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';

const ALL_PERSONS = gql`
{  
  allPersons {
    name
    phone
    address {
      street
      city
    }
    id
  }
}
`;

const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) { 
      addPerson(
        name: $name,
        street: $street,
        city: $city,
        phone: $phone
      ) {
          name
          phone
          id
          address {
            street
            city
          }
        }
    }
`;

const EDIT_NUMBER = gql`
mutation editNumber($name: String!, $phone: String!) {
  editNumber(name: $name, phone: $phone) {
    name
    phone
    address {
      street
      city
    }
  }
}
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const App = () => {
  const client = useApolloClient();
  const [token, setToken] = useState(null);
  const persons = useQuery(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const [login] = useMutation(LOGIN, {
    onError: handleError,
  });

  const [addPerson] = useMutation(CREATE_PERSON, {
    onError: handleError,
    update: (store, response) => {
      console.log(store)
      const dataInStore = store.readQuery({
        query: ALL_PERSONS,
      });

      dataInStore.allPersons.push(response.data.addPerson);

      store.writeQuery({
        query: ALL_PERSONS,
        data: dataInStore,
      });
    },
  });

  const [editNumber] = useMutation(EDIT_NUMBER);

  const errorNotification = () => {
    if (errorMessage) {
      return (
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      );
    }

    return null;
  };

  if (!token) {
    return (
      <div>
        {errorNotification()}
        <h2>Login</h2>
        <LoginForm login={login} setToken={(token => setToken(token))} />
      </div>
    );
  }

  return (
    <div>
      {errorNotification()}
      <Persons result={persons} />
      <h2>Create New</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Edit number</h2>
      <PhoneForm editNumber={editNumber} />
    </div>
  );
};

export default App;
