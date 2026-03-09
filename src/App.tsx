import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EpisodesPage from './pages/EpisodesPage';
import EpisodeDetailPage from './pages/EpisodeDetailPage';
import ContactPage from './pages/ContactPage';
import BecomeCreatorPage from './pages/BecomeCreatorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
        <Route path="/episodes/:episodeId" element={<EpisodeDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/become-a-creator" element={<BecomeCreatorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
