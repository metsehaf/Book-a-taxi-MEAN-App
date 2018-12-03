const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  grade: { type: String, required: true },
  content: { type: String, required: true},
  routeNumber: {type: String, required: true},
  startDate: {type: String, required: true},
  endDate: {type: String, required: true},
  telephone: { type: String, required: true },
  pickUpTime: { type: String, required: true },
  dropOffTime: { type: String, required: true },
  pickUpAddress: { type: String, required: true },
  schoolLocation: { type: String, required: true },
  approvedBy: { type: String, required: true },
  mustBeMet: { type: String, required: true },
  imagePath: { type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model("Post", postSchema);
