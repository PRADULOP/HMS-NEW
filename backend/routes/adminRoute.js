// import express from 'express'; 
// import { loginAdmin, appointmentsAdmin, appointmentCancel, addDoctor, allDoctors, adminDashboard,deleteDoctor } from '../controllers/adminController.js'; 
// import { changeAvailablity } from '../controllers/doctorController.js'; 
// import authAdmin from '../middleware/authAdmin.js'; 
// import upload from '../config/multer.js'; 
// const adminRouter = express.Router(); 
 
// adminRouter.post("/login", loginAdmin) 
// adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor) 
// adminRouter.get("/appointments", authAdmin, appointmentsAdmin) 
// adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel) 
// adminRouter.get("/all-doctors", authAdmin, allDoctors) 
// adminRouter.post("/change-availability", authAdmin, changeAvailablity) 
// adminRouter.get("/dashboard", authAdmin, adminDashboard) 

// // Delete doctor 
// adminRouter.delete("/delete-doctor/:doctorId", authAdmin, deleteDoctor); 
// export default adminRouter;

import express from 'express';
import { loginAdmin, appointmentsAdmin, appointmentCancel, addDoctor, allDoctors,updateDoctor,deleteDoctor, getDoctorById,adminDashboard } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/doctorController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../config/multer.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
adminRouter.put("/update-doctor/:id", authAdmin, upload.single('image'), updateDoctor)
adminRouter.delete("/delete-doctor/:id",authAdmin, deleteDoctor)
adminRouter.get("/doctor/:id", authAdmin, getDoctorById);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/all-doctors", authAdmin, allDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;

