const express= require("express")
const { createCrewMember, getAllCrew, getCrewMember, editCrewMember, deleteCreMember } = require("../controllers/crewController")
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth")
const router=express.Router()


router.post('/admin/newcrewmember',isAuthenticatedUser,isAdmin,createCrewMember)
router.get('/admin/allcrew',isAuthenticatedUser,isAdmin, getAllCrew)
router.put('/admin/editcrew/:id',isAuthenticatedUser,isAdmin,editCrewMember)
router.delete('/admin/deletecrew/:id',isAuthenticatedUser,isAdmin,deleteCreMember)
router.get('/crewmember/:id',getCrewMember)

module.exports=router