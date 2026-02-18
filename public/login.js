document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const role = document.getElementById('role').value;

  if (!role) {
    alert("Veuillez sélectionner un rôle");
    return;
  }

  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, prenom, role })
    });

    if (res.ok) {
      window.location.href = '/home.html';
    } else {
      alert("Erreur lors de la connexion");
    }
  } catch (err) {
    console.error(err);
    alert("Erreur serveur");
  }
});
