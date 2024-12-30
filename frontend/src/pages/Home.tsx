import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (username.trim()) {
      navigate(`/repositories?username=${username}`); // Navigate to the repositories route with the username as a query parameter
    }
  };

  return (
    <div>
      <h1>GitHub Repository Viewer</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Home;
