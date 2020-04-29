import reducer, { INITIAL_STATE } from '~/store/modules/techs/reducer';
import * as Techs from '~/store/modules/techs/actions';

describe('Techs reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('ADD_TECH', () => {
    // Sempre é bom entender como a function funcionar, como se comporta
    // O que ela recebe de parametros e o que ela retorna
    // Nesse caso ela espera uma variavel vazia e uma action, o qual ira
    // adicionar um valor para o state e irá retornar um array.
    const state = reducer(INITIAL_STATE, Techs.addTech('Node.js'));

    expect(state).toStrictEqual(['Node.js']);
  });
});
