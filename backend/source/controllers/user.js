const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const logging = require('../config/logging');
const User = require('../models/user');
const signJWT = require('../functions/signJTW');

const NAMESPACE = 'User';

const validateToken = (req, res, next) => {
    logging.info(NAMESPACE, 'Token validated, user authorized.');

    return res.status(200).json({
        message: 'Token(s) validated'
    });
};

const register = (req, res, next) => {
    let { name, email, address, contact_number, password, status, role } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(401).json({
                message: hashError.message,
                error: hashError
            });
        }

        const _user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            address,
            contact_number,
            password: hash,
            status,
            role
        });

        return _user
            .save()
            .then((user) => {
                return res.status(201).json({
                    user
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOneAndDelete({ _id: id });
        if (user) {
            return res.status(200).json({ message: "User deleted successfully" });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

const login = (req, res, next) => {
    let { email, password } = req.body;

    User.find({ email: email })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }

            bcryptjs.compare(password, users[0].password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Password Mismatch'
                    });
                } else if (result) {
                    signJWT(users[0], (_error, token) => {
                        if (_error) {
                            return res.status(500).json({
                                message: _error.message,
                                error: _error
                            });
                        } else if (token) {
                            return res.status(200).json({
                                message: 'Auth successful',
                                token: token,
                                user: users[0]
                            });
                        }
                    });
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

const getAllUsers = (req, res, next) => {
    User.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users: users,
                count: users.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (user) {
            return res.status(200).json({ user });
        } else {
            return res.status(404).json({ message: "user not found" });
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

const getAllFarmers = async (req, res) => {
    try {
        const farmers = await User.find({ role: 'Farmer' });
        return res.status(200).json({ farmers });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

const getOnlyUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'User' });
        return res.status(200).json({ users });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

const getInactiveFarmers = async (req, res) => {
    try {
        const inactiveFarmers = await User.find({ role: 'Farmer', status: false });
        return res.status(200).json({ inactiveFarmers });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

const getActiveFarmers = async (req, res) => {
    try {
        const ActiveFarmers = await User.find({ role: 'Farmer', status: true });
        return res.status(200).json({ ActiveFarmers });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        const user = await User.findById(id);
        if (user) {
            user.set(req.body);
            const updatedUser = await user.save();
            return res.status(201).json({ user: updatedUser });
        } else {
            return res.status(404).json({ message: "user not found" });
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

const activateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOneAndUpdate({ _id: id, role: 'Farmer', status: false }, { status: true }, { new: true });
        if (user) {
            return res.status(200).json({ user });
        } else {
            return res.status(404).json({ message: "user not found or is already active" });
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

module.exports = {
    deleteUser,
    activateUser,
    getActiveFarmers,
    getInactiveFarmers,
    getOnlyUsers,
    validateToken,
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    getAllFarmers
};
