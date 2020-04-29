<h1>Testes</h1>

---

<h2>Root Import React</h2>

- Adicionar as seguintes dependencias:

```bash
yarn add customize-cra react-app-rewired -D
```

- Adicionar a dependencia:

```bash
yarn add babel-plugin-root-import -D
```

- Criar na raiz do projeto o arquivo `config-overrides.js` com o seguinte conteúdo:

```js
const { addBabelPlugin, override } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src',
    },
  ])
);
```

- No arquivo `package.json` alterar os seguinte:

```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject"
},
```

- Para o eslint não se peder instale a dependencia:

```bash
yarn add eslint-import-resolver-babel-plugin-root-import -D
```

- No arquivo `eslint` adicionar uma configuração chamada `settings`:

```js
settings: {
  "import/resolver" : {
    "babel-plugin-root-import" : {
      rootPathSuffix: "src"
    }
  }
}
```

- E para o VS Code entender isso adicione o arquivo `jsonconfig.json` na raiz do
projeto:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "~/*": ["*"]
    }
  }
}
```
---

- Instale a lib:

```bash
yarn add react-app-rewired -D
```

- No arquivo `package.json` alterar o seguinte:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},
```

- Pelo seguinte:

```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject"
},
```

- Remover a configuração do eslint, do `package.json`:

```js
"eslintConfig": {
  "extends": "react-app"
},
```

- Se executarmos nesse momento um `yarn start` por exemplo não irá funcionar pois o
react-app-rewired, exige que criemos o arquivo `config-overrides.js` na raiz do projeto com o seguinte conteúdo:

```js
module.exports = {};
```

- Ele irá realizar o overide nas configurações do babel web pack ou do jest

- No arquivo `package.json` adicionar o seguinte:

```json
"jest": {
  "roots": [
    "<rootDir>/__tests__/"
  ],
  "testMatch": [
    "**/__tests__/**/*.test.js"
  ]
}
```

- `"testMatch"` Definie qual será o partten do testes que será feito. Nesse caso
irá utilizar todos os arquivos `.test.js` dentro da pasta `__tests__/`

- Criar na raiz do projeto uma pasta `__tests__/`

- Basicamente a pasta `__tests__` conterá o mesmo conteúdo de src.

- Para executar test execute o comando:

```bash
yarn test
```

- Para testar um arquivo especifico utilize o comando:

```bash
yarn test -- NOME_DO_ARQUIVO_SEM_PASTA.test.js
```

- Para utilizar o babel root import para realizar testes é necessario utilizar a
seguinte configuração:

```json
"jest": {
  "roots": [
    "<rootDir>/__tests__/"
  ],
  "testMatch": [
    "**/__tests__/**/*.test.js"
  ],
  "moduleNameMapper": {
    "^~/(.*)" : "<rootDir>/src/$1"

  }
}
```

- E caso tenha o babel root import instalado não esquecer de criar o `jsonconfig.js`

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "~/*": ["*"]
    }
  }
}
```

---


- Adicionar outra lib para realizar testes no react:

```bash
yarn add @testing-library/react @testing-library/jest-dom -D
```

- Essas são libs especificas para testar componentes do react

- `@testing-library/react` nos ajuda a saber se existe determinado componente na
Dom, se após executar uma ação tal elemento existe...

- `@testing-library/jest-dom` dá para procurar atributos nos elementos html e verificar com o jest
se ele existe.

- Instale também:

```bash
yarn add @types/jest -D
```

- `@types/jest` realiza o autocomplete nos dá o intelesence.

- Agora é necessário realizar uma configuração adicional no `package.json`:
dentro do `jest`:

```json
  "setupFilesAfterEnv": [
    "@testing-library/react",
    "@testing-library/jest-dom/extend-expect"
  ],
