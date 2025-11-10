import { Link } from 'react-router-dom';
import { Training } from '../App';
import logoImage from 'figma:asset/a4d20983aacbadbc1d2062c39e97a2e7234310f1.png';

interface TrainingListProps {
  trainings: Training[];
}

export function TrainingList({ trainings }: TrainingListProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-blue-50/50">
      {/* Hero Header */}
      <header className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"></div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-20">
          <div className="text-center">
            {/* Whale Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <img src={logoImage} alt="湖北工业大学蓝鲸摄影艺术协会培训记录站" className="w-24 h-24 object-contain" />
              </div>
            </div>
            
            <h1 className="mb-6 text-white tracking-tight">湖北工业大学蓝鲸摄影艺术协会</h1>
            <div className="w-16 h-0.5 bg-blue-300 mx-auto mb-6"></div>
            <p className="text-blue-100 tracking-wide opacity-90">HBUT Blue Whale Photography Art Association</p>
          </div>
        </div>
        
        {/* Wave Border */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 text-white" preserveAspectRatio="none">
            <path d="M0,0 C300,80 600,80 900,0 C1050,40 1150,40 1200,0 L1200,120 L0,120 Z" fill="currentColor"/>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-16">
        {/* Page Title Section */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
            培训记录存档
          </h2>
          <p className="text-slate-600 tracking-wide">记录每一次凝视与成长</p>
        </div>

        {/* Training Grid */}
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {trainings.map((training, index) => (
            <Link
              key={training.id}
              to={`/training/${training.id}`}
              className="group block"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-full bg-white border border-blue-100 rounded-2xl p-8 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(13,71,161,0.12)] hover:border-blue-300 hover:-translate-y-1 overflow-hidden">
                {/* Gradient Accent on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-2xl"></div>
                </div>
                
                <div className="relative">
                  <h3 className="mb-6 text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
                    {training.title}
                  </h3>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-slate-500">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-400">
                        <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M5 1.5V4.5M11 1.5V4.5M2 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <span className="tracking-wide">{training.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-400">
                        <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M3 13.5C3 11 5 9.5 8 9.5C11 9.5 13 11 13 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <span className="tracking-wide">{training.lecturer}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span className="tracking-wide">查看详情</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transform group-hover:translate-x-1 transition-transform">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-16 mt-20">
        <div className="border-t border-blue-100 pt-8 text-center">
          <Link 
            to="/admin" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors tracking-wide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 6H10M6 10H10M6 8H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            管理后台
          </Link>
        </div>
      </footer>
    </div>
  );
}
