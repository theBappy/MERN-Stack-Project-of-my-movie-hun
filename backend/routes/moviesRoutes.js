import express from 'express'

const router = express.Router()

// Controllers
import { createMovie, getAllMovies, getSpecificMovie, updateMovie, movieReview, deleteMovie, deleteComment, getNewMovies, getTopMovies, getRandomMovies } from '../controllers/movieController.js'


// Middleware
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'
import checkId from '../middlewares/checkId.js'

// Public routes
router.get("/all-movies", getAllMovies)
router.get("/specific-movie/:id", getSpecificMovie)
router.get("/new-movies", getNewMovies)
router.get("/top-movies", getTopMovies)
router.get("/random-movies", getRandomMovies)


// Restricted routes
router.post("/:id/reviews", authenticate, checkId, movieReview)


// Admin routes
router.post("/create-movie", authenticate, authorizeAdmin, createMovie)
router.put("/update-movie/:id", authenticate, authorizeAdmin, updateMovie)
router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie)
router.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment)

export default router;