import express from 'express';
import User from '../models/User.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nom, prenom } = req.body;
        const user = await User.create({ nom, prenom });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deleted = await User.destroy({ where: { id } });
        if (deleted) res.json({ message: 'Utilisateur supprimé' });
        else res.status(404).json({ error: 'Utilisateur non trouvé' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
});

export default router;