```

- São uma lista de arquivos que deverão ser chamados quando o ambiente estiver
configurado

- `"@testing-library/react"` cada vez que é feito teste e é gerado component
Html essa instrução limpa o html grado para não ficar incrementando a cada test.

- `"@testing-library/jest-dom/extend-expect"` extende as funcionalidades do dom
irá extender as funcionalidades do jest  em todos os tests.


- E execute:

```bash
yarn test
```

Para verificar que tudo está ok.


---


- Criar um component `src/components/TechList/index.js`.

- Criar o test `__tests/TechList.test.js`

- Importar o React:

```js
import React from 'react';
```

- Utilize o `describe()` para categorizar os tests

- Utilize o `it()` fala qual a funcionalidade esperada.

- Utilizamos o import `import { render } from '@testing-library/react'` que ele
irá criar o HTML fake para conseguirmos realizar os tests;

- Importamos também o componente que iremos reenderizar no caso do `TechList` seria o
`import TechList from '~/components/TechList'`

E dentro do `it()` inserimos algo como isso:

```js
  const { getByText } = render(<TechList />);
```

- Ali no getByText, podemos utilizar quando atributos/functions queremos desetruturar,
depende do que precisamos se é um text do botão ou outro componente e assim por diante.

- Para simular cliques de botão ou qualquer outro tipo de evento, blur, submit...
utilizamos o

```js
import { render, fireEvent } from '@testing-library/react';
```

- E então dentro do it podemos utilizar algo como:

```js
fireEvent.NOME_DO_EVENTO(getByO_NOME_DO_ATRIBUTO('valor'));
```

- E por fim inserimos o que esperamos como deve se comportar a aplicação:

```js
expect(getByATRIBUTO('valor')).toBeOQUE('valor');
```

- para obter determinado elemento utilizando outros atributos como no caso uma
especie de `id` podemos adicionar ao nosso elemento com `<ul data-testid="MEU-ID"></ul>`

e obter através do da function `getByTestId`:

```js
const { getByTestId } = render(<Component />);


// Eu estou esperando:
// - Espero que minha lista "MEU-ID" contenha um elemnto com o texto "Texto"
expect(getByTestId('MEU-ID')).toContainElement(getByText('Texto'));
```

- Para poder verificar como está ficando o test até mesmo o html utilizamos
o metodo `debug()`, antes e depois da ação.

```js
const { debug } = render(<Component />);
debug();
fireEvent.click(...)...;
debug();

expect(...);
```


---

<h2>Executando teste formulário</h2>

- Primeiro realizamos o evento do input, porém precisamos pegar o input, então
podemos utilizar a function `getByLabeText` o qual irá obter o label e através do `htmlFor`
obtem o input.

```js
const { getByLabelText } = render(<Component />);

getByLabelText('Nome no Label');
```

- Realizar o evento onChange:

```js
fireEvent.change(getByLabelText('Nome no label'), {target: {value: 'Valor'}});
```

- onde tem `{target: {value: 'Valor'}}` é para definirmos o valor, pois no evento
onChange do input para obtermos o texto ou valor utilizamos da seguinte forma:

```js
<input onChange={e => setState(e.target.value)}>
```

- E do formulário utilizamos o submit, e nos elementos que é dificil encontrar podemos utilizar o
`getByTestId` que será o caso do form:

```js
fireEvent.submit(getByTestId('id_form'));
```

- Esperar que o input esteja com o valor vazio após o submit:

```js
expect(getByLabelText('Label')).toHaveValue('');
```


---

<h2>Teste Local Storage</h2>

- Vamos importar o `cleanup` para limpar todo html e verificar se a informação
persiste.

**O cleanup pode não funcionar para isso utilize o unmount()**:

```js
let { getByText, getByTestId, getByLabelText, debug, unmount } = render(
  <TechList />
);
// debug();

fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
fireEvent.submit(getByTestId('form-tech'));

unmount();
```

**O cleanup pode não funcionar para isso utilize o unmount()**:

- Redefinir variaveis desestruturada:

```js

let { var1, var2 } = obj;

({ var1, var2 } = obj);

