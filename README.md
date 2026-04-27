# Processo de Treinamento do CITi (PTC) 2026.1
**Treinamento Desenvolvimento**: O desafio da área foi focado em desenvolver um sistema de gerenciamento de calçados (CRUD), permitindo cadastrar, visualizar, atualizar e remover produtos. Além disso, oferece funcionalidades extras de busca e análise de estoque, tornando o sistema mais eficiente e próximo de um cenário real.


## 🔹Decisões de Desenvolvimento
O projeto conta com algumas formas de organização,  clareza e separação de responsabilidades

**1.** O projeto foi dividido em camadas:

- Controllers → responsáveis por lidar com requisições HTTP (entrada e saída de dados)
- Repositories → responsáveis pela comunicação direta com o banco de dados
- Routes → responsáveis por definir os endpoints da API

**2.** Validação de dados:

Foram implementadas validações para:

- Garantir que todos os campos obrigatórios sejam informados no cadastro
- Evitar atualizações vazias
- Verificar existência de registros antes de atualizar ou deletar

**3.** Uso do Prisma:

O Prisma foi utilizado como ORM para acesso ao banco de dados, permitindo:

- Consultas mais simples (`findMany`, `findUnique`)
- Atualizações seguras
- Uso de agregações 


## 🔹Funcionalidades Implementadas
**1. Create (POST /calcados)**

Cria um novo calçado no sistema.

O que o código faz:

- Recebe os dados via req.body
- Valida se todos os campos obrigatórios foram preenchidos
- Insere o registro no banco utilizando prisma.calcado.create
- Retorna mensagem de sucesso

**2. Read (GET /calcados)**

Lista todos os calçados cadastrados.

O que o código faz:
- Busca todos os registros com findMany
- Verifica se existem dados cadastrados
- Retorna os calçados ou mensagem de ausência de dados


⭐ **Read por ID (GET /calcados/)**

Busca um calçado específico pelo ID.

O que o código faz:

- Recebe o ID via req.params
- Busca o registro com findUnique
- Retorna erro caso não exista
- Retorna o calçado encontrado

**3. Update (PATCH /calcados/)**

Atualiza um calçado existente.

O que o código faz:

- Busca o calçado no banco
- Valida se ele existe
- Verifica se ao menos um campo foi enviado
- Usa o operador ?? para manter valores antigos
- Evita atualização desnecessária verificando mudanças
- Atualiza com prisma.calcado.update

**Delete (DELETE /calcados/)**

Remove um calçado do sistema.

O que o código faz:

- Recebe o ID
- Remove o registro com delete
- Retorna mensagem de sucesso


## 🔹Funcionalidades Extras
**1. Buscar por tamanho**

O que o código faz:

- Recebe o tamanho via query
- Converte para número
- Filtra no banco com findMany usando where
- Retorna os calçados daquele tamanho

**2. Filtrar por marca**

O que o código faz:

- Recebe a marca via query
- Realiza busca com equals
- Utiliza mode: "insensitive" para ignorar maiúsculas/minúsculas
- Retorna os resultados filtrados

**3. Contagem total de estoque**

O que o código faz:

- Utiliza aggregate do Prisma
- Soma todos os valores do campo quantidade_em_estoque
- Retorna o total de pares disponíveis
- Caso não existam registros, retorna 0


## 🔹Rotas de Aplicação
Definidas em routes.ts

- POST /calcados
- GET /calcados
- PATCH /calcados/:id
- DELETE /calcados/:id
- GET /calcados/tamanho
- GET /calcados/marca
- GET /calcados/estoque/total


## 🔹Organização do Projeto
A estrutura do projeto foi organizada de forma a separar responsabilidades e facilitar a manutenção do código:

```bash
server/
 ├── prisma/
 ├── src/
 │    ├── controllers/
 │    ├── repositories/
 │    ├── database/
 │    ├── global/
 │    ├── routes.ts
 │    └── server.ts
 ├── docker-compose.yml
 ├── Dockerfile
 ├── .env
 └── package.json
```


## 🔹Uso de Inteligência Artificial
A Inteligência Artificial foi utilizada como ferramenta de apoio durante o desenvolvimento, auxiliando principalmente em:

- Revisão de código  
- Sugestões de melhorias e organização das ideias  
- Esclarecimento de dúvidas pontuais sobre TypeScript e uso do Docker  
- Explicação de conceitos, como uso de `aggregate`, operador `??`, diferença entre `req.query`, `req.params` e `req.body` no Express, entre outros
- Estruturação do README.md e documento a ser entregue no desafio

As decisões de implementação foram tomadas de forma consciente, com compreensão da lógica aplicada e do funcionamento do sistema. 
