const Property = require("../modal/PropertySchema");
const Dealer = require("../modal/DealerSchema");
const mongoose = require("mongoose");
//controller for adding property
exports.addProperty = async (req, res, next) => {
  try {
    const { owner, ...propertyData } = req.body;
    const dealer = await Dealer.findById(owner);
    if (!dealer) {
      return res.status(404).json({
        status: "fail",
        message: "Dealer not found",
      });
    }
    const newProperty = await Property.create({
      ...propertyData,
      owner: dealer._id,
    });
    await newProperty.save();
    res.status(200).json({
      status: "success",
      data: {
        property: newProperty,
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
//controller for getting properties for a dealer
exports.getProperties = async (req, res, next) => {
  try {
    console.log(req.query.ownerId);
    if (!mongoose.Types.ObjectId.isValid(req.query.ownerId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid owner id",
      });
    }
    const properties = await Property.find({
      owner: req.query.ownerId,
    }).populate("owner");
    console.log(properties);
    return res.status(200).json({
      status: "success",
      data: {
        properties,
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
//controller for getting a single property
exports.getProperty = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.query.id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid property id",
      });
    }
    const property = await Property.findById(req.query.id).populate("owner");
    if (!property) {
      return res.status(404).json({
        status: "fail",
        message: "Property not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: {
        property,
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

exports.getTempMessage = async (req, res, next) => {
  return res.status(200).json({
    message: "hello world",
  });
};
//fetched all properties
exports.getFeaturedProperties = async (req, res, next) => {
  try {
    const properties = await Property.find().sort({ _id: -1 }).limit(3);
    console.log(properties);
    return res.status(200).json({
      status: "success",
      data: {
        properties,
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
