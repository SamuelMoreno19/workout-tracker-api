const express = require('express');
const router = express.Router();

// Importación del controlador de planes de entrenamiento
const {
    getWorkoutPlans,
    getWorkoutPlanById,
    createWorkoutPlan,
    updateWorkoutPlan,
    patchWorkoutPlan,
    deleteWorkoutPlan,
} = require('../../controllers/workoutPlan.controller'); // La ruta al controlador

// Definición de endpoints (Scaffold CRUD)
router.get('/', getWorkoutPlans);          // GET /workout-plans
router.get('/:id', getWorkoutPlanById);    // GET /workout-plans/:id
router.post('/', createWorkoutPlan);       // POST /workout-plans
router.put('/:id', updateWorkoutPlan);     // PUT /workout-plans/:id
router.patch('/:id', patchWorkoutPlan);    // PATCH /workout-plans/:id
router.delete('/:id', deleteWorkoutPlan);  // DELETE /workout-plans/:id


module.exports = router;