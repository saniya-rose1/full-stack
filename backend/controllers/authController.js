const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const authRepository = require("../repository/authRepository")

exports.registerUser = async (req,res) =>{
    try{
        const{ name,email,password,phone} = req.body;

        if(!name || !email || !password || !phone){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existingUser =await authRepository.findUserByEmail( email);
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
    const user = await authRepository.createUser({
        name,
        email,
        password: hashedPassword,
        phone
    });

    return res.status(201).json({
        message: "User Registered successfully",
        user
    });
}catch (error) {
    res.status(500).json({
        message: "Server Error"
    });
}
};

exports.loginUser = async (req,res) =>{
    try{
        const{ email,password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
        const user = await authRepository.findUserByEmail(email)
        if(!user){
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
       
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid email or password"
            });
 
        }
         const payload ={
            userId:user._id,
            email: user.email,
            name: user.name
        };
        const token = generateToken(payload);
        return res.status(200).json({
            message: "Login Successfully",
            token,
            user
        });
    }
        catch(error){
            console.log("the actual error is:",error);
            res.status(500).json({
                message: "Internal Server Error",devError:error.message
            });
        }
};