# TesteCypress
O projeto foi realizado em cypress utilizando as seguintes bibliotecas:
- ajv -> Para a validação de schemas;
- cypress-plugin-api -> Para uma melhor interface na hora de rodar os testes.

O projeto foi dividido em três specs de teste de acordo com a chamada de endpoint, além disso foram criadas fixtures
sendo elas os schemas necessaríos para se validar os bodys de resposta, tambem com o intuito de validar os schemas foram
criados dois comando adicionais na classe commands.

Existem alguns pontos de melhoria nesse projeto como por exemplo:
- A integração do cypress com alguma ferramenta de relatorio ou a utilização da propria ferramenta online dele;
- A integração do cucumber para uma melhor e mais direta visualização dos casos de teste;
- Utilizar geradores de dados aleatorios para criação de massas de dados.