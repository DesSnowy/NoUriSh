**HOW TO INSTALL**

**BACKEND**
1. Ensure that postgresql is already installed
2. Copy `.env.example` to `.env`
3. Change the relevant details (PGPASSWORD)
4. run `npm install` in  backend folder
5. Run the code from `database/database.sql` into SQL shell
6. Change password in scripts/initialiseUsers.js to your SQL password
7. run `node scripts/initialiseUsers.js` in backend folder
8. run `node server.js` to start the server

**FRONTEND**
1. run `npm install` and `npm install react-toastify` in the frontend folder
3. run `npm run start` to start the frontend server (ensure that backend server is up)
