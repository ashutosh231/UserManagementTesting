import { users } from '../data/users.js';

export const deleteUser = (id) => {
    console.log("Deleting user with ID:", id);
    const userIndex = users.findIndex((u) => u.id === parseInt(id));
    if(userIndex === -1){
        return false;
    }

    users.splice(userIndex, 1);

    return true;
};

export const createUser = (name, email) => {
    console.log("Creating user with Name:", name, "Email:", email);
    const newuser={
        id: Date.now(),
        name,
        email
    };
    users.push(newuser);
    return newuser;
};

export const updateUser = (id, name, email) => {
    console.log("Updating user with ID:", id, "Name:", name, "Email:", email);
    const user = users.find((u) => u.id === parseInt(id));
    if(!user){
        return null;
    }

    if(name) user.name = name;
    if(email) user.email = email;

    return user;
};

export const getUserById = (id) => {
    console.log("Getting user with ID:", id);
    const user = users.find((u) => u.id === parseInt(id));
    return user || null;
};

export const getAllUsers = () => {
    console.log("Getting all users");
    return users;
};