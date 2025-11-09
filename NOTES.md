## Melhorias Futuras

### 1. Autenticação de APIs e Usuários

Atualmente, a API está aberta e aceita requisições sem autenticação.
Com mais tempo para desenvolvimento implementaria autenticação baseada em JWT, permitindo:

- Registro e login de usuários.

- Geração de tokens de acesso com expiração.

- Proteção de rotas com middleware.

### 2. Uso de Redis para Contagem de Notificações Não Lidas

Com mais tempo para desenvolvimento usaria o Redis para reduzir a carga sobre o banco MongoDB, armazenando em cache o número de notificações não lidas por usuário.
