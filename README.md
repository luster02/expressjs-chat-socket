## Expressjs auth

### how to use 
```
    git clone https://github.com/luster02/expressjs-auth-ts.git
    cd expressjs-auth-ts
    npm i 
```
### set enviroment 
```
    touch .env
    PORT= <server port<number>>
    MONGO_URI= <mongodb connection uri<string>>
    JWT_KEY= <jwt secret seed<string>>
    MAIL_USER= <nodemailer mail user<string>>
    MAIL_PASSWORD= <nodemailer mail password<string>>
```

### run server
```
    npm run dev <watching changes>
    npm run start 
```