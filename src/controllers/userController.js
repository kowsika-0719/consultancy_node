const userService = require("../services/userService");
// const UserService = require("../services/userService");

class UserController {
    async createUser(req, res) {
        try{
            const {name, email, phone, gender, salary} = req.body;
            const saveUser = await userService.createUser(name, email, phone, gender, salary);
            res.json(saveUser);
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async getAllUsers(req, res){
        try{
            const users = await userService.getAllUsers();
            res.json(users);
        }
        catch (error){
            res.status(500).json({error: error.message});
        }
    }

    async getUserById(req, res){
        const userId = req.params.id; // we need to get the userid from the url instead of request body
        try{
            const user= await userService.getUserById(userId);
            if(!user)
                return res.status(404).json({error: "User not found"});
            res.json(user);
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async updateUser(req, res){
        const userId = req.params.id;
        const updatedData = req.body;
        try{
            const updatedUser= await userService.updateUser(userId, updatedData);
            if(!updatedUser){
                return res.status(404).json({error: "User not found"});
            }
            res.json(updatedUser);
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async deleteUser(req, res){
        const userId = req.params.id;
        try{
            const deletedUser= await userService.deleteUser(userId);
            if(!deletedUser){
                return res.status(404).json({error: "User not found"});
            }
            res.json({message: "User deleted succesfully", user: deletedUser});
        }
        catch(error){
            res.status(500).json({error: error.message});
        }
    }


};

module.exports = new UserController();