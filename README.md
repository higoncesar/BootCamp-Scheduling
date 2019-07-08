# Desafio 04 com NodeJS - BootCamp Rocketseat

Está é uma aplicação API REST em NodeJS utilizando o Framework AdonisJS, com Banco de Dados PostGreSQL e Redis para um sistema de agendamentos de compromissos.

### Requisitos funcionais

<ul>
  <li>
    O usuário deve poder criar uma conta com nome, e-mail e senha;
  </li>
  <li>
    O usuário deve poder se autenticar na aplicação com e-mail e senha;
  </li>
  <li>
    O usuário deve poder alterar seu nome e senha informando a senha antiga, a senha nova e a confirmação da senha nova;
  </li>
  <li>
    O usuário deve poder cadastrar eventos em seu calendário com título, localização, data e horário;
  </li>
  <li>
    O usuário deve poder listar os eventos cadastrados por data;
  </li>
  <li>
    O usuário deve poder excluir um compromisso;
  </li>
  <li>
    O uário deve poder compartilhar um compromisso informando o
    e-mail do destinatário. Assim que compartilhado, o destinatário
    deve receber todas informações do evento por e-mail;
  </li>
</ul>

### Regras de negócio

<ul>
  <li>
    O e-mail do usuário é único;
  </li>
  <li>
    O usuário não pode alterar seu e-mail;
  </li>
  <li>
    Não deve ser possível cadastrar dois eventos no mesmo horário no calendário de um usuário;
  </li>
  <li>
    O usuário só pode ver/editar/deletar seus eventos;
  </li>
  <li>
    O usuário não pode editar/deletar um evento que já passou;
  </li>
  <li>
    Todos cadastros devem possuir validação de campos com
    mensagens legíveis;
  </li>
</ul>

## TECNOLOGIAS / LIBS UTILIZADAS

NodeJS, AdonisJS (Queue com Jobs, envio de Email, Validations), Redis, PostgreSQL, ESLint, EditorConfig, Prettier dentre outras.

## INSTALAÇÃO

Para testar este projeto é necessario ter instalado o NodeJS, caso não tenha você pode baixar o instalador através no link abaixo:
https://nodejs.org/en/download/

Após o instalar o NodeJS, é só clonar o repositorio com o comando:

\$ git clone https://github.com/higoncesar/BootCamp-Scheduling

Entrar dentro da Pasta do Projeto:

\$ cd BootCamp-Scheduling

Instalar as dependencias com o comando:

\$ npm install

Agora você irá renomear o arquivo .env.exemple para .env na raiz do projeto, e alterar os dados de autenticação com o banco de dados dentro deste mesmo aquivo.

Com os dados da conexão com o banco de dados configurado, é necessario rodar as migrations com o comando:

\$ adonis migration:run

Agorá é so rodar o projeto com o comando no terminal para ativar a API:

\$ adonis serve --dev

Para ativar o serviço de Filas e Jobs, que no caso é utilizado para envio do e-mail do compartilhamento do evento é só rodar o comando a baixo em uma nova janela do Terminal:

\$ adonis kue:listen

Lembrando que para o envio do e-mail também será necessario alterar as informações de autenticação com o seu serviço de e-mail desejado no arquivo .env

> "Honestidade em pequenas coisas, não é algo pequeno"
> Clean Code - Robert C. Martin
