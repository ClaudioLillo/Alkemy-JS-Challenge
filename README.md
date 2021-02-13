# Alkemy-JS-Challenge
Personal Financial Administration App

Instructions to run

Backend (port 3001):

- npm run dev

Frontend (port 3000):

- npm start

You also need to configure a .env file on the api folder, to connect with database and a SECRET to
use jsonwebtoken authentication

DB_USER = postgres
DB_PASSWORD = your_password
DATABASE = database_name

SECRET = your_secret

User instructions

- Go to localhost:3000 on your browser, to see the home site. 
- Click on Registration button, complete and submit the form
- Then, login using the email and password that you used previoulsy
- Add a new transaction using the "Nueva Transacción" button
- Complete the form and click on "Agregar"
- You can add a new transaction, or close the Dialog by clicking on "Hecho"(done)
- Now you can see your transactions
- Every transaction have date, concept and amount information
- Entries are displayed on green, while outs are red. Also there is an arrow that
shows if a transaction is an entry or an out of money
- You can click on the detail button to see complete information about an individual transaction, and 
delete, update or edit the register
- This site is responsive, you can try to change the size of the browser screen to appreciate this feature
