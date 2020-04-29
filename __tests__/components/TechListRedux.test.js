import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import TechListRedux from '~/components/TechListRedux';

import { addTech } from '~/store/modules/techs/actions';

jest.mock('react-redux');
// a partir desse momento as functions do react-redux não serão as do component
// Elas serão funções ficticias criadas pelo test.
// Então todas as functions importadas do react-redux não seriam importadas do react-redux em si
// mas de dentro do test

describe('TechListRedux component', () => {
  it('should render tech list', () => {
    useSelector.mockImplementation((callback) =>
      callback({
        techs: ['Node.js', 'ReactJS'],
      })
    );

    const { getByTestId, getByText } = render(<TechListRedux />);

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
  });

  it('shoud be able to add new tech', () => {
    const { getByTestId, getByLabelText } = render(<TechListRedux />);

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('form-tech'));

    console.log(dispatch.mock.calls);

    expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
  });
});
