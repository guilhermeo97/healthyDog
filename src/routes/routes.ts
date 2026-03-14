import type { Request, Response } from "express";
import { Router } from "express";
import CheckConnectionDb from "../database/check-connection";
import SchoolController from "../controllers/school.controller";
import UserController from "../controllers/user.controller";
import GuideDogController from "../controllers/guide-dog.controller";

const router = Router();
const schoolController = new SchoolController();
const userController = new UserController();
const guideController = new GuideDogController();
// Rota de teste
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "🐶 HealthyDog API funcionando!" });
});

router.get("/status", CheckConnectionDb.testConnection);

// Rotas de School

router.get(
  "/school/all/:status",
  schoolController.getSchools.bind(schoolController),
);

router.get(
  "/school/:id",
  schoolController.getSchoolById.bind(schoolController),
);
router.patch(
  "/school/:id",
  schoolController.updateSchool.bind(schoolController),
);

router.post("/school", schoolController.create.bind(schoolController));
router.delete(
  "/school/:id",
  schoolController.deleteSchool.bind(schoolController),
);

// Rotas de User
router.get("/user/all/:status", userController.getUsers.bind(userController));
router.get("/user/:id", userController.getUserById.bind(userController));
router.post("/user", userController.createUser.bind(userController));
router.patch("/user/:id", userController.updateUser.bind(userController));
router.delete("/user/:id", userController.deleteUser.bind(userController));

router.get(
  "/guidedog/all/:status",
  guideController.getGuideDogs.bind(guideController),
);
router.get(
  "/guidedog/:id",
  guideController.getGuideDogById.bind(guideController),
);
router.post("/guidedog", guideController.createGuideDog.bind(guideController));
router.patch(
  "/guidedog/:id",
  guideController.updateGuideDog.bind(guideController),
);
router.delete(
  "/guidedog/:id",
  guideController.deleteGuideDog.bind(guideController),
);

export { router };
