import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';
import {
  getTechsSuccess,
  getTechsFailure,
} from '~/store/modules/techs/actions';
import { getTechs } from '~/store/modules/techs/sagas';

const apiMock = new MockAdapter(api);

describe('Techs saga', () => {
  it('shoud be able to fetch techs', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(200, ['Node.js']);
    // como o getTechs é um generator transformamos para Promise
    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(['Node.js']));
  });

  it('shoud fail when api returns error', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(500);

    console.log('zzzz');
    // como o getTechs é um generator transformamos para Promise
    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
  });
});
