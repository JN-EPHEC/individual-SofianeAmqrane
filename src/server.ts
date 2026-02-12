import express from 'express';
import type { Request, Response } from 'express';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/database.js';
import User from './models/User.js';

interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
}

const etudiants: Etudiant[] = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
];

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue sur mon serveur API');
});

app.get('/api/data', (req: Request, res: Response) => {
  res.json(etudiants);
});

app.get('/api/hello/:name', (req: Request<{ name: string }>, res: Response) => {
  const name = req.params.name; // TypeScript sait maintenant que c'est une string
  res.json({
    message: `Bonjour ${name}`,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

sequelize.authenticate()
  .then(() => console.log('Connexion à la DB réussie !'))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('Erreur de connexion :', err.message);
    } else {
      console.error('Erreur de connexion inconnue :', err);
    }
  });

(async () => {
  try {
    const john = await User.create({ nom: 'John', prenom: 'Doe' });
    console.log('Utilisateur ajouté :', john.toJSON());
  } catch (err: any) {
    console.error('Erreur lors de l’ajout de l’utilisateur :', err.message);
  }
})();

sequelize.sync()
  .then(() => {
    console.log('Synchronisation des modèles OK');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('Erreur de sync :', err.message);
    } else {
      console.error('Erreur de sync inconnue :', err);
    }
  });

