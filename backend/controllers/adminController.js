import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import fs from 'fs';


// API for admin login
const loginAdmin = async (req, res) => {
  try {
      const { email, password } = req.body;
      
      // Find user by email
      const user = await userModel.findOne({ email });
      
      // Check if user exists
      if (!user) {
          return res.json({ success: false, message: "User does not exist" });
      }
      
      // Check if user has admin role
      if (user.role !== 'admin') {
          return res.json({ success: false, message: "Access denied: Admin privileges required" });
      }
      
      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (isMatch) {
          // Create token with user ID and role
          const token = jwt.sign(
              { id: user._id, role: user.role },
              process.env.JWT_SECRET
          );

          console.log("Generated Token:", token);
          
          // Return success response with token and role
          res.json({ 
              success: true, 
              token,
              role: user.role
          });
      } else {
          res.json({ success: false, message: "Invalid credentials" });
      }
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};


// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}



const addDoctor = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // ✅ Check all required fields
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // ✅ Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    // ✅ Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(409).json({ success: false, message: "A doctor with this email already exists" });
    }

    // ✅ Password strength validation
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // ✅ Image upload check
    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Doctor profile image is required" });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Parse address safely
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch (error) {
      return res.status(400).json({ success: false, message: "Address must be a valid JSON string" });
    }

    // ✅ Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      folder: "doctor_images"
    });
    console.log('Uploaded to Cloudinary:', imageUpload);

    const imageUrl = imageUpload.secure_url;

    // ✅ Remove local file after upload
    if (imageFile.path && fs.existsSync(imageFile.path)) {
      fs.unlinkSync(imageFile.path);
    }

    // ✅ Construct doctor data object
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      date: Date.now()
    };

    // ✅ Save doctor to MongoDB
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    // ✅ Success response
    return res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor: {
        _id: newDoctor._id,
        name: newDoctor.name,
        email: newDoctor.email,
        speciality: newDoctor.speciality
      }
    });

  } catch (error) {
    console.error("Error adding doctor:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};



// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {

    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getDoctorById = async (req, res) => {
  console.log("inside getDoctorById function")
  try {
      const { id } = req.params; // Get doctor ID from request parameters

      const doctor = await doctorModel.findById(id).select('-password'); // Find doctor by ID

      if (!doctor) {
          return res.status(404).json({ success: false, message: "Doctor not found" });
      }

      res.json({ success: true, doctor });

  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
  }
};

const updateDoctor = async (req, res) => {
  console.log("inside updateDoctor function")
  try {
    console.log("Update Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { id } = req.params;
    const { name, email, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // ✅ Find doctor by ID
    let doctor = await doctorModel.findById(id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // ✅ Validate email format if updated
    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    // ✅ Parse address safely if updated
    let parsedAddress = doctor.address;
    if (address) {
      try {
        parsedAddress = JSON.parse(address);
      } catch (error) {
        return res.status(400).json({ success: false, message: "Address must be a valid JSON string" });
      }
    }

    // ✅ Handle Image Upload if provided
    let imageUrl = doctor.image;
    if (imageFile) {
      // Upload new image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: "doctor_images"
      });

      // ✅ Delete old image from Cloudinary
      if (doctor.image) {
        const oldImagePublicId = doctor.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`doctor_images/${oldImagePublicId}`);
      }

      imageUrl = imageUpload.secure_url;

      // ✅ Remove local file after upload
      if (fs.existsSync(imageFile.path)) {
        fs.unlinkSync(imageFile.path);
      }
    }

    // ✅ Update doctor data
    doctor.name = name || doctor.name;
    doctor.email = email || doctor.email;
    doctor.speciality = speciality || doctor.speciality;
    doctor.degree = degree || doctor.degree;
    doctor.experience = experience || doctor.experience;
    doctor.about = about || doctor.about;
    doctor.fees = fees || doctor.fees;
    doctor.address = parsedAddress;
    doctor.image = imageUrl;

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      doctor
    });

  } catch (error) {
    console.error("Error updating doctor:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const deleteDoctor = async (req, res) => {
  console.log("inside deleteDoctor function")
  try {
    const { id } = req.params;

    // ✅ Find doctor by ID
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // ✅ Delete doctor image from Cloudinary
    if (doctor.image) {
      const oldImagePublicId = doctor.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`doctor_images/${oldImagePublicId}`);
    }

    // ✅ Delete doctor from database
    await doctorModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Doctor deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting doctor:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

export {
    loginAdmin,
    appointmentsAdmin,
    appointmentCancel,
    addDoctor,
    allDoctors,
    getDoctorById,
    adminDashboard,updateDoctor,deleteDoctor
}