import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Fertlizer from '../models/fertilizer';
import { UploadedFile } from 'express-fileupload';


const NAMESPACE = 'Fertlizer';

const createFertlizer = async (req: Request, res: Response, next: NextFunction) => {
    let {
        unit_price,
        name,
        contents,
        measurement_unit,
    } = req.body;


    const ProductName = `${name}_${new Date().getTime()}`;
    // Access the uploaded file using req.files.file
    console.log(ProductName)
    const f = req.files!.file;

    if (f) {
        try {
            const file = f as UploadedFile
            // Process the uploaded file
            // Example: Save the file to disk
            file.mv(`source/uploads/${ProductName}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
            });
        } catch (error) {
            return res.status(500).send(error);
        }
        console.log("file save succesfully")
        const _Fertlizer = new Fertlizer({
            _id: new mongoose.Types.ObjectId(),
            unit_price,
            name,
            contents,
            measurement_unit,
            image_path: ProductName
        });

        console.log("Model setted successfully")

        return _Fertlizer
            .save()
            .then((Fertlizer) => {
                return res.status(201).json({
                    Fertlizer
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    } else {
        return res.status(500).json({ "message": "file not dound" })
    }
}



const getAllFertlizers = (req: Request, res: Response, next: NextFunction) => {
    Fertlizer.find()
        .exec()
        .then((Fertlizers) => {
            return res.status(200).json({
                Fertlizers: Fertlizers,
                count: Fertlizers.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getFertlizerById = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Fertlizer.findById(id).then((Fertlizer) => {
        if (Fertlizer) {
            return res.status(200).json({ Fertlizer })
        } else {
            return res.status(404).json({ "message": "Fertlizer not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})


const updateFertlizer = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Fertlizer.findById(id).then((Fertlizer) => {
        if (Fertlizer) {
            return Fertlizer.set(req.body).save().then((Fertlizer) => {
                return res.status(201).json({ Fertlizer })
            }).catch(err => {
                return res.status(500).json({ error: err })
            })
        } else {
            return res.status(404).json({ "message": "Fertlizer not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})

const deleteFertlizer = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const Fertilizer = await Fertlizer.findById(id);
        if (Fertilizer) {
            await Fertilizer.deleteOne();
            return res.status(200).json({ "message": "Fertlizer deleted successfully" });
        } else {
            return res.status(404).json({ "message": "Fertlizer not found" });
        }
    } catch (err) {
        return res.status(500).json({ "error": err });
    }
}

export default { createFertlizer, getAllFertlizers, getFertlizerById, updateFertlizer, deleteFertlizer };
