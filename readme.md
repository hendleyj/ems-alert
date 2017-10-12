# EMS Alert


## Requirements
- Git (v2.8.4 or higher)

- Node.js (v4.4.4 or higher) 
- npm (v3 or higher recommended)
**Find both here: https://www.npmjs.com/get-npm

- MongoDB (Community Edition)
**View this guide to install for your machine: https://docs.mongodb.com/manual/installation/?_ga=2.130566217.796221208.1507635317-1072944379.1507635317#mongodb-community-edition

- Angular (v2 or higher)
- Express


## Setup
Clone Git Repository
```bash
$ git clone http://link
$ cd UX-Toolchain
```
**Note: Project should have the required angular/node dependency files. 


Set up MongoDB
1. Download/Install MongoDB
2. Create `\data\db` folder using Command Prompt.  This can be anywhere, but C: drive is easiest.
```bash
$ md \data\db
```



## Start MongoDB.
```bash
$ C:\mongodb\bin\mongod
```
A 'waiting for connections' message should be displayed.


## Build and Start Server
```bash
$ ng build && node server.js
```
This will build the site and server. Open http://localhost:3000 in browser.
