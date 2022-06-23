const express = require("express")
const router = express.Router()
const { createTheatre, getAllTheatre, getTheatreDetail, updateTheatre, deleteTheatre, getTheatres } = require("../controllers/theatreContoller")
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth")



router.post("/admin/newtheatre", isAuthenticatedUser, isAdmin, createTheatre)
router.get('/admin/alltheatre', isAuthenticatedUser, isAdmin, getAllTheatre)
router.get('/admin/theatre/:id', getTheatreDetail)
router.put('/admin/theatre/:id', isAuthenticatedUser, isAdmin, updateTheatre)
router.delete('/admin/theatre/:id', isAuthenticatedUser, isAdmin, deleteTheatre)

router.get('/theatres', getTheatres)

module.exports = router