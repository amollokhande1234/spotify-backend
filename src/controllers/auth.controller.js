const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function register(req, res) {
    try {
        const { username, email, password, role } = req.body;

        const isPresent = await userModel.findOne({
            /* 
            
            works perfect for a user 
            have 2 things present if not 
            then it will give the null value 
            
            /////////////////
            email : email,
            username : username 
            /////////////////

            */

            $or: [
                { username: username },
                { email: email }
            ]


        });

        if (isPresent) {
            return res.status(409).json({
                message: "user allready exists"
            });
        }

        const encryptPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({ username, email, password: encryptPassword, role });

        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET,
        );

        res.cookie('token', token);

        res.status(201).json({
            message: "User created Successfully"
        });
    }
    catch (e) {
        console.error(e);

    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        // const token = req.cookies.token;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Unothorized"
            });
        }

        const valid = await bcrypt.compare(password, user.password);


        if (!valid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }


        const token = jwt.sign({
            id: user._id,
            role: user.role,

        }, process.env.JWT_SECRET);


        res.cookie("token", token);



        // const verify = jwt.verify(token, process.env.JWT_SECRET);

        // if (!verify) {
        //     return res.status(401).json({
        //         message: "Unothorized"
        //     });
        // }

        // console.log(verify);



        res.status(200).json({
            message: "Login Successfully"
        });

    }
    catch (e) {
        console.error(e);

    }
}

module.exports = { register, login }