const mongoose = require('mongoose');
const Loan = require('../models/loan');

const NAMESPACE = 'Loan';

const createLoan = async (req, res, next) => {
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

const getApprovedLoans = (req, res, next) => {
  Loan.find({ status: true })
    .exec()
    .then((loans) => {
      return res.status(200).json({
        loans: loans,
        count: loans.length,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllLoans = (req, res, next) => {
  Loan.find({ status: false })
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

const getLoanById = async (req, res) => {
  const id = req.params.id;
  try {
    const Loan = await Loan.findById(id);
    if (Loan) {
      return res.status(200).json({ Loan });
    } else {
      return res.status(404).json({ message: "Loan not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const updateLoan = async (req, res) => {
  const id = req.params.id;
  try {
    const Loan = await Loan.findById(id);
    if (Loan) {
      Loan.set(req.body);
      const updatedLoan = await Loan.save();
      return res.status(201).json({ Loan: updatedLoan });
    } else {
      return res.status(404).json({ message: "Loan not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const updateLoanTrue = async (req, res) => {
  const id = req.params.id;
  try {
    const loan = await Loan.findOneAndUpdate({ _id: id, status: false }, { status: true }, { new: true });
    if (loan) {
      return res.status(200).json({ loan });
    } else {
      return res.status(404).json({ message: "User not found or is already active" });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const getPendingLoans = (req, res, next) => {
  Loan.find({ status: true })
    .exec()
    .then((Loans) => {
      return res.status(200).json({
        Loans: Loans,
        count: Loans.length
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error,
        error
      });
    });
};

module.exports = {
  getApprovedLoans,
  getPendingLoans,
  createLoan,
  getAllLoans,
  getLoanById,
  updateLoan,
  updateLoanTrue
};
