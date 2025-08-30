# Node.js MVC Backend Example (with MongoDB)

This project is a simple backend following the MVC (Model-View-Controller) architecture using Express.js and MongoDB (via Mongoose). It demonstrates basic CRUD operations for a 'User' resource with a real database connection.

## Folder Structure

```
config/           # Database connection logic
controllers/      # Controller logic for handling requests
models/           # Mongoose data models
routes/           # Route definitions
views/            # EJS view templates
app.js            # Main application entry point
.env              # Environment variables (DB URI, etc.)
package.json      # Project metadata and dependencies
testCrud.js       # Script to test CRUD operations
```

## Features
- **Create, Read, Update, Delete (CRUD)** operations for users
- MongoDB database connection using Mongoose
- Example controller, route, and model
- EJS view for the home page
- Automated test script for CRUD

## User Model Fields
- `name` (String, required)
- `age` (Number, required)
- `address` (String, optional)
- `profession` (String, optional)
- `email` (String, required, unique)

## How It Works
- The server uses Express.js and follows MVC conventions.
- User data is stored in MongoDB using a Mongoose model (`models/userModel.js`).
- Routes are defined in `routes/userRoutes.js` and use controller methods.
- The home page is rendered with EJS.
- Database connection logic is in `config/db.js` and uses environment variables from `.env`.

## How CRUD Operations Work (with Code and References)

### 1. **Create User**
**Route:**
```js
// routes/userRoutes.js
router.post('/', userController.createUser);
```
**Controller:**
```js
// controllers/userController.js
exports.createUser = async (req, res) => {
  try {
    const { name, age, address, profession, email } = req.body;
    if (!name || !age || !email) {
      return res.status(400).json({ message: 'Name, age, and email are required.' });
    }
    const newUser = new User({ name, age, address, profession, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
```
**How it works:** Receives a JSON body with `name`, `age`, `address`, `profession`, and `email`, creates a new user document, saves it to MongoDB, and returns the new user.

---

### 2. **Read All Users**
**Route:**
```js
// routes/userRoutes.js
router.get('/', userController.getAllUsers);
```
**Controller:**
```js
// controllers/userController.js
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```
**How it works:** Returns all user documents from MongoDB as JSON.

---

### 3. **Read Single User**
**Route:**
```js
// routes/userRoutes.js
router.get('/:id', userController.getUserById);
```
**Controller:**
```js
// controllers/userController.js
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```
**How it works:** Finds a user by MongoDB ID and returns it, or 404 if not found.

---

### 4. **Update User**
**Route:**
```js
// routes/userRoutes.js
router.put('/:id', userController.updateUser);
```
**Controller:**
```js
// controllers/userController.js
exports.updateUser = async (req, res) => {
  try {
    const { name, age, address, profession, email } = req.body;
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (age !== undefined) updateFields.age = age;
    if (address !== undefined) updateFields.address = address;
    if (profession !== undefined) updateFields.profession = profession;
    if (email !== undefined) updateFields.email = email;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
```
**How it works:** Finds a user by ID, updates the fields if provided, and returns the updated user.

---

### 5. **Delete User**
**Route:**
```js
// routes/userRoutes.js
router.delete('/:id', userController.deleteUser);
```
**Controller:**
```js
// controllers/userController.js
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
```
**How it works:** Removes the user with the given ID from MongoDB and returns a 204 status (no content).

---

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up your `.env` file:**
   - Copy `.env` from the template and set your MongoDB URI.
3. **Start the server:**
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000/`.

4. **Test CRUD operations:**
   In a separate terminal, run:
   ```bash
   node testCrud.js
   ```
   This will perform create, read, update, and delete operations on the `/users` endpoint and log the results.

## Endpoints
- `GET /users` - List all users
- `GET /users/:id` - Get a user by ID
- `POST /users` - Create a new user (JSON body: `{ "name": "Name", "age": 25, "address": "Address", "profession": "Profession", "email": "email@example.com" }`)
- `PUT /users/:id` - Update a user (JSON body: `{ "name": "New Name", "age": 30, ... }`)
- `DELETE /users/:id` - Delete a user

## Note
- This project now uses MongoDB for persistent storage. For production, add more fields, validation, and error handling as needed.

## Author

**Himal Pandey**

**Portfolio:** [himalpandey.vercel.app](https://himalpandey.vercel.app/)

**GitHub:** [github.com/pandeyhimal](https://github.com/pandeyhimal)

**LinkedIn:** https://www.linkedin.com/in/himal-pandey-297988225/
