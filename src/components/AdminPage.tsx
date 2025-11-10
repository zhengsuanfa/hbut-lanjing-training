import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Training } from '../App';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { trainingService } from '../lib/supabase';

interface AdminPageProps {
  trainings: Training[];
  setTrainings: (trainings: Training[]) => void;
  onRefresh: () => Promise<void>;
}

export function AdminPage({ trainings, setTrainings, onRefresh }: AdminPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [content, setContent] = useState('');
  const [recordingUrl, setRecordingUrl] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'lanjing2025') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('密码错误');
    }
  };

  const handleEdit = (training: Training) => {
    setTitle(training.title);
    setDate(training.date);
    setLecturer(training.lecturer);
    setContent(training.content);
    setRecordingUrl(training.recordingUrl || '');
    setEditingId(training.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    if (!title || !date || !lecturer || !content) {
      alert('请填写所有必填字段');
      return;
    }

    setLoading(true);
    
    try {
      if (editingId) {
        // 更新现有记录
        await trainingService.updateTraining(editingId, {
          title,
          date,
          lecturer,
          content,
          recording_url: recordingUrl || undefined
        });
        alert('更新成功！');
      } else {
        // 创建新记录
        await trainingService.createTraining({
          title,
          date,
          lecturer,
          content,
          recording_url: recordingUrl || undefined
        });
        alert('创建成功！');
      }

      // 刷新数据
      await onRefresh();
      
      // 清空表单
      setTitle('');
      setDate('');
      setLecturer('');
      setContent('');
      setRecordingUrl('');
      setEditingId(null);
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要删除这条培训记录吗？')) {
      return;
    }

    setLoading(true);
    
    try {
      await trainingService.deleteTraining(id);
      alert('删除成功！');
      
      // 刷新数据
      await onRefresh();
      
      // 如果正在编辑被删除的记录，清空表单
      if (editingId === id) {
        setTitle('');
        setDate('');
        setLecturer('');
        setContent('');
        setRecordingUrl('');
        setEditingId(null);
      }
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDate('');
    setLecturer('');
    setContent('');
    setRecordingUrl('');
    setEditingId(null);
  };

  // Password Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 shadow-[0_30px_80px_rgba(0,0,0,0.3)] border border-blue-200/50">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white">
                  <rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 12H20M12 20H20M12 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            
            <h2 className="mb-3 text-center bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">管理后台</h2>
            <p className="mb-8 text-center text-slate-500 tracking-wide">请输入管理员密码</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Input
                  type="password"
                  placeholder="密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50/50 border-2 border-blue-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                />
              </div>
              
              {error && (
                <div className="text-center py-2 px-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 tracking-wide">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl tracking-wide"
              >
                确认登录
              </Button>
            </form>

            <div className="mt-8 text-center">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors tracking-wide"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-blue-50/50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 border-b border-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
                <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 7H13M7 13H13M7 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="tracking-wide text-white">管理后台</h1>
          </div>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors tracking-wide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L2 8L8 14M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回首页
          </Link>
        </div>
      </header>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Training List */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <h3 className="text-slate-900">现有培训记录</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full tracking-wide">
                {trainings.length}
              </span>
            </div>
            
            <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
              {trainings.map((training) => (
                <div
                  key={training.id}
                  className={`relative bg-white border-2 rounded-2xl p-6 transition-all overflow-hidden ${
                    editingId === training.id
                      ? 'border-blue-500 shadow-[0_10px_40px_rgba(21,101,192,0.15)]'
                      : 'border-blue-100 hover:border-blue-200'
                  }`}
                >
                  {editingId === training.id && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  )}
                  
                  <h4 className="mb-3 text-slate-900">{training.title}</h4>
                  <p className="text-slate-500 mb-4 tracking-wide flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-blue-400">
                      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5 1.5V4.5M11 1.5V4.5M2 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {training.date} · {training.lecturer}
                  </p>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(training)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors tracking-wide"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M11 2L14 5L5 14H2V11L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      </svg>
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(training.id)}
                      className="flex items-center gap-1 text-slate-400 hover:text-red-600 transition-colors tracking-wide"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 4H13M5 4V3C5 2.5 5.5 2 6 2H10C10.5 2 11 2.5 11 3V4M6 7V12M10 7V12M4 4L5 13C5 13.5 5.5 14 6 14H10C10.5 14 11 13.5 11 13L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <h3 className="mb-6 flex items-center gap-2 text-slate-900">
              {editingId ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-blue-600">
                    <path d="M14 3L17 6L7 16H4V13L14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                  编辑培训记录
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-blue-600">
                    <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  添加新记录
                </>
              )}
            </h3>

            <div className="bg-white border-2 border-blue-100 rounded-2xl p-8 shadow-[0_10px_40px_rgba(13,71,161,0.08)]">
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-slate-700 tracking-wide">
                    标题 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="输入培训标题"
                    className="w-full px-4 py-3 bg-blue-50/30 border-2 border-blue-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-slate-700 tracking-wide">
                    日期 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="例如：2024.11.15"
                    className="w-full px-4 py-3 bg-blue-50/30 border-2 border-blue-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-slate-700 tracking-wide">
                    讲师 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={lecturer}
                    onChange={(e) => setLecturer(e.target.value)}
                    placeholder="输入讲师姓名"
                    className="w-full px-4 py-3 bg-blue-50/30 border-2 border-blue-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-slate-700 tracking-wide">
                    内容 <span className="text-red-500">*</span>
                    <span className="text-slate-400 text-xs ml-2">(支持 Markdown 语法)</span>
                  </label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="输入培训内容详情（支持 Markdown：# 标题、**粗体**、- 列表等）"
                    rows={8}
                    className="w-full px-4 py-3 bg-blue-50/30 border-2 border-blue-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-slate-700 tracking-wide">
                    录音链接
                  </label>
                  <Input
                    type="text"
                    value={recordingUrl}
                    onChange={(e) => setRecordingUrl(e.target.value)}
                    placeholder="输入录音或资料链接（可选）"
                    className="w-full px-4 py-3 bg-blue-50/30 border-2 border-blue-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? '保存中...' : (editingId ? '更新记录' : '保存记录')}
                  </Button>
                  
                  {editingId && (
                    <Button
                      onClick={handleCancel}
                      disabled={loading}
                      variant="outline"
                      className="flex-1 bg-white text-slate-600 border-2 border-blue-200 py-3 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      取消
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-20"></div>
    </div>
  );
}
