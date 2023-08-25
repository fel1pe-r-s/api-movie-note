
# Api Movie Note

O projeto agora é criar uma API de avaliação para filmes. Essa API permitirá cadastrar um filme e atribuir uma nota de 0 a 5, além de possibilitar a criação de usuários, retorno das notas e dos filmes que esse usuário cadastrou.


## Stack utilizada

* Node
* Nodemon
* fastify
* prisma
* sqlite


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/fel1pe-r-s/api-movie-note.git
```

Entre no diretório do projeto

```bash
  cd api-movie-note
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Criando o banco de dados

Para rodar os testes, rode o seguinte comando

```bash
  npm run db
```


## Documentação da API

#### Criar usuario 
```http
    POST /user
```

| Json Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome do usuário |
 `email` | `string` | **Obrigatório**. Email |
 `password` | `number` | **Obrigatório**. senha |
 
 #### Adicionar filme e nota 
```http
    POST /note/:user_id
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `user_id` | `number` | **Obrigatório**. Id do usuário |


| Json Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Obrigatório**. Nome do filme |
 `description` | `string` | **Obrigatório**. Descrição do filme |
 `rating` | `number` | **Obrigatório**. Nota de 0 a 5 |
  `gender` | `string` | **Obrigatório**. Tag do genero |

#### Retorna todos os itens

```http
  GET /note/:user_id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `user_id` | `number` | **Obrigatório**. Id do usuário |
 `title` | `number` | **Opcional**. Titulo o filme |

#### Retorna filme pelo nome da sua  categoria

```http
  GET /tag
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Opcional**. O nome da tag do filme que você quer, caso não seja passado  o nome da tag no query param todos oss filmes serão rrettornaddos |

