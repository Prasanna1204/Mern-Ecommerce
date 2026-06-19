import User from "../Models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req,res) =>{
    try{
        const {name, email, password} = req.body;
        if(await User.findOne({email})){
            return res.status(400).json({message: "User already exists"});
        }
        //hashpassword
        const hashedpassword = await brcrypt.hash(password,10);
        
        //create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedpassword
        });
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const loginUser = async (req,res) =>{
    try{
        const {email, password} = req.body;

        const findUser = await User.findOne({email});
        if(!findUser){
            return res.status(404).json({message: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, findUser.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: findUser._id,
                name: findUser.name,
                email: findUser.email,
            }
        });
    }catch(error){
        res.status(500).json({message: error.message})
    }
}