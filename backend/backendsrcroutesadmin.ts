import { Router } from "express";
import { verifyFirebaseToken, requireRole } from "../middleware/auth";
import { Department } from "../models/Department"; // define similarly to StudentProfile

const router = Router();
router.use(verifyFirebaseToken, requireRole("admin"));

// Department CRUD
router.get("/departments", async (_, res) => {
  const deps = await Department.find();
  res.json(dep);
});
router.post("/departments", async (req, res) => {
  const dep = await Department.create(req.body);
  res.json(dep);
});
// (add PUT / DELETE as needed)

export default router;