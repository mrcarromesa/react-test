import React, { useState } from 'react';
import api from '~/services/api';

// import { Container } from './styles';

export default function Page() {
  const [user, setUser] = useState('');
  const [newUser, setNewUser] = useState('');

  function handleGetItens() {
    console.log('clicou');
    const result = api.get('user');
    console.log(result);
    setUser(result.data);
  }

  return (
    <div>
      <input
        type="text"
        data-testid="input-user"
        value={newUser}
        onChange={(e) => {
          setNewUser(e.target.value);
        }}
      />
      <div data-testid="div-user">{user}</div>
      <button type="button" data-testid="bt-user" onClick={handleGetItens}>
        Click
      </button>
    </div>
  );
}
