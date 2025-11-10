import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TrainingList } from './components/TrainingList';
import { TrainingDetail } from './components/TrainingDetail';
import { AdminPage } from './components/AdminPage';
import { trainingService, Training as SupabaseTraining } from './lib/supabase';

// 兼容旧的 Training 接口
export interface Training {
  id: string;
  title: string;
  date: string;
  lecturer: string;
  content: string;
  recordingUrl?: string;
}

// 转换 Supabase 数据到应用格式
function convertFromSupabase(data: SupabaseTraining): Training {
  return {
    id: data.id,
    title: data.title,
    date: data.date,
    lecturer: data.lecturer,
    content: data.content,
    recordingUrl: data.recording_url
  };
}

// 转换应用格式到 Supabase 数据
function convertToSupabase(training: Omit<Training, 'id'>): Omit<SupabaseTraining, 'id' | 'created_at'> {
  return {
    title: training.title,
    date: training.date,
    lecturer: training.lecturer,
    content: training.content,
    recording_url: training.recordingUrl
  };
}

export function App() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  // 从 Supabase 加载数据
  useEffect(() => {
    loadTrainings();
  }, []);

  const loadTrainings = async () => {
    try {
      setLoading(true);
      const data = await trainingService.getAllTrainings();
      const converted = data.map(convertFromSupabase);
      setTrainings(converted);
    } catch (error) {
      console.error('加载培训记录失败:', error);
      alert('加载数据失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-blue-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-slate-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrainingList trainings={trainings} />} />
        <Route path="/training/:id" element={<TrainingDetail trainings={trainings} />} />
        <Route path="/admin" element={<AdminPage trainings={trainings} setTrainings={setTrainings} onRefresh={loadTrainings} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
