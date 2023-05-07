import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Loan from '../models/loan';



const NAMESPACE = 'Loan';

const createLoan = async (req: Request, res: Response, next: NextFunction) => {
  let {
    requested_by,
    reason,
    special_notice,
    status,
    amount,
    time
  } = req.body;

  const _Loan = new Loan({
    _id: new mongoose.Types.ObjectId(),
    requested_by,
    reason,
    special_notice,
    status,
    amount,
    time
  });

  _Loan.save()
    .then((Loan) => {
      return res.status(201).json({
        Loan
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });

}



const getAllLoans = (req: Request, res: Response, next: NextFunction) => {
    Loan.find()
        .exec()
        .then((Loans) => {
            return res.status(200).json({
                Loans: Loans,
                count: Loans.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getLoanById = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Loan.findById(id).then((Loan) => {
        if (Loan) {
            return res.status(200).json({ Loan })
        } else {
            return res.status(404).json({ "message": "Loan not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})


const updateLoan = (async (req: Request, res: Response) => {
    const id = req.params.id;
    return await Loan.findById(id).then((Loan) => {
        if (Loan) {
            return Loan.set(req.body).save().then((Loan) => {
                return res.status(201).json({ Loan })
            }).catch(err => {
                return res.status(500).json({ error: err })
            })
        } else {
            return res.status(404).json({ "message": "Loan not found" })
        }
    }).catch(err => {
        return res.status(500).json({ "error": err })
    })
})

// const updateLoanTrue = async (req: Request, res: Response) => {
//     const id = req.params.id;
//     try {
//         const loan = await Loan.findById(id);
//         if (loan) {
//             loan.set({ ...req.body, status: true });
//             const updatedLoan = await loan.save();
//             return res.status(200).json({ Loan: updatedLoan });
//         } else {
//             return res.status(404).json({ message: "Loan not found" });
//         }
//     } catch (error) {
//         return res.status(500).json({ error: error });
//     }
// };
const updateLoanTrue = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const loan = await Loan.findOneAndUpdate({ _id: id, status: false }, { status: true }, { new: true });
    if (loan) {
      return res.status(200).json({ loan });
    } else {
      return res.status(404).json({ "message": "user not found or is already active" });
    }
  } catch (err) {
    return res.status(500).json({ "error": err });
  }
}

const getApprovedLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.find({ status: true });
    return res.status(200).json({ loans });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default { getApprovedLoans, createLoan, getAllLoans, getLoanById, updateLoan, updateLoanTrue };
