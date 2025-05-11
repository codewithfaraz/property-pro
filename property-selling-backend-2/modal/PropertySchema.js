const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
  amenities: {
    type: [String],
  },
  area: {
    type: String,
    required: [true, "Area is Required"],
  },
  title: {
    type: String,
    required: [true, "Title is Required"],
  },
  bathrooms: {
    type: String,
    required: [true, "Bathrooms is Required"],
  },
  bedrooms: {
    type: String,
    required: [true, "Bedrooms is Required"],
  },
  description: {
    type: String,
    required: [true, "Description is Required"],
  },
  features: {
    type: [String],
  },
  imagesNames: {
    type: [String],
    required: [true, "Images is Required"],
  },
  videoName: {
    type: String || null,
    required: [true, "Video is Required"],
  },
  price: {
    type: String,
    required: [true, "Price is Required"],
  },
  location: {
    type: String,
    required: [true, "Location is Required"],
  },
  type: {
    type: String,
    required: [true, "Type is Required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dealer",
    required: [true, "Owner is Required"],
  },
});
const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
