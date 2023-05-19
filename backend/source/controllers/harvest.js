const express = require('express');
const mongoose = require('mongoose');
const logging = require('../config/logging');
const Harvest = require('../models/harvest');
const fileUpload = require('express-fileupload');

const NAMESPACE = 'Harvest';

const createHarvest = async (req, res, next) => {
    let {
        seller,
        unit_price,
        name,
        measurement_unit,
        category,
        quantity,
    } = req.body;
    const ProductName = `${name}_${new Date().getTime()}`;
    // Access the uploaded file using req.files.file
    console.log(ProductName);
    const f = req.files.file;

    if (f) {
        try {
            const file = f;
            file.mv(`source/uploads/Harvest/${ProductName}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        } catch (error) {
            return res.status(500).send(error);
        }
        console.log("File save successfully");

        const _Harvest = new Harvest({
            _id: new mongoose.Types.ObjectId(),
            seller,
            unit_price,
            name,
            measurement_unit,
            category,
            quantity,
            image_path: ProductName
        });

        console.log("Model setted successfully");

        return _Harvest
            .save()
            .then((Harvest) => {
                return res.status(201).json({
                    Harvest
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    } else {
        return res.status(500).json({ "message": "File not found" });
    }
};

const getAllHarvests = (req, res, next) => {
    Harvest.find()
        .exec()
        .then((Harvests) => {
            return res.status(200).json({
                Harvests: Harvests,
                count: Harvests.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getHarvestById = async (req, res) => {
    const id = req.params.id;
    return await Harvest.findById(id).then((Harvest) => {
        if (Harvest) {
            return res.status(200).json({ Harvest });
        } else {
            return res.status(404).json({ "message": "Harvest not found" });
        }
    }).catch(err => {
        return res.status(500).json({ "error": err });
    });
};

const getAllHarvestsBySeller = async (req, res) => {
    const sellerId = req.params.sellerId;
    try {
        const harvests = await Harvest.find({ seller: sellerId });
        if (harvests.length > 0) {
            return res.status(200).json({ harvests });
        } else {
            return res.status(404).json({ "message": "Harvests not found" });
        }
    } catch (err) {
        return res.status(500).json({ "error": err });
    }
};

// const updateHarvest = async (req, res) => {
//     const id = req.params.id;
//     return await Harvest.findById(id).then((Harvest) => {
//         if (Harvest) {
//             return Harvest.set(req.body).save().then((Harvest) => {
//                 return res.status(201).json({ Harvest });
//             }).catch(err => {
//                 return res.status(500).json({ error: err });
//             });
//         } else {
//             return res.status(404).json({ "message": "Harvest not found" });
//         }
//     }).catch(err => {
//         return res.status(500).json({ "error": err });
//     });
// };

//delete a harvest item
// const deleteHarvest = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const harvest = await Harvest.findById(id);
//         if (harvest) {
//             await harvest.deleteOne();
//             return res.status(200).json({ message: "Harvest deleted successfully" });
//         } else {
//             return res.status(404).json({ message: "Harvest not found" });
//         }
//     } catch (err) {
//         return res.status(500).json({ error: err });
//     }
// };

//delete a harvest item
const deleteHarvest = async (req, res) => {
    const id = req.params.id;
    await Harvest.findByIdAndDelete(id).then(() => {
        res.status(200).send({ state: "Success" });
    }).catch((err) => {
        res.status(400).send({ send: err });
    })
};

const updateHarvest = async (req, res) => {
    const id = req.body.id;
    const {
        unit_price,
        name,
        measurement_unit,
        category,
        quantity,
    } = req.body;

    console.log("ID: ", id);

    const newHarvest = {
        unit_price,
        name,
        measurement_unit,
        category,
        quantity,
    };

    await Harvest.findByIdAndUpdate(id, newHarvest).then(() => {
        res.status(200).send({ state: "Update", data: newHarvest });
    }).catch((err) => {
        res.status(400).send({ state: err });
    })

};


module.exports = { createHarvest, getAllHarvests, getHarvestById, updateHarvest, deleteHarvest, getAllHarvestsBySeller };
