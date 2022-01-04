const express = require('express');
const UserRouter = express.Router();

const getAllUsers = require('../Controllers/getAllUsers');
const getSingleUser = require('../Controllers/getSingleUser');
const getUsersByRole = require('../Controllers/getUsersByRole');
const deleteUser = require('../Controllers/deleteUser');
// const updateUser = require('../Controllers/updateUser');

// Get all users
UserRouter.get('/', getAllUsers);

// Get 1 user by id
UserRouter.get('/:id', getSingleUser);

// Get 1 user by role
UserRouter.get('/role/:role', getUsersByRole);

// Delete 1 user by id
UserRouter.delete('/:id', deleteUser);

// // Update 1 user by id
// UserRouter.patch('/:id', updateUser);

export default UserRouter;