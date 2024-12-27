import express from "express";
import User from "../models/User.js"; // Ensure the User model exists and is valid
import Project from "../models/Project.js"; // Ensure case-sensitive path match

const router = express.Router();

// Dashboard endpoint to aggregate data
router.get("/", async (req, res) => {
  try {
    // Get total users
    const totalUsers = await User.countDocuments();

    // Get total projects and total money raised
    const projects = await Project.find();
    const totalProjects = projects.length;
    const totalMoneyRaised = projects.reduce(
      (total, project) => total + (project.currentFunding || 0),
      0
    );

    // Send aggregated data
    res.status(200).json({
      totalUsers,
      totalProjects,
      totalMoneyRaised,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;
