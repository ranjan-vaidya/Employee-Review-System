const Post = require("../models/Post");
const User = require("../models/User")
const Employee = require("../models/Employee")
const {sendEmail} = require("../middleware/sentEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary")

exports.register = async (req,res) => {

    try {

        const {name, email, password} = req.body;

        let employee = await Employee.findOne({email})

        if(Employee){
            return res.status(400).json({
                success:false,
                message:"Employee with same email already exists"
            })
        }


        employee = await Employee.create({
            name,
            email, 
            password,
        })

        //Logging in user As soon as registered
        const token = await employee.generateToken();               // YOU FORGET TO ADD AWAIT
        const options = {                                       // Creating cookie named "token" whose value is token
            expires: new Date(Date.now() + 90*24*60*60*1000),              //Expired the cookie after 9 days  
            httpOnly: true
        }

        res.status(201)                                //201 => created
            .cookie("token", token, options)           //Option contains token expiry details
            .json({
            success:true,
            employee,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//User login
exports.login = async (req,res) => {

    try {

        const {email, password} = req.body;

        let employee = await Employee.findOne({email}).select("+password").populate("posts");    //to match the password.. select should be true for password

        if(!employee){
            return res.status(400).json({
                success:false,
                message:"Employee does not exists",
            })
        }

        const isMatch = await employee.matchPassword(password);         //function is defined below User schema
        // console.log(isMatch)

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }

        const token = await employee.generateToken();               // YOU FORGET TO ADD AWAIT
        const options = {                                       // Creating cookie named "token" whose value is token
            expires: new Date(Date.now() + 90*24*60*60*1000),              //Expired the cookie after 9 days  
            httpOnly: true
        }

        res.status(200)
            .cookie("token", token, options)
            .json({
            success:true,
            employee,                                                //from here we are fetching user._id
            token
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//user Logout
exports.logout = async (req,res) => {

    try {

        res.status(200)
            .cookie("token",null, {expires: new Date(Date.now()), httpOnly:true})
            .json({
                success:true,
                message:"Logged out"
            })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// Add an employee
exports.addFeedback = async(req,res) => {

    try {

        const {email, feedback} = req.body;

        let employee = await Employee.findOne({email})

        if(!employee){
            return res.status(400).json({
                success:false,
                message:"Employee does not exists"
            })
        }


        employee.feedback.push({
            value:feedback,
            employee:req.employee._id
        })

        employee.save()

        res.status(201)                                //201 => created
            .json({
            success:true,
            message:"Employee created",
            employee,
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// Get all employees
exports.allEmployees = async(req,res) => {

    try {


        let employees = await Employee.find()

        if(!employees || employees.length==0){
            return res.status(400).json({
                success:false,
                message:"Employee does not exists"
            })
        }

        res.status(201)                                //201 => created
            .json({
            success:true,
            employees,
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
