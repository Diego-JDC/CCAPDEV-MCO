# CCAPDEV MCO
For T2 A.Y. 2023-2024
## (S14) Group 18
__Group Members:__
* Dela Cruz, Diego
* Caramat, Jude
* Ishikawa, Andrew
* Santos, Emman



## Minecraft-styled Web Forum
A simple web forum made for a Major Course Output (MCO) for the subject CCAPDEV.

## How to run the project via Node.js
### Prerequisites
You should have the following installed in order to run the project:
1. Node.js
2. Node Package Manager (NPM)
3. MongoDB
4. MongoDB Compass
### 1. Initialize and Install needed packages inside the project folder:
```console
npm init
npm i express express-handlebars body-parser mongoose
```
### 2. In MongoDB Compass, create a new database named "__mcforum__":
![create-database](https://github.com/Diego-JDC/CCAPDEV-MCO/assets/98803337/046decab-64c0-4e97-9748-6ef08b4d1960)
### 3. Create 3 collections named "__accounts__", "__comments__", and "__posts__":
![create-collections](https://github.com/Diego-JDC/CCAPDEV-MCO/assets/98803337/084859b6-f5c8-42b5-93e7-a5047b6ac463)
### You should have this structure for your database at this point:
![database-structure](https://github.com/Diego-JDC/CCAPDEV-MCO/assets/98803337/5586aab8-d16b-4940-a0a9-a47f8fb2edec)
### 4. In each collection, add data and select 'Import JSON or CSV file'
![add-data](https://github.com/Diego-JDC/CCAPDEV-MCO/assets/98803337/3785022a-8952-4195-9cb2-27d8a368b3d9)
### Choose the .json file found in /Phase 2/models/data folder that matches the name of the collection and repeat for each collection.

### For reference, your mongoDB database should look like this after following the steps above:
![image](https://github.com/Diego-JDC/CCAPDEV-MCO/assets/98803337/560254d0-7b5e-4142-9048-a001f3e9c6d1)
### 5. Run the app.js file via terminal (or cmd)
```console
node app.js
```
### 6. Go to the url on your browser:
```
localhost:3000
```
__NOTE__: On your terminal, you should have seen the message 'Listening at Port 3000' This means you successfully followed the steps thus far.
## Troubleshooting
### If There are too little/too much documents in a specific collection:
- Drop that collection and create it again.
- Go to step 4.
## Progress/Todo:
- [x] __Phase 1__
- [ ] __Phase 2__:
* For this phase, the group is required to develop the back-end logic of the chosen web application.
* The README.md file at the root directory of the repository should contain instructions
on how to set-up and to run the application locally through a Node.js server.
### On Model
* Database design must be complete.
* It is recommended that the project use MongoDB for the database. Mongoose as
an ODM is accepted. If the group is looking to use a different database program,
please inform your lecturer ahead of time.
* Data should be retrieved from the database. There should be at least 5 sample
data in the database for each applicable feature. For example, in a forum web
application, there should be at least 5 sample users, 5 sample posts, and 5
sample comments loaded from the database to the web application.
* All database related files should be in the model folder.
### On View
* All views for the features must be visible and can be navigated to and from the
index webpage.
* All views must be accessible from navigational links and buttons within the
application.
### On Controller
* The web application should be hosted using a Node.js server.
* It should be accessible through localhost:3000.
* All routes should be properly and completely implemented. Thus, the user can
easily navigate through the different features of the web application.
* All forms must use the appropriate HTTP methods (i.e., login forms use POST,
search queries use GET, etc.). Form validation does not need to be implemented
yet.
* Session management and password hashing do not need to be implemented yet
for this phase.
