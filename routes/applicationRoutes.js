const express = require("express");
const router = express.Router();
const {
  applyJob,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication
} = require("../controllers/applicationController");
const authenticateToken = require('../middleware/authMiddleware');

router.post("/", applyJob);
router.get("/",authenticateToken, getApplications);
router.get("/:id",authenticateToken, getApplicationById);
router.put("/:id",authenticateToken, updateApplication);
router.delete("/:id",authenticateToken, deleteApplication);

module.exports = router;
