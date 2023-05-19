const stripe_key = process.env.STRIPE_SECRET_KEY;

const stripe = require('stripe')(stripe_key);


const payByCard = async (req, res) => {
  const customer = req.body.customer;
  const amount = req.body.amount;
  const currency = req.body.currency;
  const cardNumber = req.body.cardNumber;
  const expMonth = req.body.expMonth;
  const expYear = req.body.expYear;
  const ccv = req.body.ccv;

  try {
    // create a new payment method
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: ccv,
      },
    });

    //create a stripe customer obj
    const Customer = await stripe.customers.create({
      name: customer,
      email: getEmail(customer),
      payment_method: paymentMethod.id,
    });

    // confirm the payment by attaching the payment method to a customer and creating a charge
    const charge = await stripe.charges.create({
      amount: amount,
      currency: currency,
      customer: Customer.id,
      payment_method: paymentMethod.id,
      confirm: true,
    });

    const id = await addToTempTable(customer,amount);
    res.send({ID:id});

  } catch (error) {
    const id = await addToTempTable(customer,amount);
    res.send({ID:id});
  }
}

module.exports={
    payByCard
}