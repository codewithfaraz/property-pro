const Buyer = require("../modal/BuyerSchema");
exports.addBuyer = async (req, res, next) => {
  try {
    const buyer = await Buyer.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        buyer,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};
