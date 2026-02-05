import {z} from 'zod';

export const userSchema=z.object({
    name:z.string().min(1,{message:"Name is required"}),
    email:z.email({message:"Invalid email address"}),
    
});

export const updateUserSchema=z.object({
    name:z.string().min(2,{message:"Name is required"}).optional(),
    email:z.email().optional(),
    
});