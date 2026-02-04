import { users } from '../data/users.js';
export const getUsers = (req, res) => {
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
};

export const createUser = (req, res) => {
    try{
        const { name, email } = req.body;
        //validation
        if(!name || !email){
            return res.status(400).json({
                success: false,
                message: "Name and Email are required"
            });
    }

    const newuser={
        id: Date.now(),
        name,
        email   
    };
    users.push(newuser);

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
    try{
        const id=req.params.id;
        const { name, email } = req.body;

        const user = users.find((u) => u.id === parseInt(id));
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        //update user
        if(name) user.name = name;
        if(email) user.email = email;

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
    try{
        const id=req.params.id;

        //const userIndex = users.findIndex((u) => u.id === parseInt(id));
        const user = users.find((u) => u.id === parseInt(id));
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        //users.splice(userIndex, 1);//parmaters
        users = users.filter((u) => u.id !== parseInt(id));//why parseInt?ans:-

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