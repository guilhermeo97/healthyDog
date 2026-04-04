import type { Request, Response } from "express";
import { Router } from "express";
import CheckConnectionDb from "../database/check-connection";
import SchoolController from "../controllers/school.controller";
import UserController from "../controllers/user.controller";
import GuideDogController from "../controllers/guide-dog.controller";
import MedicationController from "../controllers/medication.controller";
import MedicalConsultationController from "../controllers/medical-consultation.controller";

const router = Router();
const schoolController = new SchoolController();
const userController = new UserController();
const guideController = new GuideDogController();
const medicationController = new MedicationController();
const medicalConsultationController = new MedicalConsultationController();

// Test's route
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "🐶 HealthyDog API funcionando!" });
});

router.get("/status", CheckConnectionDb.testConnection);

// School's routes

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

// User's routes
router.get("/user/all/:status", userController.getUsers.bind(userController));
router.get("/user/:id", userController.getUserById.bind(userController));
router.post("/user", userController.createUser.bind(userController));
router.patch("/user/:id", userController.updateUser.bind(userController));
router.delete("/user/:id", userController.deleteUser.bind(userController));

// Guide dog's routes

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

// Medication's routes
router.post(
  "/medication",
  medicationController.createMedication.bind(medicationController),
);
router.get(
  "/medication/all",
  medicationController.getAllMedications.bind(medicationController),
);
router.get(
  "/medication/:id",
  medicationController.getMedicationById.bind(medicationController),
);
router.patch(
  "/medication/:id",
  medicationController.updateMedication.bind(medicationController),
);
router.delete(
  "/medication/:id",
  medicationController.deleteMedication.bind(medicationController),
);

// Medical consultation's routes
router.post(
  "/medical-consultation",
  medicalConsultationController.create.bind(medicalConsultationController),
);
router.get(
  "/medical-consultation/all",
  medicalConsultationController.getMedicalConsultations.bind(
    medicalConsultationController,
  ),
);
router.get(
  "/medical-consultation/:id",
  medicalConsultationController.getMedicalConsultationById.bind(
    medicalConsultationController,
  ),
);
router.patch(
  "/medical-consultation/:id",
  medicalConsultationController.updateMedicalConsultation.bind(
    medicalConsultationController,
  ),
);
router.delete(
  "/medical-consultation/:id",
  medicalConsultationController.deleteMedicalConsultation.bind(
    medicalConsultationController,
  ),
);

export { router };
