const express = require('express');
const router = express.Router();

const {
    getExercises,
    getExerciseById,
    createExercise,
    updateExercise,
    patchExercise, 
    deleteExercise,
} = require('../../controllers/exercise.controller');

// Definición de endpoints (Scaffold CRUD)
router.get('/', getExercises);
router.get('/:id', getExerciseById);
router.post('/', createExercise);
router.put('/:id', updateExercise);
router.patch('/:id', patchExercise);
router.delete('/:id', deleteExercise);


module.exports = router;