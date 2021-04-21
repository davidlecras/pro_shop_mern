import expreAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//@desc Auth the user and get the token
//@route POST api/users/login
//@access Public
const authUsers = expreAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    } else {
        res.status(401)
        throw new Error('Email ou mot de passe invalide')
    }
})

export { authUsers }