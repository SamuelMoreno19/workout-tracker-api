// Datos en memoria (simulación)
let reports = [
    { id: 1, userId: 1, workoutPlanId: 1, scheduleId: 1, date: "2024-01-15", totalDuration: 58, caloriesBurned: 320, notes: "Full Body exitoso. Sentí gran progreso en press de banca.", createdAt: new Date().toISOString() },
    { id: 2, userId: 1, workoutPlanId: 3, scheduleId: 3, date: "2024-01-16", totalDuration: 72, caloriesBurned: 450, notes: "Push Pull Legs intenso. Mejor marca personal en peso muerto.", createdAt: new Date().toISOString() },
    { id: 3, userId: 2, workoutPlanId: 2, scheduleId: 2, date: "2024-01-14", totalDuration: 43, caloriesBurned: 280, notes: "Piernas intensas. Foco en sentadilla profunda.", createdAt: new Date().toISOString() },
    { id: 4, userId: 2, workoutPlanId: 6, scheduleId: 6, date: "2024-01-16", totalDuration: 48, caloriesBurned: 350, notes: "Espalda fuerte. Dominadas con lastre exitosas.", createdAt: new Date().toISOString() },
    { id: 5, userId: 3, workoutPlanId: 4, scheduleId: 4, date: "2024-01-13", totalDuration: 28, caloriesBurned: 190, notes: "Cardio intenso. Mantuve ritmo constante.", createdAt: new Date().toISOString() },
    { id: 6, userId: 3, workoutPlanId: 8, scheduleId: 8, date: "2024-01-17", totalDuration: 24, caloriesBurned: 210, notes: "Entrenamiento de potencia. HIIT agotador.", createdAt: new Date().toISOString() },
    { id: 7, userId: 4, workoutPlanId: 5, scheduleId: 5, date: "2024-01-15", totalDuration: 38, caloriesBurned: 220, notes: "Rutina de Core. Buena estabilidad y postura.", createdAt: new Date().toISOString() },
    { id: 8, userId: 4, workoutPlanId: 10, scheduleId: 10, date: "2024-01-16", totalDuration: 58, caloriesBurned: 150, notes: "Brazos Definidos. Yoga relajante y efectivo.", createdAt: new Date().toISOString() },
    { id: 9, userId: 5, workoutPlanId: 7, scheduleId: 7, date: "2024-01-14", totalDuration: 32, caloriesBurned: 180, notes: "Glúteos y Piernas. Buen inicio, técnica mejorando.", createdAt: new Date().toISOString() },
    { id: 10, userId: 1, workoutPlanId: 9, scheduleId: 9, date: "2024-01-22", totalDuration: 80, caloriesBurned: 520, notes: "Resistencia Funcional. Sesión completa y demandante.", createdAt: new Date().toISOString() },
];

// GET /reports → lista con filtros
const getReports = (req, res) => {
    const { userId, workoutPlanId, date, limit } = req.query;
    let result = reports;

    if (userId) {
        result = result.filter(r => r.userId === parseInt(userId, 10));
    }
    if (workoutPlanId) {
        result = result.filter(r => r.workoutPlanId === parseInt(workoutPlanId, 10));
    }
    if (date) {
        result = result.filter(r => r.date === date);
    }
    if (limit) {
        result = result.slice(0, Number(limit));
    }

    if (result.length === 0) {
        return res.status(200).json({ message: "No hay reportes disponibles" });
    }

    res.status(200).json(result);
};

// GET /reports/:id → reporte único
const getReportById = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser numérico" });
    }

    const report = reports.find(r => r.id === id);
    if (!report) return res.status(404).json({ error: "Reporte no encontrado" });

    res.status(200).json(report);
};

// POST /reports → crear reporte
const createReport = (req, res) => {
    const { userId, workoutPlanId, scheduleId, date, totalDuration, caloriesBurned, notes } = req.body;

    if (!userId || !workoutPlanId || !scheduleId || !date || !totalDuration) {
        return res.status(400).json({ error: "Usuario, plan de entrenamiento, programación, fecha y duración total son requeridos" });
    }

    const newReport = {
        id: reports.length > 0 ? reports[reports.length - 1].id + 1 : 1,
        userId: parseInt(userId, 10),
        workoutPlanId: parseInt(workoutPlanId, 10),
        scheduleId: parseInt(scheduleId, 10),
        date,
        totalDuration: parseInt(totalDuration, 10),
        caloriesBurned: caloriesBurned || 0,
        notes: notes || "",
        createdAt: new Date().toISOString(),
    };

    reports.push(newReport);
    res.status(201).json(newReport);
};
