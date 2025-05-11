const Dealer = require("../modal/DealerSchema");
const Buyer = require("../modal/BuyerSchema");
exports.getUser = async (req, res, next) => {
  try {
    const dealer = await Dealer.findOne({ email: req.query.email });
    if (dealer) {
      return res.status(200).json({
        message: "success",
        userType: "dealer",
        user: {
          user: dealer,
        },
      });
    }
    const buyer = await Buyer.findOne({ email: req.query.email });
    if (buyer) {
      return res.status(200).json({
        message: "success",
        userType: "buyer",
        user: {
          user: buyer,
        },
      });
    }
    return res.status(400).json({
      status: "fail",
      message: "user don't found",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};
