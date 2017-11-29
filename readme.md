# EMS Alert


## 1. Installs
- Node.js (v4.4.4 or higher) and NPM (v3 or higher recommended)
  **Install: https://www.npmjs.com/get-npm


## 2. Clone Git Repository
Remember the location on your computer where you clone the repository.


## 3. Install Dependencies with NPM
1. Open a command prompt (Windows) or terminal (Mac) and go to the repository directory (make sure you point it to the "root" of the project, which is where the package.json file is).
2. Have npm install all the dependencies:
```bash
$ npm install
```

## 4. Run Database
1. Open Putty (Windows) or a Terminal (Mac) and connect to remote server:
```bash
ssh root@37.48.113.142 -p 2222
```
Password: x32fzH1q1N

2. Navigate to database folder:
```bash
cd ../capstone/mongodb/bin
```

3. Run database:
```bash
./mongod --dbpath ../../data/db
```

Leave this terminal open and running.

## 5. Run Server
1. Open a new Putty (Windows) or a Terminal (Mac) and connect to remote server:
```bash
ssh root@37.48.113.142 -p 2222
```
Password: x32fzH1q1N

2. Navigate to server folder:
```bash
cd ../capstone/ems-alert
```

3. Start server:
```bash
node server.js
```

Leave this terminal open and running.


## 6. Run Web App
1. Open a new Putty (Windows) or a Terminal (Mac) and navigate to project directory (where package.json file is located).
2. Run application:
```bash
npm start
```


This will build the site and server. Open http://localhost:4200 in browser.
