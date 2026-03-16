import { useState, useEffect } from 'react';
import './App.css';

// Typage des utilisateurs venant du backend
interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  // Appel API au montage du composant
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.nom} {user.prenom}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;