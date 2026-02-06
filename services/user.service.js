import User from '../models/user.js';

export const deleteUser = async (id) => {
    console.log("Deleting user with ID:", id);
    const user = await User.findByIdAndDelete(id);
    return user !== null;
};

export const deleteUserByEmail = async (email) => {
    console.log("Deleting user with Email:", email);
    const user = await User.findOneAndDelete({ email });
    return user !== null;
};

export const createUser = async (name, email, password, role = 'user') => {
    console.log("Creating user with Name:", name, "Email:", email);
    const newUser = await User.create({
        name,
        email,
        password,
        role
    });
    return newUser;
};

export const updateUser = async (id, updateData) => {
    console.log("Updating user with ID:", id, "Data:", updateData);
    const user = await User.findByIdAndUpdate(
        id,

        {$set:updateData},
        { new: true, runValidators: true }
    );
    return user;
};

export const getUserById = async (id) => {
    console.log("Getting user with ID:", id);
    const user = await User.findById(id);
    return user;
};

export const getAllUsers = async () => {
    console.log("Getting all users");
    const users = await User.find().sort({ createdAt: 1 }).limit(2);
    return users;
};

export const updateUserByEmail = async (email, updateData) => {
    console.log("Updating user with Email:", email, "Data:", updateData);
    const user = await User.findOneAndUpdate(
        { email },
        { $set: updateData },
        { new: true, runValidators: true }
    );
    return user;
};