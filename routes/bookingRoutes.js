const express= require("express")
const {newBooking, myBookings, allBooking, deleteBooking}=require("../controllers/bookingController")
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth")
const router=express.Router()


router.post("/booking/new",isAuthenticatedUser,newBooking)
router.get("/booking/me",isAuthenticatedUser,myBookings)

router.get("/admin/bookings",isAuthenticatedUser,isAdmin,allBooking)
router.delete("/admin/booking/delete/:id",isAuthenticatedUser,deleteBooking)


module.exports=router