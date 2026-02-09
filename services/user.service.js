import User from '../models/user.js';
import Post from '../models/post.js';

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
    const users = await User.find().sort({ createdAt: 1 }).limit(4);
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

export const createPost = async (title, content,user) => {
    console.log("Creating post for", "Title:", title);
    const newPost = await Post.create({
        title,
        content,
        user
    });
    return newPost;
};


export const getAllPostss=async ()=>{
    console.log("Getting all posts");
    const posts=await Post.find().populate('user','name email');
    return posts;
}

export const updatePasswordbyId = async (userId, newPassword) => {
    console.log("Updating password for user ID:", userId);
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    user.password = newPassword;
    await user.save();
    return user;
};