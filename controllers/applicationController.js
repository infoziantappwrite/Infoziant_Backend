const Application = require("../models/Application");

// Submit a new application
exports.applyJob = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.json({ message: "Application submitted", application });
  } catch (err) {
    res.status(500).json({ error: "Application failed" });
  }
};

// Get all applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

// Get single application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch application" });
  }
};

// Update application by ID
exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json({ message: "Application updated", application });
  } catch (err) {
    res.status(500).json({ error: "Failed to update application" });
  }
};

// Delete application by ID
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete application" });
  }
};
