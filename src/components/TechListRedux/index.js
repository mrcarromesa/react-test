import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addTech } from '~/store/modules/techs/actions';

// import { Container } from './styles';

export default function TechListRedux() {
  const [newTech, setNewTech] = useState('');

  const dispatch = useDispatch();
  const techs = useSelector((state) => state.techs);

  function handleAddTechs() {
    dispatch(addTech(newTech));
    setNewTech('');
  }

  return (
    <form data-testid="form-tech" onSubmit={handleAddTechs}>
      <ul data-testid="tech-list">
        {techs.map((techItem) => (
          <li key={techItem}>{techItem}</li>
        ))}
      </ul>
      <label htmlFor="tech">
        Tech
        <input
          type="text"
          id="tech"
          value={newTech}
          onChange={(e) => setNewTech(e.target.value)}
        />
      </label>
      <button type="submit">Adicionar</button>
    </form>
  );
}
