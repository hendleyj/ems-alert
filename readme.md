# EMS Alert


## Requirements and Installs
- Git (v2.8.4 or higher)
- Angular (v2 or higher)
- Express

- Node.js (v4.4.4 or higher) and NPM (v3 or higher recommended)
**Find both here: https://www.npmjs.com/get-npm

- MongoDB (Community Edition)
**Instructions (choose your platform): https://docs.mongodb.com/manual/administration/install-community/
**Installation file: https://www.mongodb.com/download-center?jmp=tutorials&_ga=2.78362772.127356062.1508092377-1747746535.1507838638#community


## Clone Git Repository
You can use the desktop app or the command line interface (altough the desktop app is easier). 

**Note: Project should have the required angular/node dependency files. 


## After Installing Node and Cloning the Repository
1. Open a terminal or command prompt and go to the repo directory (make sure you point it to the "root" of the project, which is where the package.json file is).
2. Have NPM install all the dependencies.
```bash
$ npm install
```

## Set up MongoDB
1. Download/Install MongoDB
2. Create `\data\db` folder using Command Prompt.  This can be anywhere, but C: drive or the root of your HD is easiest.
```bash
$ md \data\db
```
3. Start MongoDB.
```bash
$ C:\mongodb\bin\mongod
```
A 'waiting for connections' message should be displayed.


## Build and Start Server
```bash
$ ng build && nodes server.js
```

This will build the site and server. Open http://localhost:4200 in browser.
