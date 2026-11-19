import { Router } from "express";
import { verifyFirebaseToken, requireRole, AuthRequest } from "../middleware/auth";
import { StudentProfile } from "../models/StudentProfile";
import { z } from "zod";

const router = Router();
router.use(verifyFirebaseToken, requireRole("student"));

// Get own profile
router.get("/profile", async (req: AuthRequest, res) => {
  const profile = await StudentProfile.findOne({ user: req.user!.uid }).populate("user");
  res.json(profile);
});

// Update profile – validated with Zod
const profileSchema = z.object({
  fullName: z.string().min(2),
  usn: z.string().min(5),
  collegeEmail: z.string().email(),
  phone: z.string().min(10),
  department: z.string(),
  section: z.string(),
  academicYear: z.number().int().min(1),
  semester: z.number().int().min(1),
  skills: z.array(z.string()),
  interests: z.array(z.string()),
  githubUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  careerGoals: z.string().optional(),
});

router.put("/profile", async (req: AuthRequest, res) => {
  const parse = profileSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error);
  const updated = await StudentProfile.findOneAndUpdate(
    { user: req.user!.uid },
    parse.data,
    { new: true, upsert: true }
  );
  res.json(updated);
});

export default router;