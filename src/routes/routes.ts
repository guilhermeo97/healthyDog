import type { Request, Response } from "express";
import { Router } from "express";
import CheckConnectionDb from "../database/check-connection";
import SchoolController from "../controllers/school.controller";

const router = Router();
const schoolController = new SchoolController();
// Rota de teste
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "🐶 HealthyDog API funcionando!" });
});

router.get("/status", CheckConnectionDb.testConnection);

// Rotas de School

router.get(
  "/school/all/:status",
  schoolController.getSchools.bind(schoolController)
);

router.get(
  "/school/:id",
  schoolController.getSchoolById.bind(schoolController)
);
router.patch(
  "/school/:id",
  schoolController.updateSchool.bind(schoolController)
);

router.post("/school", schoolController.create.bind(schoolController));
router.delete(
  "/school/:id",
  schoolController.deleteSchool.bind(schoolController)
);

// Rotas de User

export { router };
