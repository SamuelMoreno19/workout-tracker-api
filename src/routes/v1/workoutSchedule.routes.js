const express = require('express');
const router = express.Router();

const {
    getWorkoutSchedules,
    getWorkoutScheduleById,
    createWorkoutSchedule,
    updateWorkoutSchedule,
    patchWorkoutSchedule,
    deleteWorkoutSchedule,
} = require('../../controllers/workoutSchedule.controller');

// Definición de endpoints (Scaffold CRUD)
router.get('/', getWorkoutSchedules);
router.get('/:id', getWorkoutScheduleById);
router.post('/', createWorkoutSchedule);
router.put('/:id', updateWorkoutSchedule);
router.patch('/:id', patchWorkoutSchedule);
router.delete('/:id', deleteWorkoutSchedule);


module.exports = router;