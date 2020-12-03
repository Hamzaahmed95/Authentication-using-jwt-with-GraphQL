require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const {
    AuthenticationError
} = require('apollo-server-express');

module.exports = {
    signUp: async(parent,{username,email,password},{models})=>{
     
        email = email.trim().toLowerCase();

        const hashed = await bcrypt.hash(password,10);

        try{
            const user = await models.User.create({
                username,
                email,
                password: hashed
            })

            return jwt.sign({id: user._id},process.env.JWT_SECRET);
        }
        catch(err){
            throw new Error('Error creating account!'+err);
        }
    },
    signIn: async(parent,{username, email,password},{models})=>{
        if(email){
            email: email.trim().toLowerCase();
        }
        const user = await models.User.findOne({
            $or: [{ email },{ username }]
        });
        
        if(!user){
            throw new Error('Error signing in');
        }
        const valid = await bcrypt.compare(password,user.password)
        if(!valid){
            throw new AuthenticationError('Error signing in')
        }

        return jwt.sign({id: user._id},process.env.JWT_SECRET);
    }

}