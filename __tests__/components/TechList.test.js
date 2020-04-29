import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TechList from '~/components/TechList';

describe('TechList component', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('shoud be able to add new tech', () => {
    const { getByText, getByTestId, getByLabelText, debug } = render(
      <TechList />
    );

    debug();

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('form-tech'));

    debug();

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Tech')).toHaveValue('');
  });

  it('shoud store techs in storage', () => {
    let { getByText, getByTestId, getByLabelText, debug, unmount } = render(
      <TechList />
    );
    // debug();

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('form-tech'));
    debug();

    unmount();
    ({ getByText, getByTestId, getByLabelText, debug } = render(<TechList />));
    debug();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'techs',
      JSON.stringify(['Node.js'])
    );
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  });
});
