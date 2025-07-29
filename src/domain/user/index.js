import { model, Schema } from "mongoose";
import { nanoid } from "nanoid";
import validator from "validator";
import crypto from 'crypto';

const userSchema = Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email!!!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    salt: {
        type: String
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate(value) {
            if (!['male', 'female', 'other'].includes(value)) {
                throw new Error('Invalid gender type!!')
            }
        }
    },
    photoUrl: {
        type: String
    },
    Skills: {
        type: [String]
    }
},
    {
        timestamps: true
    }
)

const userModel = model('user', userSchema)

const hashPassword = async (password, salt) => {
    try {
        const encryptedpassword = crypto.createHash('md5').update(Buffer.from(password)).digest('hex') + salt
        return encryptedpassword
    } catch (err) {
        console.log(err.message)
        throw new Error(`Error while hashing : ${err.message}`)
    }
}

const isUserExist = async ({ emailId }) => {
    const isUser = await userModel.findOne({ emailId })
    if (!isUser) {
        return false
    }

    return isUser
}

const registerUser = async (userInfo) => {

    const { firstName, lastName, emailId, password } = userInfo

    const isUser = await isUserExist({ emailId })
    if (isUser) {
        return 'User with this email already exist!!!'
    }

    const salt = nanoid()
    const encryptedPassword = await hashPassword(password, salt)

    const newUser = await userModel.create({ firstName, lastName, emailId, password: encryptedPassword, salt })
    if (!newUser) {
        throw new Error(`Error while creating the user `)
    }

    return 'You are registered successfully!!!'
}

const authenticateUser = async ({ emailId, password }) => {

    const user = await isUserExist({ emailId })
    if (!user) {
        throw new Error("User is not registered on this website!!!")
    }

    if (!hashPassword(password, user.salt) === user.password) {
        throw new Error('Invalid Username or password')
    }

    return user
}

const viewProfile = async ({ emailId }) => {

    const user = await isUserExist({ emailId })
    if (!user) {
        throw new Error("Invalid user!!!")
    }

    return user
}

export const userDomain = {
    registerUser,
    authenticateUser,
    viewProfile
}       