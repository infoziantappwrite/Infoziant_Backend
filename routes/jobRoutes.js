const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController");
const authenticateToken = require('../middleware/authMiddleware');

router.post("/",authenticateToken, createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.put("/:id",authenticateToken, updateJob);
router.delete("/:id",authenticateToken, deleteJob);

module.exports = router;
