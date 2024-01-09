const UserModel = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!(email && password && username)) {
            return res.status(400).send({ message: "All input is required" });
        }

        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            return res.status(409).send({ message: "User Already Exist. Please Login" });
        }

        const encryptedPassword = await bcryptjs.hash(password, 10);

        const user = await UserModel.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send({ message: "All input is required" });
        }

        const user = await UserModel.findOne({ email });

        if (user && (await bcryptjs.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;

            res.status(200).json(user);
        } else {
            res.status(400).send({ message: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const updateUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        const user = await UserModel.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserDetails,
    updateUserDetails,
    deleteUser
};