import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        async function fetchUsers() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('https://jsonplaceholder.typicode.com/users');

                // Vérifier si la réponse est OK
                if (!response.ok) {
                    throw new Error('Erreur HTTP: ${response.status}');
                }

                const data = await response.json();
                setUsers(data);

            } catch (err) {
                setError(err.message);
                console.error('Erreur de fetch:', err);

            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [refreshKey]);

    function handleRefresh() {
        setRefreshKey(k => k + 1);
    }

    return (
        <div>
            <h1>Liste des Utilisateurs</h1>

            <button onClick={handleRefresh}>Rafraîchir</button>

            {loading && <p>Chargement...</p>}

            {error && <p style={{color: 'red'}}>Erreur : {error}</p>}

            {!loading && !error && (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <h3>{user.name}</h3>
                            <p>Email : {user.email}</p>
                            <p>Tél : {user.phone}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
}

export default UserList;