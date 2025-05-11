const Dealer = require("../modal/DealerSchema");
exports.addDealer = async (req, res, next) => {
  try {
    const dealer = await Dealer.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        dealer,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};
