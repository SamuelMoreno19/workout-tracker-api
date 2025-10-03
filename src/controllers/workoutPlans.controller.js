// Datos en memoria (simulación)
let workoutPlans = [
    { id: 1, userId: 1, name: "Full Body Semanal", dateCreated: "2024-01-15", exercisesCount: 5, createdAt: new Date().toISOString() },
    { id: 2, userId: 2, name: "Piernas y Hombros", dateCreated: "2024-01-14", exercisesCount: 4, createdAt: new Date().toISOString() },
    { id: 3, userId: 1, name: "Push Pull Legs", dateCreated: "2024-01-13", exercisesCount: 6, createdAt: new Date().toISOString() },
    { id: 4, userId: 3, name: "Cardio Intensivo", dateCreated: "2024-01-12", exercisesCount: 3, createdAt: new Date().toISOString() },
    { id: 5, userId: 4, name: "Rutina de Core", dateCreated: "2024-01-11", exercisesCount: 4, createdAt: new Date().toISOString() },
    { id: 6, userId: 2, name: "Espalda Fuerte", dateCreated: "2024-01-10", exercisesCount: 5, createdAt: new Date().toISOString() },
    { id: 7, userId: 5, name: "Glúteos y Piernas", dateCreated: "2024-01-09", exercisesCount: 4, createdAt: new Date().toISOString() },
    { id: 8, userId: 3, name: "Entrenamiento de Potencia", dateCreated: "2024-01-08", exercisesCount: 6, createdAt: new Date().toISOString() },
    { id: 9, userId: 1, name: "Resistencia Funcional", dateCreated: "2024-01-07", exercisesCount: 5, createdAt: new Date().toISOString() },
    { id: 10, userId: 4, name: "Brazos Definidos", dateCreated: "2024-01-06", exercisesCount: 4, createdAt: new Date().toISOString() },
];

// GET /workout-plans → lista con filtros
const getWorkoutPlans = (req, res) => {
    const { userId, limit } = req.query;
    let result = workoutPlans;

    if (userId) {
        result = result.filter(p => p.userId === parseInt(userId, 10));
    }
    if (limit) {
        result = result.slice(0, Number(limit));
    }

    if (result.length === 0) {
        return res.status(200).json({ message: "No hay planes de entrenamiento disponibles" });
    }

    res.status(200).json(result);
};

// GET /workout-plans/:id → plan único
const getWorkoutPlanById = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser numérico" });
    }

    const plan = workoutPlans.find(p => p.id === id);
    if (!plan) return res.status(404).json({ error: "Plan de entrenamiento no encontrado" });

    res.status(200).json(plan);
};

// POST /workout-plans → crear plan
const createWorkoutPlan = (req, res) => {
    const { userId, name } = req.body;

    if (!userId || !name) {
        return res.status(400).json({ error: "ID de usuario y nombre son requeridos" });
    }

    const newPlan = {
        id: workoutPlans.length > 0 ? workoutPlans[workoutPlans.length - 1].id + 1 : 1,
        userId: parseInt(userId, 10),
        name,
        dateCreated: new Date().toISOString().split('T')[0],
        exercisesCount: 0,
        createdAt: new Date().toISOString(),
    };

    workoutPlans.push(newPlan);
    res.status(201).json(newPlan);
};

// PUT /workout-plans/:id → actualización total
const updateWorkoutPlan = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { userId, name } = req.body;

    const index = workoutPlans.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Plan de entrenamiento no encontrado" });

    if (!userId || !name) {
        return res.status(400).json({ error: "ID de usuario y nombre son requeridos para actualización completa" });
    }

    workoutPlans[index] = { ...workoutPlans[index], userId: parseInt(userId, 10), name };
    res.status(200).json(workoutPlans[index]);
};

// PATCH /workout-plans/:id → actualización parcial
const patchWorkoutPlan = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { userId, name } = req.body;

    const index = workoutPlans.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Plan de entrenamiento no encontrado" });

    workoutPlans[index] = { ...workoutPlans[index], ...(userId && { userId: parseInt(userId, 10) }), ...(name && { name }) };
    res.status(200).json(workoutPlans[index]);
};

// DELETE /workout-plans/:id → eliminación
const deleteWorkoutPlan = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = workoutPlans.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ error: "Plan de entrenamiento no encontrado" });

    workoutPlans.splice(index, 1);
    res.status(204).send();
};

// Exportar controladores
module.exports = {
    getWorkoutPlans,
    getWorkoutPlanById,
    createWorkoutPlan,
    updateWorkoutPlan,
    patchWorkoutPlan,
    deleteWorkoutPlan,
};