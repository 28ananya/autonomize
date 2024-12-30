import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Repositories from './pages/Repositories.tsx';
import RepositoryDetail from './components/RepositoryDetail.tsx';
import FollowersList from './components/FollowersList.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repositories" element={<Repositories />} />
      <Route path="/repository/:username/:repoName" element={<RepositoryDetail />} />
      <Route path="/followers" element={<FollowersList />} />
    </Routes>
  );
}

export default App;
