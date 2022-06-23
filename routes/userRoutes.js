const express = require('express');
const router = express.Router();
const {
    registerUser,
    userLogin,
    userLogout,
    getUserDetail,
    changeUserPassword,
    updateUserDetail,
    forgotPassword,
    resetPassword,
    getAllusers,
    getSingleUser,
    editUser,
    deleteUser,
    changeUserLocation
} = require('../controllers/userController');
const { isAdmin, isAuthenticatedUser } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', userLogin);
router.get('/logout', userLogout);
router.get('/myprofile', isAuthenticatedUser, getUserDetail);
router.put('/changepassword', isAuthenticatedUser, changeUserPassword);
router.put('/updateprofile', isAuthenticatedUser, updateUserDetail);
router.put('/user/location',isAuthenticatedUser, changeUserLocation);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);


// ADMIN

router.get('/admin/allusers', isAuthenticatedUser, isAdmin, getAllusers);
router.get('/admin/user/:id', isAuthenticatedUser, isAdmin, getSingleUser);
router.put('/admin/edituser/:id', isAuthenticatedUser, isAdmin, editUser);
router.delete('/admin/deleteuser/:id', isAuthenticatedUser, isAdmin, deleteUser);

module.exports = router;
