import { createUser as createUserService } from '../services/user.service.js';
import { deleteUser as deleteUserService } from '../services/user.service.js';
import { updateUser as updateUserService } from '../services/user.service.js';
import { getUserById as getUserByIdService } from '../services/user.service.js';
import { getAllUsers } from '../services/user.service.js';
import { updateUserByEmail as updateUserByEmailService } from '../services/user.service.js';
import { deleteUserByEmail as deleteUserByEmailService } from '../services/user.service.js';
import { createPost as createPostService } from '../services/user.service.js';
import { getAllPostss as getPostsService } from '../services/user.service.js';
import { updatePasswordbyId } from '../services/user.service.js';
export const getUsers = async (req, res) => {
    console.log("Fetching all users");
    try {
        const allUsers = await getAllUsers();
        res.status(200).json({
            success: true,
            count: allUsers.length,
            data: allUsers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const getUserById = async (req, res) => {
    console.log("Fetching user by ID:", req.params.id);
    const { id } = req.params;
    try {
        const user = await getUserByIdService(id);
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

export const createUser = async (req, res) => {
    console.log("Creating user with data:", req.body);
    try {
        const { name, email, password, role } = req.body;
        const newuser = await createUserService(name, email, password, role);
        res.status(201).json({
            success: true,
            data: newuser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

export const updateUser = async (req, res) => {
    console.log("Updating user with ID:", req.params.id, "Data:", req.body);
    try {
        const id = req.params.id;
        const { name, email, password, role, isActive } = req.body;

        const user = await updateUserService(id, { name, email, password, role, isActive });
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

export const deleteUser = async (req, res) => {
    console.log("Deleting user with ID:", req.params.id);
    try {
        const id = req.params.id;

        const deleted = await deleteUserService(id);
        if (!deleted) {
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

export const deleteUserByEmail = async (req, res) => {
    console.log("Deleting user with Email:", req.body.email);
    try {
        const { email } = req.body;

        const deleted = await deleteUserByEmailService(email);
        if (!deleted) {
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

export const updateUserByEmail = async (req, res) => {
    console.log("Updating user with Email:", req.body.email, "Data:", req.body);
    try {
        const { email, name, password, role, isActive } = req.body;

        const user = await updateUserByEmailService(email, { ...req.body });
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

export const createPost=async (req,res)=>{
    console.log("Creating post with data:", req.body);
    try {
        const { title, content,user } = req.body;
        const newpost = await createPostService(title, content,user);
        res.status(201).json({
            success: true,
            data: newpost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
}

export const getAllPosts=async (req,res)=>{
    console.log("Getting all posts");
    try {
        const posts = await getPostsService();
        
        if (!posts || posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No posts found"
            });
        }

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const updatePasswordbyIdController = async (req, res) => {
    console.log("Updating password for user ID:", req.params.id);
    try {
        const userId = req.params.id;
        const { newPassword } = req.body;

        const updatedUser = await updatePasswordbyId(userId, newPassword);
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        }); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};