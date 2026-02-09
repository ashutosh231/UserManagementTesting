import express  from 'express';
import {getUsers,getUserById,createUser,updateUser,deleteUser,updateUserByEmail,deleteUserByEmail} from '../controllers/user.controller.js';
import {checkAuth,validateUserId,validate} from '../middlewares/auth.js';
import {validateCreateUserDTO} from '../dtos/user.dto.js';
import {userSchema} from '../zod/user.zod.js';
import { updateUserSchema, updateUserByEmailSchema } from '../zod/user.zod.js';
import { createPost } from '../controllers/user.controller.js';
import { getAllPosts } from '../controllers/user.controller.js';
import { updatePasswordbyIdController } from '../controllers/user.controller.js';
const router=express.Router();

router.get("/",checkAuth,getUsers);
router.post("/",validate(userSchema),createUser);
router.post("/posts",createPost);
router.get("/posts",getAllPosts);
router.get("/:id",validateUserId,getUserById);
router.put("/:id",validateUserId,validate(updateUserSchema),updateUser);
router.patch("/email",validate(updateUserByEmailSchema),updateUserByEmail);
router.delete("/email",validate(updateUserByEmailSchema),deleteUserByEmail);
router.delete("/:id",validateUserId,deleteUser);
router.patch("/:id/password",validateUserId,updatePasswordbyIdController);
//middleware hooks?ans:-
export default router;

