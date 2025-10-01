const express = require('express');
const router = express.Router();

//Estado en memoria (simulacion)
let users = [
    {
        id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
        name: "Samuel Morneo",
        email: "samuelmorneau@example.com",
        role: "user",
        createdAt: "2025-09-12T12:00:00Z",
    }
];


//GET /api/v1/users
router.get('/', (req, res) => {
    res.status(200).json(users);
});


//GET users/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
});

// POST /users
router.post('/', (req, res) => {
    const { name, email, role } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name y email son requeridos' });
    }

    const newUser = {
        id: `${Date.now()}`, // id temporal (puedes usar uuid)
        name,
        email,
        role: role || 'user',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

// PUT /users/:id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (!name || !email) {
        return res.status(400).json({ error: 'Name y email son requeridos' });
    }

    users[index] = {
        ...users[index],
        name,
        email,
        role
    };

    res.status(200).json(users[index]);
});



module.exports = router;
