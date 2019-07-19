import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
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

const Persons = ({ result }) => {
  const client = useApolloClient();
  const [person, setPerson] = useState(null);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const showPerson = async (name) => {
    const { data } = await client.query({
      query: FIND_PERSON,
      variables: { nameToSearch: name },
      fetchPolicy: 'no-cache',
    });
    setPerson(data.findPerson);
  };

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {`${person.address.street} ${person.address.city}`}
        </div>
        <div>
          {person.phone}
        </div>
        <button type="button" onClick={() => setPerson(null)}>Close</button>
      </div>
    );
  }

  const persons = result.data.allPersons;

  return (
    <div>
      <h2>Persons</h2>
      {
        persons.map(p => (
          <div key={p.name}>
            {`${p.name} ${p.phone}`}
            <button type="button" onClick={() => showPerson(p.name)}>
              Show Address
            </button>
          </div>
        ))
      }
    </div>
  );
};

export default Persons;
