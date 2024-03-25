# Sistema Gerenciador de Patrimônio (SisGeP) server

## About this project

SisGeP is a manager, administrator and controller of assets between different establishments seeking to maintain total control over the user's belongings.

## Why?

This project was created in my internship on high school at EEEP Adriano Nobre, the idea is to create a system to be used at school and in the company where I interned.

## Website Link

If you want to test the website in the Production mode, the link are listed below:

Link to web site: [Visit the site](https://sisgep.vercel.app)

## Funcionalities

- Authentication with login and registration using JWT token
- Client and Administrator authentication
- Password hashing system
- Products, Users and Admnistrators CRUDs
- Logout system

## Getting Started

Install the SisGeP by following the steps below

```bash
  $ git clone https://github.com/onlywillian/dealership
  
  $ cd SisGeP
```

Installing dependencies

```bash
  $ npm install
```

Or

```bash
  $ yarn
```

### Enviroment Variables

Before running the server, you must create the environment variables, create a file called .env and put the following:

```bash
  DATABASE_URL="your postgres url is here"
  SECRET_KEY="a random hash to your taste"
```

### Running
```bash
  $ npx prisma migrate dev
  $ npm run dev
```

## Stack

- Node.js
- PostgreSQL
- JsonWebToken
- Firebase storage
- Bcrypt
- Express

## License

[MIT](https://choosealicense.com/licenses/mit/)

