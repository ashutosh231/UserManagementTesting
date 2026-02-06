import {z} from 'zod';

export const userSchema=z.object({
    name:z.string().min(1,{message:"Name is required"}),
    email:z.email({message:"Invalid email address"}),
    
});

export const updateUserSchema=z.object({
    name:z.string().min(2,{message:"Name is required"}).optional(),
    email:z.email().optional(),
    
});

export const updateUserByEmailSchema=z.object({
    email:z.email({message:"Valid email is required"}),
    name:z.string().min(2,{message:"Name must be at least 2 characters"}).optional(),
    password:z.string().min(6,{message:"Password must be at least 6 characters"}).optional(),
    role:z.enum(['user','admin']).optional(),
    isActive:z.boolean().optional(),
});