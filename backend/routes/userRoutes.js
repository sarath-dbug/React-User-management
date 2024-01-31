import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { multerUploadUserProfile } from '../config/multerConfig.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', loginUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(multerUploadUserProfile.single('profileImageName'),protect, updateUserProfile);
 

export default router;