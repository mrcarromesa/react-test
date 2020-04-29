import React, { useState, useEffect } from 'react';

// import { Container } from './styles';

export default function TechList() {
  const [techs, setTechs] = useState([]);
  const [tech, setTech] = useState('');

  useEffect(() => {
    try {
      const techsStorage = JSON.parse(localStorage.getItem('techs'));
      if (techsStorage) {
        setTechs(techsStorage);
      }
    } catch (error) {
      //
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);

  function handleAddTechs() {
    setTechs([...techs, tech]);
    setTech('');
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
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />
      </label>
      <button type="submit">Adicionar</button>
    </form>
  );
}
