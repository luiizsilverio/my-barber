<table>
  <tr>
    <td><img src="https://github.com/luiizsilverio/my-barber/blob/master/public/logo.png" /></td>
    <td><h1>MY-BARBER</h1></td>
  </tr>
</table>


## Conteúdo
* [Sobre a aplicação](#sobre-a-aplicação)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Iniciando a Aplicação](#car-Iniciando-a-aplicação)
* [Screenshots](#camera_flash-screenshots)
* [Contato](#email-contato)

<br />

## Sobre a aplicação
Aplicação de barbearia da maratona [Full Stack Week - terceira edição](https://www.youtube.com/playlist?list=PLm-VCNNTu3LkXngXKFlGCssmn9kYlVn0n), promovida pela __Full Stack Club__.<br />
Não participei do evento na época do lançamento, mas até o momento os 6 vídeos do evento permanecem disponíveis no Youtube, no canal do [_Felipe Rocha_](https://www.youtube.com/@dicasparadevs).<br />
Trata-se de uma aplicação web para barbearia, utilizando Next v.14, Prisma ORM e autenticação __Google__.<br />
Permite selecionar uma barbearia, o serviço e agendar horário na barbearia. Permite também cancelar o agendamento.<br />
A aplicação original não era responsiva e resolvi adaptar o layout para responsividade.<br />
Gostei muito de trabalhar com __Shadcn/ui__, cujos componentes de front-end têm qualidade profissional.<br />
<br />

## :hammer_and_wrench: Tecnologias
* __React / Next__ (versão 14) / Typescript
* Rotas utilizando o __App Router__ do Next
* Autenticação Google com __Next-Auth__
* __Prisma ORM__ para acessar banco de dados do __Supabase__
* __Shadcn/ui__ para componentes de front-end (calendário, avatar, side menu etc)
* __TailwindCSS__ para estilização
* __Date-fns__ para rotinas de data e hora
* __Lucide-react__ para ícones
* __Sonner__ para mensagens pop-up
<br />

## :car: Iniciando a aplicação
Antes, é necessário criar um banco de dados __PostgreSQL__. No caso, criei no painel do __Supabase__.<br />
Também precisa definir a autenticação __Google__ no console do __Firebase__.<br />
Baixe o repositório com git clone e acesse a pasta ```my-barber```
```bash
$ git clone https://github.com/luiizsilverio/my-barber
$ cd my-barber
$ npm install
```
Edite o arquivo ```.env``` e informe a string de conexão do banco e a API Key de autenticação.
Inicialize o Prisma e popule o banco com o Seed.
```bash
$ npx prisma init --datasource-provider PostgreSQL
$ npx prisma db seed
$ npm run dev
```
<br />

## :camera_flash: Screenshots
![](https://github.com/luiizsilverio/my-barber/tree/master/app/assets/my-barber.gif)
<br />


## :email: Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luiz-s-de-oliveira-6b6067210)
[![E-mail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:luiiz.silverio@gmail.com)
