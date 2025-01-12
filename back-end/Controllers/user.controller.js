const userModel = require('../Models/user.model');
const hashing = require('../utili/hashing');
const auth = require('../utili/auth');
exports.createUser= async (req,res)=>{
   try{
    const {name,email,password,userType}=req.body;
const hashedPassword = await hashing.hashPassword(password);
    const user= await userModel.create({name,email,userType,password:hashedPassword});
    res.status(201).json(user);
   }
   catch(err){
    res.status(500).json({error:err.message})
   }
}



// exports.login= async(req,res)=>{
//     try{
// const {email,password}=req.body;
// const user = await userModel.findOne({ email }).populate("userType");
// if(user){
//     const isMatch = await hashing.compare(password,user.password);
//     if(isMatch){
//         //login
//         const token = auth.createToken({userId:user._id,userName:user.name,userType:user.userType.name})
//         res.status(200).json({'accessToken': token});
//     }
//     else
//     {
//         res.status(400).json({'not found': 'wrong password'})
//     }
// }
// else
// {
//     res.status(400).json({'not found': 'email not found'})
// }


//     }
//     catch(err){
//         res.status(500).json({error:err.message})
//     }
// }

exports.getUsers= async(req,res)=>{
    try{
        const users = await userModel.find().populate('userType');
    res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({error:err.message})
       }
    }

    exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).populate("userType");
        if (user) {
            const isMatch = await hashing.compare(password, user.password);
            if (isMatch) {
                // Generate token with user type
                const token = auth.createToken({
                    userId: user._id,
                    userName: user.name,
                    userType: user.userType.name
                });

                if (user.userType.name === "Admin") {
                    res.status(200).json({ 
                        message: "Admin login successful",
                        redirect: "/dashboard",
                        accessToken: token
                    });
                } else {
                    res.status(200).json({ 
                        message: "User login successful",
                        redirect: "/home",
                        accessToken: token
                    });
                }
            } else {
                res.status(400).json({ error: "Wrong password" });
            }
        } else {
            res.status(400).json({ error: "Email not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
