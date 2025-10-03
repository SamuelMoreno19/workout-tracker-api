// Datos en memoria (simulación)
let progress = [
    { id: 1, userId: 1, workoutPlanId: 1, date: "2024-01-15", durationMinutes: 58, caloriesBurned: 320, notes: "Buen entrenamiento, sentí progreso en press de banca", createdAt: new Date().toISOString() },
    { id: 2, userId: 1, workoutPlanId: 3, date: "2024-01-16", durationMinutes: 72, caloriesBurned: 450, notes: "Muy exigente, peso muerto pesado", createdAt: new Date().toISOString() },
    { id: 3, userId: 2, workoutPlanId: 2, date: "2024-01-14", durationMinutes: 43, caloriesBurned: 280, notes: "Piernas fuertes, buena técnica", createdAt: new Date().toISOString() },
    { id: 4, userId: 2, workoutPlanId: 6, date: "2024-01-16", durationMinutes: 48, caloriesBurned: 350, notes: "Espalda fuerte, dominadas limpias", createdAt: new Date().toISOString() },
    { id: 5, userId: 3, workoutPlanId: 4, date: "2024-01-13", durationMinutes: 28, caloriesBurned: 190, notes: "Cardio intenso, mantuve ritmo", createdAt: new Date().toISOString() },
    { id: 6, userId: 3, workoutPlanId: 8, date: "2024-01-17", durationMinutes: 24, caloriesBurned: 210, notes: "HIIT agotador, buena resistencia", createdAt: new Date().toISOString() },
    { id: 7, userId: 4, workoutPlanId: 5, date: "2024-01-15", durationMinutes: 38, caloriesBurned: 220, notes: "Core estable, buena postura", createdAt: new Date().toISOString() },
    { id: 8, userId: 4, workoutPlanId: 10, date: "2024-01-16", durationMinutes: 58, caloriesBurned: 150, notes: "Yoga relajante, buena flexibilidad", createdAt: new Date().toISOString() },
    { id: 9, userId: 5, workoutPlanId: 7, date: "2024-01-14", durationMinutes: 32, caloriesBurned: 180, notes: "Buen inicio, técnica mejorando", createdAt: new Date().toISOString() },
    { id: 10, userId: 5, workoutPlanId: 1, date: "2024-01-18", durationMinutes: 65, caloriesBurned: 380, notes: "Full body completo, buena energía", createdAt: new Date().toISOString() },
];


// GET /progress → lista con filtros
const getProgress = (req, res) => {
    const { userId, workoutPlanId, date, limit } = req.query;
    let result = progress;

    if (userId) {
        result = result.filter(p => p.userId === parseInt(userId, 10));
    }
    if (workoutPlanId) {
        result = result.filter(p => p.workoutPlanId === parseInt(workoutPlanId, 10));
    }
    if (date) {
        result = result.filter(p => p.date === date);
    }
    if (limit) {
        result = result.slice(0, Number(limit));
    }

    if (result.length === 0) {
        return res.status(200).json({ message: "No hay registros de progreso disponibles" });
    }

    res.status(200).json(result);
};

// GET /progress/:id → progreso único
const getProgressById = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser numérico" });
    }

    const progressItem = progress.find(p => p.id === id);
    if (!progressItem) return res.status(404).json({ error: "Registro de progreso no encontrado" });

    res.status(200).json(progressItem);
};