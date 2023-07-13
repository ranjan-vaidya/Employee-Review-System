const Post = require("../models/Post");
const User = require("../models/User")
const Employee = require("../models/Employee")
const {sendEmail} = require("../middleware/sentEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary")

exports.register = async (req,res) => {

    try {

        const {name, email, password} = req.body;

        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                success:false,
                message:"User with same email already exists"
            })
        }


        user = await User.create({
            name,
            email, 
            password,
        })

        //Logging in user As soon as registered
        const token = await user.generateToken();               // YOU FORGET TO ADD AWAIT
        const options = {                                       // Creating cookie named "token" whose value is token
            expires: new Date(Date.now() + 90*24*60*60*1000),              //Expired the cookie after 9 days  
            httpOnly: true
        }

        res.status(201)                                //201 => created
            .cookie("token", token, options)           //Option contains token expiry details
            .json({
            success:true,
            user,
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

        let user = await User.findOne({email}).select("+password");    //to match the password.. select should be true for password

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exists",
            })
        }

        const isMatch = await user.matchPassword(password);         //function is defined below User schema
        // console.log(isMatch)

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }

        const token = await user.generateToken();               // YOU FORGET TO ADD AWAIT
        const options = {                                       // Creating cookie named "token" whose value is token
            expires: new Date(Date.now() + 90*24*60*60*1000),              //Expired the cookie after 9 days  
            httpOnly: true
        }

        res.status(200)
            .cookie("token", token, options)
            .json({
            success:true,
            user,                                                //from here we are fetching user._id
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
exports.addEmployee = async(req,res) => {

    try {

        const {name, email, password} = req.body;

        let employee = await Employee.findOne({email})

        if(employee){
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

// Update an employee
exports.updateEmployee = async(req,res) => {

    try {

        const {name, email, password} = req.body;

        let employee = await Employee.findOne({email})

        if(!employee){
            return res.status(400).json({
                success:false,
                message:"Employee does not exists"
            })
        }

        if(name){
            employee.name = name
        }
        if(email){
            employee.email = email
        }
        if(password){
            employee.password = password
        }

        await employee.save()

        res.status(201)                                //201 => created
            .json({
            success:true,
            message:"Employee Updated",
            employee,
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// Accept purchase request to a post
exports.deleteEmployee = async(req,res) => {

    try {

        const {email} = req.body;

        let employee = await Employee.findOne({email})

        if(!employee){
            return res.status(400).json({
                success:false,
                message:"Employee does not exists"
            })
        }

        await employee.remove()

        res.status(200).json({
            success: true,
            message: `Employee deleted`
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// Accept purchase request to a post
exports.accessableEmployees = async(req,res) => {

    try {

        const {email, empArray} = req.body;

        let employee = await Employee.findOne({email})

        if(!employee){
            return res.status(400).json({
                success:false,
                message:"Employee does not exists"
            })
        }

        if(empArray.length==0){
            return res.status(400).json({
                success:false,
                message:"Please select at least one employee"
            })
        }

        employee.accessableEmployees = empArray
        await employee.save()

        res.status(200).json({
            success: true,
            message: `accessable Employees Added`
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
// Add performance review
exports.addPerformanceReview = async(req,res) => {

    try {

        const {email, review} = req.body;

        let employee = await Employee.findOne({email})

        if(!employee){
            return res.status(400).json({
                success:false,
                message:"Employee does not exists"
            })
        }

        if(review.length==0){
            return res.status(400).json({
                success:false,
                message:"Review is empty"
            })
        }

        employee.performanceReview = review
        await employee.save()

        res.status(200).json({
            success: true,
            message: `Employee review Added`
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// Update performance review
exports.updatePerformanceReview = async(req,res) => {

    try {

        const {email, review} = req.body;

        let employee = await Employee.findOne({email})

        if(!employee){
            return res.status(400).json({
                success:false,
                message:"Employee does not exists"
            })
        }

        employee.performanceReview = review     //even if it's empty
        await employee.save()

        res.status(200).json({
            success: true,
            message: `Employee review updated`
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}











// Decline purchase request to a post
exports.declinePurchaseRequest = async(req,res) => {

    try {

        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({
                success: true,
                message:"Post not found"
            })
        }

        const buyer = await User.findById(req.body.buyer)

        if(!buyer){
            return res.status(404).json({
                success: true,
                message:"Person (buyer) not found"
            })
        }

        const indexOfRequestFromPost = post.purchaseRequest.indexOf(buyer._id)
        const indexOfRequestFromBuyer = buyer.purchaseRequest.indexOf(post._id)

        post.purchaseRequest.splice(indexOfRequestFromPost,1)
        buyer.purchaseRequest.splice(indexOfRequestFromBuyer,1)

        await post.save()
        await buyer.save()

        res.status(200).json({
            success: true,
            message: "Purchase request rejected"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//My profile data
exports.myProfile = async (req,res) => {

    try {

        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        res.status(200).json({
            success:true,
            user,            
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//get user profile
exports.getUserProfile = async (req,res) => {

    try {

        const user = await User.findById(req.params.id).populate("posts")      //post with details to be shown

        if(!user){
            return res.status(404).json({
                success:true,
                message:"User not found"
            })
        }

        res.status(200).json({
            success:true,
            user,
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//get all users
exports.getAllUsers = async (req,res) => {

    try {

        const users = await User.find({
            name:{$regex: req.query.name, $options:"i"}
        })

        res.status(200).json({
            success:true,
            users,
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//Get user products OLX
exports.getAllMyPosts = async (req,res) => {

    try {

        const posts = await Post.find({owner:req.user._id}).populate("owner buyer purchaseRequest")

        res.status(200).json({
            success:true,
            posts,             //Latest post should be displayed first
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//Get all my Purchases OLX
exports.getAllMyPurchases = async (req,res) => {

    try {

        const posts = await Post.find({buyer: req.user._id}).populate("owner")

        res.status(200).json({
            success:true,
            posts,             //Latest post should be displayed first
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}