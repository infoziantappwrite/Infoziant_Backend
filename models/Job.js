const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  organizationName: String,
  salaryRange: String,
  description: String,
  industry: String,
  skills: String,
  employmentType: String,
  qualifications: String,
  workingHours: String,
  jobLocationType: String,
  Location: String,
  Vacancy: String,
  End_date: Date,
  datePosted: { type: Date, default: Date.now },
  postedBy: String,
  status: String,
});

module.exports = mongoose.model("Job", jobSchema);
