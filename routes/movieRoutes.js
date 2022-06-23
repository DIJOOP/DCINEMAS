const express = require('express');
const { createNewMovie, getAllMovie, getmoviedDetail, updateMovie, deleteMovie, createMovieReview, searchMovies } = require('../controllers/movieController');
const { isAdmin, isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();



router.post('/admin/newmovie', isAuthenticatedUser, isAdmin, createNewMovie);
router.get('/admin/allmovies', getAllMovie);
router.get('/movie/:id',getmoviedDetail)
router.post('/movie/addreview',isAuthenticatedUser,createMovieReview)
router.post('/movies/search/:keyword',searchMovies)

router.put('/admin/movie/:id',isAuthenticatedUser,isAdmin,updateMovie)
router.delete('/admin/movie/:id',isAuthenticatedUser,isAdmin,deleteMovie)
module.exports = router;
