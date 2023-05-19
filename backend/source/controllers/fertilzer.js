const mongoose = require('mongoose');
const logging = require('../config/logging');
const Fertilizer = require('../models/fertilizer');
const { UploadedFile } = require('express-fileupload');

const NAMESPACE = 'Fertilizer';

const createFertilizer = async (req, res, next) => {
    let {
        unit_price,
        name,
        contents,
        measurement_unit,
    } = req.body;

    const ProductName = `${name}_${new Date().getTime()}`;
    console.log(ProductName);
    const f = req.files.file;

    if (f) {
        try {
            const file = f;
            file.mv(`source/uploads/${ProductName}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        } catch (error) {
            return res.status(500).send(error);
        }
        console.log("file save successfully");

        const _Fertilizer = new Fertilizer({
            _id: new mongoose.Types.ObjectId(),
            unit_price,
            name,
            contents,
            measurement_unit,
            image_path: ProductName
        });

        console.log("Model set successfully");

        return _Fertilizer
            .save()
            .then((Fertilizer) => {
                return res.status(201).json({
                    Fertilizer
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    } else {
        return res.status(500).json({ "message": "file not found" });
    }
};

const getAllFertilizers = (req, res, next) => {
    Fertilizer.find()
        .exec()
        .then((Fertilizers) => {
            return res.status(200).json({
                Fertilizers: Fertilizers,
                count: Fertilizers.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getFertilizerById = async (req, res) => {
    const id = req.params.id;
    try {
        const Fertilizer = await Fertilizer.findById(id);
        if (Fertilizer) {
            return res.status(200).json({ Fertilizer });
        } else {
            return res.status(404).json({ "message": "Fertilizer not found" });
        }
    } catch (err) {
        return res.status(500).json({ "error": err });
    }
};

const updateFertilizer = async (req, res) => {
    const id = req.params.id;
    try {
        const Fertilizer = await Fertilizer.findById(id);
        if (Fertilizer) {
            Fertilizer.set(req.body);
            const updatedFertilizer = await Fertilizer.save();
            return res.status(201).json({ Fertilizer: updatedFertilizer });
        } else {
            return res.status(404).json({ "message": "Fertilizer not found" });
        }
    } catch (err) {
        return res.status(500).json({ "error": err });
    }
};

const deleteFertilizer = async (req, res) => {
    const id = req.params.id;
    try {
        const Fertilizer = await Fertilizer.findById(id);
        if (Fertilizer) {
            await Fertilizer.deleteOne();
            return res.status(200).json({ "message": "Fertilizer deleted successfully" });
        } else {
            return res.status(404).json({ "message": "Fertilizer not found" });
        }
    } catch (err) {
        return res.status(500).json({ "error": err });
    }
};

module.exports = {
    createFertilizer,
    getAllFertilizers,
    getFertilizerById,
    updateFertilizer,
    deleteFertilizer
};