```

- Só utilizar o `(` em volta.

- Limpar o `localStorage` antes de cada teste:

```js
beforeEach(() => {
   localStorage.clear();
});
```


---

<h2>Mock</h2>

- Não é interessante utilizar funcionalidades de api de terceiros ou do próprio ambiente
o ideal é realizarmos isso como se fosse de forma simulada ou ficticio ou seja utilizando o mock

---

<h2>Mock LocalStorage</h2>

- Instale a dependencia:

```bash
yarn add jest-localstorage-mock -D
```

- No arquivo `package.json` adicione no `setupFilesAfterEnv` o seguinte:

```json
"jest-localstorage-mock"

```

- Verificar se a function `localStorage.setItem` foi chamada:

```js
expect(localStorage.setItem).toHaveBeenCalledWith("techs",JSON.stringify(['Node.js']));
```
---

<h2>Testes utilizando o Redux</h2>

- Criar o component `TechListRedux/index.js`

- Criar o test `TechListRedux.test.js`

- Instalar a dependencia:

```bash
yarn add redux react-redux
```

- Não iremos testar o component em si, iremos utilizar dados fakes do redux realizando mock para isso
Apenas para saber se tudo está funcionando certinho e não na aplicação em si.


---

<h2>Mock do Redux</h2>

- Para utilizar o mock inserimos isso no arquivo de test:

```js
jest.mock('DEPENDENCIA_AQUI');
// a partir desse momento as functions do react-redux não serão as do component
// Elas serão funções ficticias criadas pelo test.
// Então todas as functions importadas do react-redux não seriam importadas do react-redux em si
// mas de dentro do test
```

- Então dentro do teste iremos adicionar a implementação do mock.

```js
it('should render tech list', () => {
    useSelector.mockImplementation((callback) =>
      callback({
        techs: ['Node.js', 'ReactJS'],
      })
    );
  });
```

- Nesse caso precisamos entender o que o componente/function retorna e daí podemos
utilizar o `mockImplementation` e assim podemos utilizar a function de forma totalmente isolada da aplicação.

---

<h2>Teste useDispatch</h2>

- No `useSelector` utilizamos o `mockImplementation`

- Para o `useDispatch` utilizamos o `mockReturnValue` para retornar um valor

- E podemos iniciar a nossa variavel utilizando:

```js
const dispatch = jest.fn();
```

- o `useDispatch` irá receber de dispatch.

- Por fim podemos verificar a chamada utilizando o:

```js
expect(dispatch).toHaveBeenCalledWith({
  type: 'ADD_TECH',
  payload: { tech: 'Node.js' },
});
```

- Ou melhor criamos a seguinte estrutura:

```
src/store/modules/techs/actions.js
```

E nesse arquivo adicionamos o seguinte:

```js
export function addTech(tech) {
  return {
    type: 'ADD_TECH',
    payload: { tech },
  };
}
```

- E no teste `TechListRedux.test.js` importar o arquivo e alterar:

```js
expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
```

- A function `actions` deve ser importado pelo componet `TechListRedux`


- Só acessar os arquivos e conferir como ficou o resultado final.

---

<h2>Teste de Reducer</h2>

- Os testes no reducer será feita de forma isolada:

- Primeiro instale o `immer` para fazer o produção do estado imutável.

```bash
yarn add immer
```

- Criar o arquivo `src/store/modules/techs/reducer.js`

```js
import produce from 'immer';

export const INITIAL_STATE = [];

export default function techs(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_TECH' :
        draft.push(action.payload.tech);
        break;
      default:
    }
  })
}
```

- Criar um arquivo `__tests_/store/reducers/techs.test.js`:

```js
import reducer, { INITIAL_STATE } from '~/store/modules/techs/reducer';
import * as Techs from '~/store/modules/techs/actions';

describe('Techs reducer', () => {
  it('ADD_TECH', () => {
    // Sempre é bom entender como a function funcionar, como se comporta
    // O que ela recebe de parametros e o que ela retorna
    // Nesse caso ela espera uma variavel vazia e uma action, o qual ira
    // adicionar um valor para o state e irá retornar um array.
    const state = reducer(INITIAL_STATE, Techs.addTech('Node.js'));

    expect(state).toStrictEqual(['Node.js']);
  })
});

```

- Lembrando que toda action gera um test.

---

<h2>Redux Saga</h2>

- Instalar a dependencia do axios:

```bash
yarn add axios
```

- Criar também um arquivo `src/services/api.js`

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
```

- Vamos depois mockar o funcionamento dessa api, pois o teste não pode ser influenciado pelo chamada a api
pois a mesma pode falhar estar fora do ar e assim por diante.



- Alterar no arquivo `src/store/modules/techs/actions.js` adicionar o seguinte:

