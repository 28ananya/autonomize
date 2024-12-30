import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface RepositoryInfo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

const RepositoryDetail: React.FC = () => {
  const { username, repoName } = useParams<{ username: string; repoName: string }>();
  const [details, setDetails] = useState<RepositoryInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepoDetails = async () => {
      if (!username || !repoName) {
        setError('Invalid repository or username.');
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
        setDetails(response.data);
      } catch (err: any) {
        setError(
          err.response?.status === 404
            ? 'Repository not found.'
            : 'Failed to fetch repository details.'
        );
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [username, repoName]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  if (!details) return <div>No details available for this repository.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => navigate(-1)}
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
        Back
      </button>
      <h1>{details.name}</h1>
      <p>{details.description || 'No description available'}</p>
      <p>
        <strong>Stars:</strong> {details.stargazers_count}
      </p>
      <p>
        <strong>Forks:</strong> {details.forks_count}
      </p>
      <p>
        <strong>Language:</strong> {details.language || 'N/A'}
      </p>
    </div>
  );
};

export default RepositoryDetail;
