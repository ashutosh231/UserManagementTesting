import express  from 'express';
import {getUsers,getUserById,createUser,updateUser,deleteUser} from '../controllers/user.controller.js';
import {checkAuth,validateUserId} from '../middlewares/auth.js';
import {validateCreateUserDTO} from '../dtos/user.dto.js';
const router=express.Router();

router.get("/",checkAuth,getUsers);
router.get("/:id",validateUserId,getUserById);
router.post("/",validateCreateUserDTO,createUser);
router.put("/:id",validateUserId,updateUser);
router.delete("/:id",validateUserId,deleteUser);

export default router;

