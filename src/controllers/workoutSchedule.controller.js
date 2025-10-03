// Datos en memoria (simulación)
let workoutSchedules = [
    { id: 1, userId: 1, planId: 1, date: "2024-01-18", startTime: "08:00", durationMinutes: 60, status: "scheduled", createdAt: new Date().toISOString() },
    { id: 2, userId: 2, planId: 2, date: "2024-01-18", startTime: "18:30", durationMinutes: 45, status: "scheduled", createdAt: new Date().toISOString() },
    { id: 3, userId: 1, planId: 3, date: "2024-01-19", startTime: "07:00", durationMinutes: 75, status: "scheduled", createdAt: new Date().toISOString() },
    { id: 4, userId: 3, planId: 4, date: "2024-01-19", startTime: "12:00", durationMinutes: 50, status: "completed", createdAt: new Date().toISOString() },
    { id: 5, userId: 4, planId: 5, date: "2024-01-20", startTime: "09:30", durationMinutes: 40, status: "scheduled", createdAt: new Date().toISOString() },
    { id: 6, userId: 2, planId: 6, date: "2024-01-20", startTime: "17:00", durationMinutes: 55, status: "cancelled", createdAt: new Date().toISOString() },
    { id: 7, userId: 5, planId: 7, date: "2024-01-21", startTime: "08:15", durationMinutes: 65, status: "scheduled", createdAt: new Date().toISOString() },
    { id: 8, userId: 3, planId: 8, date: "2024-01-21", startTime: "19:45", durationMinutes: 70, status: "scheduled", createdAt: new Date().toISOString() },
    { id: 9, userId: 1, planId: 9, date: "2024-01-22", startTime: "06:30", durationMinutes: 80, status: "scheduled", createdAt: new Date().toISOString() },
    { id: 10, userId: 4, planId: 10, date: "2024-01-22", startTime: "20:00", durationMinutes: 45, status: "scheduled", createdAt: new Date().toISOString() },
];

// GET /workout-schedules → lista con filtros
const getWorkoutSchedules = (req, res) => {
    const { userId, status, limit } = req.query;
    let result = workoutSchedules;

    if (userId) {
        result = result.filter(s => s.userId === parseInt(userId, 10));
    }
    if (status) {
        result = result.filter(s => s.status.toLowerCase() === status.toLowerCase());
    }
    if (limit) {
        result = result.slice(0, Number(limit));
    }

    if (result.length === 0) {
        return res.status(200).json({ message: "No hay programaciones disponibles" });
    }

    res.status(200).json(result);
};

// GET /workout-schedules/:id → programación única
const getWorkoutScheduleById = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser numérico" });
    }

    const schedule = workoutSchedules.find(s => s.id === id);
    if (!schedule) return res.status(404).json({ error: "Programación de entrenamiento no encontrada" });

    res.status(200).json(schedule);
};

// POST /workout-schedules → crear programación
const createWorkoutSchedule = (req, res) => {
    const { userId, planId, date, startTime, durationMinutes } = req.body;

    if (!userId || !planId || !date || !startTime || durationMinutes === undefined) {
        return res.status(400).json({ error: "Usuario, plan de entrenamiento, fecha, hora y duración son requeridos" });
    }

    const newSchedule = {
        id: workoutSchedules.length > 0 ? workoutSchedules[workoutSchedules.length - 1].id + 1 : 1,
        userId: parseInt(userId, 10),
        planId: parseInt(planId, 10),
        date,
        startTime,
        durationMinutes: parseInt(durationMinutes, 10),
        status: req.body.status || "scheduled",
        createdAt: new Date().toISOString(),
    };

    workoutSchedules.push(newSchedule);
    res.status(201).json(newSchedule);
};