import React, { useState } from 'react';

const PhoneForm = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    await props.editNumber({
      variables: {
        name,
        phone,
      },
    });

    setName('');
    setPhone('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          Name
          <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          Phone
          <input value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <button type="submit">Change number</button>
      </form>
    </div>
  );
};

export default PhoneForm;
