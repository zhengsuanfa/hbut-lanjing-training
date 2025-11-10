import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { TrainingList } from './components/TrainingList';
import { TrainingDetail } from './components/TrainingDetail';
import { AdminPage } from './components/AdminPage';

// Mock data
export interface Training {
  id: string;
  title: string;
  date: string;
  lecturer: string;
  content: string;
  recordingUrl?: string;
}

const initialTrainings: Training[] = [];

export function App() {
  const [trainings, setTrainings] = useState<Training[]>(initialTrainings);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrainingList trainings={trainings} />} />
        <Route path="/training/:id" element={<TrainingDetail trainings={trainings} />} />
        <Route path="/admin" element={<AdminPage trainings={trainings} setTrainings={setTrainings} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
