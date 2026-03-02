import { useEffect, useState } from "react";
import {
    Routes,
    Route,
    Link,
    useParams,
    useNavigate,
} from "react-router-dom";

/* =========================
   Types
========================= */
interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

/* =========================
   Header
========================= */
function Header() {
    return (
        <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
            <nav style={{ display: "flex", gap: "1rem" }}>
                <Link to="/">Annuaire</Link>
            </nav>
        </header>
    );
}

/* =========================
   Page 1 : Liste des Utilisateurs (/)
========================= */
function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data: User[]) => {
                setUsers(data);
                setLoading(false);
            });
    }, []);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Annuaire des Utilisateurs</h1>

            <p>Total utilisateurs : {users.length}</p>

            <input
                type="text"
                placeholder="Rechercher par nom..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <ul>
                    {filteredUsers.map((user) => (
                        <li key={user.id}>
                            <Link to={`/users/${user.id}`}>
                                {user.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/* =========================
   Page 2 : Profil Utilisateur (/users/:id)
========================= */
function UserProfile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                const [userRes, postsRes] = await Promise.all([
                    fetch(`https://jsonplaceholder.typicode.com/users/${id}`),
                    fetch(
                        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
                    ),
                ]);

                const userData = await userRes.json();
                const postsData = await postsRes.json();

                // JSONPlaceholder peut retourner {}
                if (!userData.id) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }

                setUser(userData);
                setPosts(postsData);
                setLoading(false);
            } catch (error) {
                setNotFound(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <p style={{ padding: "1rem" }}>Chargement...</p>;

    if (notFound)
        return (
            <div style={{ padding: "1rem" }}>
                <h2>Utilisateur introuvable</h2>
                <Link to="/">Retour à l'annuaire</Link>
            </div>
        );

    if (!user) return null;

    return (
        <div style={{ padding: "1rem" }}>
            <h2>{user.name}</h2>
            <p>Email : {user.email}</p>
            <p>Téléphone : {user.phone}</p>
            <p>Site : {user.website}</p>

            <h3>Posts ({posts.length})</h3>

            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>

            <br />
            <button onClick={() => navigate("/")}>
                Retour à l'annuaire
            </button>
        </div>
    );
}

/* =========================
   Page 3 : Détail d'un Post (/posts/:id)
========================= */
function PostDetail() {
    const { id } = useParams();

    const [post, setPost] = useState<Post | null>(null);
    const [author, setAuthor] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchPost = async () => {
            try {
                setLoading(true);

                const postRes = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${id}`
                );
                const postData = await postRes.json();

                if (!postData.id) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }

                const userRes = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${postData.userId}`
                );
                const userData = await userRes.json();

                setPost(postData);
                setAuthor(userData);
                setLoading(false);
            } catch {
                setNotFound(true);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p style={{ padding: "1rem" }}>Chargement...</p>;

    if (notFound)
        return (
            <div style={{ padding: "1rem" }}>
                <h2>Post introuvable</h2>
                <Link to="/">Retour à l'accueil</Link>
            </div>
        );

    if (!post || !author) return null;

    return (
        <div style={{ padding: "1rem" }}>
            {/* Breadcrumb */}
            <nav>
                <Link to="/">Accueil</Link> /{" "}
                <Link to={`/users/${author.id}`}>
                    {author.name}
                </Link>{" "}
                / {post.title}
            </nav>

            <h2>{post.title}</h2>
            <p>{post.body}</p>

            <br />
            <Link to={`/users/${author.id}`}>
                Retour au profil de {author.name}
            </Link>
        </div>
    );
}

/* =========================
   Routes
========================= */
function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/users/:id" element={<UserProfile />} />
                <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
        </>
    );
}

export default App;