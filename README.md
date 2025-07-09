# Room Management REST API Guide

## Introduction
Just like it's name, this API is designed to handle room management such as reservation functionalities for a multi-role system consisting of admins and users.

## Key Roles
### User Role
- Register & Login with JWT Authentication.
- View personal profile.
- Create, view, edit, and delete personal room reservations.

### Admin Role
- Manage all rooms: Create, View, Update, Delete.
- Cannot access or modify user reservations.

## Tech Stacks
- Backend: Node.js, express
- Database: PostgreSQL
- Security: Bcrypt for password hashing, and JWT for authentication
- Architecture: MVC(Model View Controller), without Views since it's a pure API

## Installation Guide
### Clone the repo
```bash
git clone https://github.com/Agastya486/room-management-api.git
```

### Inside the code editor, install all neccesary dependencies
```bash
npm i
```
this will install:
- Bcrypt: For password hashing
- dotenv: for storing sensitive datas and environment configuration
- express: Node.js' framework for building REST API, route handling, and middleware
- jsonwebtoken:  Create compact, self-contained tokens used for securely transmitting information between different applications or services
- pg: PostgreSQL's client for Node.js

### Go to any Postgre's supported database management tool and create the tables
```sql
CREATE TYPE role AS ENUM ('user', 'admin')

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	name text,
	email text UNIQUE,
	password text,
	role role
)

CREATE TABLE rooms(
	id SERIAL PRIMARY KEY,
	name text,
	floor int,
	price numeric,
	capacity int
)

CREATE TABLE reservations(
	id SERIAL PRIMARY KEY,
	user_id INT,
	room_id INT,
	start_date TIMESTAMP,
	end_date TIMESTAMP,
	CONSTRAINT fk_user
		FOREIGN KEY(user_id)
			REFERENCES users(id),
	CONSTRAINT fk_room
		FOREIGN KEY(room_id)
			REFERENCES rooms(id)
)
```
### Run the server
```bash
npm run start
```
if it's connected, it will returning
```bash
Connected on port 3000
```
### Now you can test the API using any tools you want (I'm using Postman)

## Testing the API

### Making new user account
<img src="./img/postman-register-user.png" alt="Alt text" width="500">
<br>
In Database:
<br>
<img src="./img/db-register-user.png" alt="Alt text" width="500">

---

### Making new admin account
For making admin account for the first time, we need to do it manually, by hashing the password using `hash.js` inside the `scripts` folder, and then manually insert it into database, please follow these steps:

Using any IDE, open the `hash.js` and insert the password
<br>
<img src="./img/insert-pw-manual.png" alt="Alt text" width="500">
<br>
Run the `hash.js` and copy the hashed password
<br>
<img src="./img/run-hash-js.png" alt="Alt text" width="500">
<br>
Manually insert into database, you can run this query with your own desired values:
```sql
INSERT INTO users(name, email, password, role)
VALUES('admin one', 'admin1@gmail.com', '$2b$10$KytHElNBcmOBLUebebGtyOthUg4a2Ma4jK2MpL2HNJAI6BOZV0rgi', 'admin')
```
<br>
Inside Database:
<br>
<img src="./img/manual-input-admin.png" alt="Alt text" width="500">
<br>
Now, if you want to insert another admin, you can do it exactly like registering user using Postman or similar, but with different endpoint, `admins/register`
<br>
<br>
If we register a new admin as a user
<br>
<img src="./img/err-handling-reg-admin.png" alt="Alt text" width="500">

### Login
<img src="./img/login.png" alt="Alt text" width="500">

### Adding room (Admin only)
<img src="./img/added-new-room.png" alt="Alt text" width="500">
<br>
Inside Database:
<br>
<img src="./img/add-room-success.png" alt="Alt text" width="500">

### Add reservation
<img src="./img/add-reservation.png" alt="Alt text" width="500">
<br>
<br>
If user try to input reservation while it's already reserved
<br>
<img src="./img/err-handing-reservation.png" alt="Alt text" width="500">