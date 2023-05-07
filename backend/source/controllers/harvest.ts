import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Harvest from '../models/harvest';
import fileUpload, { UploadedFile } from 'express-fileupload';


const NAMESPACE = 'Harvest';

const createHarvest = async (req: Request, res: Response, next: NextFunction) => {
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
    console.log(ProductName)
    const f = req.files!.file;

    if (f) {
        try {
            const file = f as UploadedFile;
            file.mv(`source/uploads/Harvest/${ProductName}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        } catch (error) {
            return res.status(500).send(error)
        }
        console.log("File save successfully")

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

        console.log("Model setted successfully")

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
        return res.status(500).json({ "message": "File not found" })
    }
}

const getAllHarvests = (req: Request, res: Response, next: NextFunction) => {
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

const getHarvestById = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Harvest.findById(id).then((Harvest) => {
        if (Harvest) {
            return res.status(200).json({ Harvest })
        } else {
            return res.status(404).json({ "message": "Harvest not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})


const updateHarvest = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Harvest.findById(id).then((Harvest) => {
        if (Harvest) {
            return Harvest.set(req.body).save().then((Harvest) => {
                return res.status(201).json({ Harvest })
            }).catch(err => {
                return res.status(500).json({ error: err })
            })
        } else {
            return res.status(404).json({ "message": "Harvest not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})

export default { createHarvest, getAllHarvests, getHarvestById, updateHarvest };
