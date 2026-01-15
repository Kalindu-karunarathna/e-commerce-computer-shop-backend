import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//function for create users
export function createUser(req,res){

    const data = req.body;
    //hashing the user password before save in database
    const hashPassword = bcrypt.hashSync(data.password,10);
    res.json(
        {hashPassword}
    );

    //get the data of request that sent through login form and create newUser object
    const newUser = new User({
        email : data.email,
        password : hashPassword,
        firstName : data.firstName,
        lastName : data.lastName,
        role : data.role
    })

    //save the newUser object in database and respond a message that mentioned user is successfully created
    newUser.save().then(
        ()=>{
            res.json(
                { message:"user created successfully"}
            )
        }
    )
}


//function for login user
export function loginUser(req,res){
    const email = req.body.email
    const password = req.body.password

    //find user through email
    User.find({email:email}).then(
        (users)=>{
            if(users[0]==null){     //if there is no email in database that equal to user entered email when login
                res.json(              //respond user not found
                    {message:"user not found!"}
                )
            }
            else{
                const user = users[0] //if email found, get the user
                
                const isPasswordCorrect = bcrypt.compareSync(password,user.password) // check if entered password correct or not

                //if password correct,create token when user login
                if(isPasswordCorrect){
                    const payload={
                        email:user.email,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        role:user.role,
                        isEmailVerified:user.isEmailVerified,
                        image:user.image
                    };

                    const token = jwt.sign(payload,"secretKey96$2025",{
                        expiresIn:"150h"
                    });

                    res.json(
                        {message:"login successful",
                         token:token   
                        }
                    )
                }
                //if password was wrong respond invalid password
                else{
                    res.status(401).json(
                        {message:"invalid password"}
                    )
                }
            }
        }
    )
}


//check if request is done by admin or not
export function isAdmin(req){
    //check req is done by authorized user
    if(req.user==null){     
       
        return false
    }
    //check user role is admin or not
    if(req.user.role != "admin"){
        
        return false
    }
    return true
}