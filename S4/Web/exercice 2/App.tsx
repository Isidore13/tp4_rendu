import { useEffect, useState } from "react";
import {
    Routes,
    Route,
    Link,
    useParams,
} from "react-router-dom";

/* =========================
   Header (Navigation commune)
========================= */
function Header() {
    return (
        <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
            <nav style={{ display: "flex", gap: "1rem" }}>
                <Link to="/">Accueil</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/about">À propos</Link>
            </nav>
        </header>
    );
}

/* =========================
   Page 1 : Accueil (/)
========================= */
function Home() {
    return (
        <div style={{ padding: "1rem" }}>
            <h1>Bienvenue sur mon application</h1>
            <p>
                <Link to="/posts">Voir la liste des posts</Link>
            </p>
            <p>
                <Link to="/about">À propos</Link>
            </p>
        </div>
    );
}

/* =========================
   Page 2 : Liste des Posts (/posts)
========================= */
function PostList() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.slice(0, 10)); // 10 premiers posts
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Liste des Posts</h2>

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link to={`/posts/${post.id}`}>
                                {post.id} - {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            <br />
            <Link to="/">⬅ Retour à l'accueil</Link>
        </div>
    );
}

/* =========================
   Page 3 : Détail d'un Post (/posts/:id)
========================= */
function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        setLoading(true);

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                setLoading(false);
            });
    }, [id]); // dépendance sur l'ID

    return (
        <div style={{ padding: "1rem" }}>
            {loading ? (
                <p>Chargement du post...</p>
            ) : post ? (
                <>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </>
            ) : (
                <p>Post introuvable.</p>
            )}

            <br />
            <Link to="/posts">⬅ Retour à la liste des posts</Link>
        </div>
    );
}

/* =========================
   Page 4 : À Propos (/about)
========================= */
function About() {
    return (
        <div style={{ padding: "1rem" }}>
            <h2>À propos</h2>
            <p>
                Cette application React démontre l'utilisation de React Router,
                le fetch d'API et la gestion des états de chargement.
            </p>

            <br />
            <Link to="/">⬅ Retour à l'accueil</Link>
        </div>
    );
}

/* =========================
   Page 404 : Non Trouvée (*)
========================= */
function NotFound() {
    return (
        <div style={{ padding: "1rem" }}>
            <h2>404 - Page non trouvée</h2>
            <Link to="/">Retour à l'accueil</Link>
        </div>
    );
}

/* =========================
   App principale
========================= */
function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;