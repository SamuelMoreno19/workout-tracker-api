// Datos en memoria (simulación)
let exercises = [
    { id: 1, name: "Sentadilla con Barra", muscleGroup: "Piernas", category: "Fuerza", difficulty: "Intermedio", createdAt: new Date().toISOString() },
    { id: 2, name: "Press Banca", muscleGroup: "Pecho", category: "Fuerza", difficulty: "Principiante", createdAt: new Date().toISOString() },
    { id: 3, name: "Peso Muerto", muscleGroup: "Espalda", category: "Fuerza", difficulty: "Avanzado", createdAt: new Date().toISOString() },
    { id: 4, name: "Flexiones", muscleGroup: "Pecho", category: "Calistenia", difficulty: "Principiante", createdAt: new Date().toISOString() },
    { id: 5, name: "Dominadas", muscleGroup: "Espalda", category: "Calistenia", difficulty: "Intermedio", createdAt: new Date().toISOString() },
    { id: 6, name: "Curl de Bíceps", muscleGroup: "Brazos", category: "Hipertrofia", difficulty: "Principiante", createdAt: new Date().toISOString() },
    { id: 7, name: "Press Militar", muscleGroup: "Hombros", category: "Fuerza", difficulty: "Intermedio", createdAt: new Date().toISOString() },
    { id: 8, name: "Zancadas", muscleGroup: "Piernas", category: "Fuerza", difficulty: "Principiante", createdAt: new Date().toISOString() },
    { id: 9, name: "Plancha", muscleGroup: "Core", category: "Core", difficulty: "Principiante", createdAt: new Date().toISOString() },
    { id: 10, name: "Burpees", muscleGroup: "Full Body", category: "Cardio", difficulty: "Avanzado", createdAt: new Date().toISOString() },
];

// GET /exercises → lista con filtros
const getExercises = (req, res) => {
    const { muscleGroup, category, difficulty, limit } = req.query;
    let result = exercises;

    if (muscleGroup) {
        result = result.filter(e => e.muscleGroup === muscleGroup);
    }
    if (category) {
        result = result.filter(e => e.category === category);
    }
    if (difficulty) {
        result = result.filter(e => e.difficulty === difficulty);
    }
    if (limit) {
        result = result.slice(0, Number(limit));
    }

    if (result.length === 0) {
        return res.status(200).json({ message: "No hay ejercicios disponibles" });
    }

    res.status(200).json(result);
};

// GET /exercises/:id → ejercicio único
const getExerciseById = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser numérico" });
    }

    const exercise = exercises.find(e => e.id === id);
    if (!exercise) return res.status(404).json({ error: "Ejercicio no encontrado" });

    res.status(200).json(exercise);
};


// POST /exercises → crear ejercicio
const createExercise = (req, res) => {
    const { name, muscleGroup, category, difficulty } = req.body;

    if (!name || !muscleGroup || !category) {
        return res.status(400).json({ error: "Nombre, grupo muscular y categoría son requeridos" });
    }

    const newExercise = {
        id: exercises.length > 0 ? exercises[exercises.length - 1].id + 1 : 1,
        name,
        muscleGroup,
        category,
        difficulty: difficulty || "Principiante",
        createdAt: new Date().toISOString(),
    };

    exercises.push(newExercise);
    res.status(201).json(newExercise);
};