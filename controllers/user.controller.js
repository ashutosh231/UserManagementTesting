import { createUser as createUserService } from '../services/user.service.js';
import { deleteUser as deleteUserService } from '../services/user.service.js';
import { updateUser as updateUserService } from '../services/user.service.js';
import { getUserById as getUserByIdService } from '../services/user.service.js';
import { getAllUsers } from '../services/user.service.js';

export const getUsers = (req, res) => {
    console.log("Fetching all users");
    const allUsers = getAllUsers();
    res.status(200).json({
        success: true,
        count: allUsers.length,
        data: allUsers
    });
};

export const getUserById = (req, res) => {
    console.log("Fetching user by ID:", req.params.id);
    try {
        const { id } = req.params;
        const user = getUserByIdService(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const createUser = (req, res) => {
    console.log("Creating user with data:", req.body);
    try{
    const newuser = createUserService(req.body.name, req.body.email);
    res.status(201).json({
        success: true,
        data: newuser
    });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const updateUser = (req, res) => {
    console.log("Updating user with ID:", req.params.id, "Data:", req.body);
    try{
        const id = req.params.id;
        const { name, email } = req.body;

        const user = updateUserService(id, name, email);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const deleteUser = (req, res) => {
    console.log("Deleting user with ID:", req.params.id);
    try{
        const id = req.params.id;

        const deleted = deleteUserService(id);
        if(!deleted){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};