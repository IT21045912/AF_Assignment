import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import logging from '../config/logging';
import User from '../models/user';
import signJWT from '../functions/signJTW';

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token validated, user authorized.');

    return res.status(200).json({
        message: 'Token(s) validated'
    });
};

const register = (req: Request, res: Response, next: NextFunction) => {
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
            name, email, address, contact_number,password: hash, status, role
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
const deleteUser = async (req: Request, res: Response) => {
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
}


const login = (req: Request, res: Response, next: NextFunction) => {
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

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
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

const getUserById = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await User.findById(id).then((user) => {
        if (user) {
            return res.status(200).json({ user })
        } else {
            return res.status(404).json({ "message": "user not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})
const getAllFarmers = async (req: Request, res: Response) => {
  try {
    const farmers = await User.find({ role: 'Farmer' });
    return res.status(200).json({ farmers });
  } catch (err) {
    return res.status(500).json({ "error": err });
  }
}
const getOnlyUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ role: 'User' });
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ "error": err });
  }
}

const getInactiveFarmers = async (req: Request, res: Response) => {
  try {
    const inactiveFarmers = await User.find({ role: 'Farmer', status: false });
    return res.status(200).json({ inactiveFarmers });
  } catch (err) {
    return res.status(500).json({ "error": err});
  }
}
const getActiveFarmers = async (req: Request, res: Response) => {
  try {
    const ActiveFarmers = await User.find({ role: 'Farmer', status: true });
    return res.status(200).json({ ActiveFarmers });
  } catch (err) {
    return res.status(500).json({ "error": err});
  }
}

const updateUser = (async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id);
    
    return await User.findById(id).then((user) => {
        if (user) {
            return user.set(req.body).save().then((user) => {
                return res.status(201).json({ user })
            }).catch(err => {
                return res.status(500).json({ error: err })
            })
        } else {
            return res.status(404).json({ "message": "user not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})
const activateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndUpdate({ _id: id, role: 'Farmer', status: false }, { status: true }, { new: true });
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ "message": "user not found or is already active" });
    }
  } catch (err) {
    return res.status(500).json({ "error": err });
  }
}


export default {deleteUser,activateUser,getActiveFarmers,getInactiveFarmers, getOnlyUsers, validateToken, register, login, getAllUsers, getUserById, updateUser,getAllFarmers };
