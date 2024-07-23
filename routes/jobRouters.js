import * as jobController from "./../controllers/jobController.js";
import * as authController from "./../controllers/authController.js";

import express from "express";

const router = express.Router();

router.use(authController.proetct);

router.route("/").get(jobController.getAllJobs).post(jobController.createJob);
router
    .route("/:id")
    .get(jobController.getJob)
    .delete(jobController.deleteJob)
    .patch(jobController.updateJob);

export default router;
