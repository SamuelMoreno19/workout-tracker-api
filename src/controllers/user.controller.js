// Datos en memoria (simulación)
let users = [
    { id: 1, name: "Samuel Moreno", email: "samuel@example.com", role: "user", createdAt: new Date().toISOString() },
    { id: 2, name: "Laura Gómez", email: "laura@example.com", role: "admin", createdAt: new Date().toISOString() },
    { id: 3, name: "Andrés Pérez", email: "andresp@example.com", role: "user", createdAt: new Date().toISOString() },
    { id: 4, name: "Camila Torres", email: "camilat@example.com", role: "admin", createdAt: new Date().toISOString() },
    { id: 5, name: "Diego Ramírez", email: "diegor@example.com", role: "user", createdAt: new Date().toISOString() },
    { id: 6, name: "Valentina Ruiz", email: "valenruiz@example.com", role: "user", createdAt: new Date().toISOString() },
    { id: 7, name: "Mateo Cárdenas", email: "mateoc@example.com", role: "admin", createdAt: new Date().toISOString() },
    { id: 8, name: "Juliana López", email: "julil@example.com", role: "user", createdAt: new Date().toISOString() },
    { id: 9, name: "Esteban Hernández", email: "estebanh@example.com", role: "user", createdAt: new Date().toISOString() },
    { id: 10, name: "Sofía Castillo", email: "sofiac@example.com", role: "admin", createdAt: new Date().toISOString() },
];

// GET /users → lista con filtros
const getUsers = (req, res) => {
    const { role, search, limit } = req.query;
    let result = users;

    if (role) {
        result = result.filter(u => u.role === role);
    }
    if (search) {
        result = result.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (limit) {
        result = result.slice(0, Number(limit));
    }

    if (result.length === 0) {
        return res.status(200).json({ message: "No hay usuarios disponibles" });
    }

    res.status(200).json(result);
};

// GET /users/:id → usuario único
const getUserById = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: "El ID debe ser numérico" });
    }

    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json(user);
};

// POST /users → crear usuario
const createUser = (req, res) => {
    const { name, email, role } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Nombre y email son requeridos" });
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email,
        role: role || "user",
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

// PUT /users/:id → actualización total
const updateUser = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, email, role } = req.body;

    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

    if (!name || !email) {
        return res.status(400).json({ error: "Nombre y email son requeridos para actualización completa" });
    }

    users[index] = { ...users[index], name, email, role };
    res.status(200).json(users[index]);
};

// PATCH /users/:id → actualización parcial
const patchUser = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, email, role } = req.body;

    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

    users[index] = { ...users[index], ...(name && { name }), ...(email && { email }), ...(role && { role }) };
    res.status(200).json(users[index]);
};

// DELETE /users/:id → eliminación
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

    users.splice(index, 1);
    res.status(204).send(); // 204 No Content
};

// Exportar controladores
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
};
