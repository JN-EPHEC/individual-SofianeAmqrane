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
    const { nom, prenom, role } = req.body;
    const user = await User.create({ nom, prenom, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
});


router.patch('/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['etudiant', 'prof', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Rôle invalide' });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    user.role = role;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
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
