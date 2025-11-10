import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

const STORAGE_KEY = 'lanjing_trainings';

// 从 localStorage 读取数据
const loadTrainings = (): Training[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('加载数据失败:', error);
  }
  return [];
};

export function App() {
  const [trainings, setTrainings] = useState<Training[]>(loadTrainings);

  // 当 trainings 变化时，自动保存到 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trainings));
    } catch (error) {
      console.error('保存数据失败:', error);
    }
  }, [trainings]);

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
