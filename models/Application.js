const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: String,
  jobtitle: String,
  applicantName: String,
  currentDesignation: String,
  experience: String,
  qualification: String,
  currentCTC: String,
  expectedCTC: String,
  keySkills: [String],
  languages: String,
  email: String,
  dateOfBirth: Date,
  gender: String,
  currentAddress: String,
  permanentAddress: String,
  zipCode: String,
  whyInterested: String,
  appliedAt: { type: Date, default: Date.now },
  status: String,
  resume: String,
  phone: String,
});

module.exports = mongoose.model("Application", applicationSchema);
