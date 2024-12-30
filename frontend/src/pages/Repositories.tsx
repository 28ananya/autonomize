import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Repository {
  name: string;
  description: string;
}

interface User {
  avatar_url: string;
  name: string;
  bio: string;
}

const Repositories: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const username = query.get('username');

  const fetchUserData = async (username: string) => {
    try {
      setLoading(true);
      const userRes = await axios.get(`https://api.github.com/users/${username}`);
      const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`);
      setUser(userRes.data);
      setRepos(reposRes.data);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserData(username);
    }
  }, [username]);

  if (!username) return <div>No username provided.</div>;

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {user && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <img
            src={user.avatar_url}
            alt={user.name}
            width={100}
            style={{ borderRadius: '50%' }}
          />
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <button
            onClick={() => navigate(`/followers?username=${username}`)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            View Followers
          </button>
        </div>
      )}
      <h3>Repositories:</h3>
      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {repos.map((repo) => (
            <div
              key={repo.name}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/repository/${username}/${repo.name}`)} // Navigate to new page
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt={repo.name}
                style={{ width: '50px', height: '50px', marginBottom: '10px' }}
              />
              <h4 style={{ margin: '10px 0', fontSize: '16px' }}>{repo.name}</h4>
              <p style={{ fontSize: '14px', color: '#555' }}>
                {repo.description || 'No description available'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Repositories;
