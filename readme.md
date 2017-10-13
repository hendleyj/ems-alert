# EMS Alert


## Requirements and Installs
- Git (v2.8.4 or higher)
- Angular (v2 or higher)
- Express

- Node.js (v4.4.4 or higher) and NPM (v3 or higher recommended)
**Find both here: https://www.npmjs.com/get-npm

- MongoDB (Community Edition)
**View this guide to install for your machine: https://docs.mongodb.com/manual/installation/?_ga=2.130566217.796221208.1507635317-1072944379.1507635317#mongodb-community-edition


## Clone Git Repository
You can use the desktop app or the command line interface (altough the desktop app is easier). 

**Note: Project should have the required angular/node dependency files. 


## After installing Node and cloning
1. Open a terminal or command prompt and go to the repo directory (make sure you point it to the "root" of the project, which is where the package.json file is).
2. Have NPM install all the dependencies.
```bash
$ npm install
```
3. UPDATE: After the install completes, replace the directory located at `node_modules\@angular\material` with the directory in the repo at `special_node_modules\@angular\material`.


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
$ ng serve
```
or
```bash
$ npm start
```
This will build the site and server. Open http://localhost:4200 in browser.
