## Instruções para executar localmente

### 1. Clonar o Repositório

git clone https://github.com/florareiro/notification-backend.git
cd notification-backend

### 2. Instalar Dependências

npm install

### 3. Executar o Servidor

npm run dev

### 4. Acessar a Documentação Swagger

http://localhost:4000/api-docs/

### 5. Executar os Testes

npm test

## Exemplos de Requests (cURL)

### Criar notificação

curl -X POST http://localhost:4000/api/notifications \
 -H "Content-Type: application/json" \
 -d '{"userId":"test-01","title":"Teste","message":"Nova notificação"}'

### Listar notificações

curl -X GET "http://localhost:4000/api/notifications?userId=user-123&page=1&limit=5"

### Marca Notificação como lida

curl -X 'PATCH' \
 'http://localhost:4000/api/notifications/ebbbb69c-aaae-45a1-a59d-941fa0bae789/read' \
 -H 'accept: application/json'

### Deletar notificação

curl -X PATCH http://localhost:4000/api/notifications/delete/22724104-c7d8-4866-81bc-3516e6e16418

## Decisões Arquiteturais:

Para a construção da api optei por seguir uma arquitetura modular, voltada para manutenibilidade, testabilidade e clareza de responsabilidades.

### 1. Arquitetura em Camadas (Service → Controller → Route)

A aplicação é organizada em três camadas principais:

- Rota (Router): define os endpoints da API e associa cada um ao respectivo controller.

- Controller: recebe as requisições, valida os dados e aciona a camada de serviço.

- Service: contém a lógica de negócio e interage com o banco de dados (via Mongoose).

### 2. Modelagem de Dados com Mongoose

Cada notificação é representada por um schema (NotificationModel) que define a estrutura e validação dos dados em nível de persistência.

Além disso:

- O campo deletedAt permite soft delete, mantendo o histórico sem excluir permanentemente os dados.

### 3. Validação com Zod

A validação de entrada é feita com Zod, garantindo que todos os dados recebidos (query, body e params) sigam o formato esperado antes de chegar na lógica de negócio.
Foi criado um middleware genérico validate() que pode validar qualquer parte da requisição:

### 4. Tratamento Centralizado de Erros

Todos os erros são tratados por um middleware global errorHandler, que diferencia entre:

Erros conhecidos (ApiError): retornam status e mensagem específica.

Erros inesperados: retornam status 500 (“Erro interno do servidor”).

### 5. Endpoint Marcar como lido

Para o endpoint PATCH /notifications/:id/read optei por transformá-lo em um toogle:
Se a notificação estiver não lida (read = false), ela será marcada como lida.

Se já estiver lida (read = true), será marcada novamente como não lida.

Essa decisão simplifica a API e reduz a necessidade de múltiplos endpoints para ações complementares.
