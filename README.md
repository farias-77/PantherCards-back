# <p align = "center"> API PantherCards </p>

##   Descrição

A API PantherCards serve como o Back-end de um projeto FullStack de mesmo nome, sendo responsável por estabelecer a comunicação com o banco de dados e enviar as informações necessárias para que o Front-end (https://github.com/farias-77/PantherCards-front) funcione como esperado.

***

## 	 Tecnologias e Conceitos

- REST APIs
- JWT tokens
- Node.js
- TypeScript
- PostgreSQL with Prisma

***

##  Rotas

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body: {
            "email": "lorem@gmail.com",
            "username": "Lorem"
            "password": "loremipsum",
            "confirmPasword": "loremipsum"
            }
```
    
```yml 
POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body: {
            "email": "lorem@gmail.com",
            "password": "loremipsum"
            }
```

```yml 
POST /deck
    - Rota para inserir novo deck
    - headers: { "Authorization": "Bearer $token" }
    - body: {
            "name": "Lorem deck",
            "isPrivate": false
            }
```

```yml 
POST /deck/questions/:deckId 
    - Rota para inserir as perguntas em um deck de id === deckId (usuário deve ser o dono do deck)
    - headers: { "Authorization": "Bearer $token" }
    - body: {
              "questions": [ {"question": "Lorem", "answer": "Lorem"}, {"question": "Lorem", "answer": "Lorem"} ]
            }
```

```yml 
GET /deck/:deckId
    - Rota para obter o deck de id === deckId
    - headers: { "Authorization": "Bearer $token" }
    - body: {
              
            }
```

```yml 
GET /deck/user/:userId
    - Rota para obter todos os decks de um usuário de id === userId
    - headers: { "Authorization": "Bearer $token" }
    - body: {
              
            }
```

```yml 
DELETE /deck/:deckId
    - Rota para deletar o deck de id === deckId (usuário deve ser o dono do deck)
    - headers: { "Authorization": "Bearer $token" }
    - body: {
              
            }
```
    

***

## 🏁 Rodando a aplicação

Certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/farias-77/PantherCards-back
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Para o primeiro uso, crie um arquivo .env seguindo o modelo fornecido pelo .env.example, e rode o seguinte comando para gerar o banco de dados.

```
npx prisma migrate dev
```

Finalizado o processo, é só inicializar o servidor
```
npm run dev
```
