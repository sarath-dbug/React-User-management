import express from 'express'
const router = express.Router();
import { protect } from '../middleware/adminAuthMiddleware.js';


import {
    authAdmin,
    logoutAdmin,
    getAllUser,
    updateUserData,
    deleteUser,
    addNewUser
}from '../controllers/adminController.js'


router.post('/auth',authAdmin)
router.post('/logout',logoutAdmin)
router.post('/get-user',protect,getAllUser)
router.put('/update-user',updateUserData)
router.delete('/delete-user',deleteUser)
router.post('/add-user',addNewUser)





 export default router