```js
export function getTechsSuccess(data) {
   return {
     type: 'GET_TECHS_SUCCESS',
     payload: { data }
   }
}

export function getTechsFailure() {

  return {
    type: 'GET_TECHS_FAILURE',
  }
}
```

- instalar o redux-saga:

```bash
yarn add redux-saga
```

- Não será necessário criar parte de configuração middleware, saga mone, não será necessário
configurar nada.

- Apenas criar o arquivo de saga mesmo `src/store/modules/techs/sagas.js`

```js
import { call, put } from 'redux-saga/effects';
import api from '~/services/api';

import { getTechsSuccess, getTechsFailure } from './actions';

export function* getTechs() {
  try {
    const response = yield call(api.get, 'techs');

    yield put(getTechsSuccess(response.data));
  } catch (err) {
    yield put(getTechsFailure());
  }
}


```

- Criar o arquivo para testes `__tests__/store/sagas/techs.test.js`:

```js
import { runSaga } from 'redux-saga';
import { getTechsSuccess } from '~/store/modules/techs/actions';
import { getTechs } from '~/store/modules/techs/sagas';

describe('Techs saga', () => {
  it('shoud be able to fetch techs', async () => {
    const dispatch = jest.fn();

    // como o getTechs é um generator transformamos para Promise
    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(['Node.js']));
  });
});

```

- Basicamente para utilizar testes com o sagas é necessário conhecer um pouquinho do sagas.
e do generator, promise, um bom tutorial: [Iniciando projeto RocketShoes](https://github.com/mrcarromesa/react-redux-parte1)


---

<h2>Mock Axios</h2>

- Adicionando o axios-mock-adapter:

```bash
yarn add axios-mock-adapter -D
```

- No arquivo `__tests__/store/sagas/techs.test.js` adicionar o axios Mock:

```js
import api from '~/services/api';
import MockAdapter from 'axios-mock-adapter';

// ...

const apiMock = new MockAdapter(api);

//...

// Estamos realizando uma simulação do get para a url 'techs' e retornando status 200
// com response ['Node.js']
apiMock.onGet('techs').reply(200, ['Node.js']);

// ...

```

---
<h2>Entendo um pouco mais sobre mocks</h2>

- Um exemplo para entender um pouco mais sobre mocks veja os arquivos:
  - `src/Page.js`
  - `__tests__/Page.test.js`

---

<h2>Coverage</h2>

**Importante, até o momento não conseguir fazer o coverage funcionar com a versão mais recente do react-scrpts, foi necessário alterar para versão 3.4.0**

- Para tal no `package.json` alterei o `"react-scripts": "3.4.0",`, apaguei o arquivo `yarn.lock` e a pasta
`node_modules/` depois executei o comando `yarn` para baixar as dependencias.

- No arquivo `package.json` nas configurações do `jest` adicionar o seguinte:

```json
"coverageDirectory": "__tests__/coverage",
```

- será o diretorio onde os relatórios serão salvos

- Ainda no `package.json` nas configurações de `scripts` adicionar o seguinte:

```json
"scripts": {
  "coverage": "react-app-rewired test --coverage --watchAll=false",
}
```

- Em caso de erro tente adicionar o seguinte ao invés:

```json

"scripts": {
  "start": "SKIP_PREFLIGHT_CHECK=true react-app-rewired start",
  "test": "SKIP_PREFLIGHT_CHECK=true react-app-rewired test",
  "coverage": "SKIP_PREFLIGHT_CHECK=true react-app-rewired test --coverage --watchAll=false"
}
```

- Alguns arquivos não precisam ser testado e gerado relatório do coverage, para isso no `package.json`
nas configurações do `jest` adicione o seguinte:

```json
"collectCoverageFrom": [
  "!src/index.js"
]
```

- Para adicionar mais arquivo basta adicionar o `!` e o caminho do arquivo que não quer adicionar ao coverage.

- Nos testes que fiz não funcionou o `collectCoverageForm` precisei utilizar direto no comando no arquivo `package.json`:

```json
"scripts": {
  "coverage": "SKIP_PREFLIGHT_CHECK=true react-app-rewired test --coverage --collectCoverageFrom=!src/index.js --collectCoverageFrom=!src/App.js --collectCoverageFrom=!src/services/api.js --collectCoverageFrom=!__tests__/** --watchAll=false"
}
```
