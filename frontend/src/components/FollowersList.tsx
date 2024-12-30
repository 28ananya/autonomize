import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Follower {
  login: string;
  avatar_url: string;
}

const FollowersList: React.FC = () => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const username = query.get('username');

  useEffect(() => {
    const fetchFollowers = async () => {
      if (username) {
        try {
          const res = await axios.get(`https://api.github.com/users/${username}/followers`);
          setFollowers(res.data);
        } catch (error) {
          console.error('Error fetching followers:', error);
        }
      }
    };
    fetchFollowers();
  }, [username]);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Followers of {username}:</h3>
      <button
        onClick={() => navigate(`/repositories?username=${username}`)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Back to Repository List
      </button>
      {followers.length === 0 ? (
        <p>No followers found.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {followers.map((follower) => (
            <div
              key={follower.login}
              onClick={() => navigate(`/repositories?username=${follower.login}`)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
              }}
            >
              <img
                src={follower.avatar_url}
                alt={follower.login}
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginBottom: '10px' }}
              />
              <h4 style={{ margin: '10px 0', fontSize: '16px' }}>{follower.login}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowersList;
