import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import api from '~/services/api';

import Page from '../src/Page';

jest.mock('axios', () => ({
  get: jest.fn((url) => {
    console.log(url);
    return ['Teste'];
  }),
  create: jest.fn((params) => {
    console.log(params);
    return null;
  }),
}));

jest.mock('~/services/api', () => ({
  get: jest.fn((url) => {
    console.log(url);
    return { data: 'Teste' };
  }),
  create: jest.fn((params) => {
    console.log(params);
    return null;
  }),
}));

describe('Api', () => {
  it('shoud input change', () => {
    const { getByTestId } = render(<Page />);
    fireEvent.change(getByTestId('input-user'), { target: { value: 'A' } });
    expect(getByTestId('input-user')).toHaveValue('A');
  });

  it('should get any', () => {
    const { getByText, getByTestId } = render(<Page />);

    fireEvent.click(getByText('Click'), {});
    // expect(getByTestId('input-user')).toHaveValue('Teste');
    expect(getByTestId('div-user')).toHaveTextContent('Teste');
    // axios.get('techs');
  });
});
