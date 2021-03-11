# Exemplo de Login e Gestão de Conta de Usuário

Este projeto consiste em um exemplo frontend e backend de um sistema pessoal de gerenciamento de conta.

## Tecnologias

Essas são as tecnologias utilizadas para a criação deste projeto:

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [MongoDB](https://www.mongodb.com/)
- [React.js](https://pt-br.reactjs.org/)
- [Jest](https://jestjs.io/)

## Estrutura do Projeto

Adotou-se, durante a construção do projeto, a utilização dos princípios [SOLID](https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530).

## Como executar

Para executar o projeto localmente, é necessario primeiro ter em seu computador o [Node.js](https://nodejs.org/) e o [Docker](https://www.docker.com/products/docker-desktop), em seguida deve-se realizar os seguintes comandos em linha de comando:

```
# 1. Em uma pasta de sua escolha, clone o repositório com o projeto
$ git clone 'https://github.com/GabrielAranda1/MERN-login-example'

# 2.1 Instale as dependências do frontend
$ cd frontend
$ npm install

#2.2 Instale as dependências do backend
$ cd backend
$ npm install

# 3. Crie o container contendo o MongoDB no Docker
$ docker run -d -p 27017:27017  --name mongodb mongo:latest

# 4.1 Execute o servidor backend
$ npm run dev

4.2 Execute o projeto web
$ npm start
```

#
