import { useParams, Link } from 'react-router-dom';
import { Training } from '../App';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface TrainingDetailProps {
  trainings: Training[];
}

export function TrainingDetail({ trainings }: TrainingDetailProps) {
  const { id } = useParams();
  const training = trainings.find(t => t.id === id);

  if (!training) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-8">培训记录未找到</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-blue-50/40">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors tracking-wide group"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transform group-hover:-translate-x-1 transition-transform">
              <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回列表
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-20">
        {/* Header Card */}
        <div className="relative mb-16 bg-white rounded-3xl p-12 shadow-[0_20px_60px_rgba(13,71,161,0.08)] border border-blue-100 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>
          
          <div className="relative text-center">
            {/* Small Whale Icon */}
            <div className="mb-6 flex justify-center">
              <svg width="48" height="48" viewBox="0 0 64 64" fill="none" className="text-blue-500 opacity-40">
                <path d="M8 32C8 32 12 28 18 28C24 28 28 32 32 32C36 32 40 28 46 28C52 28 56 32 56 32C56 32 54 40 48 44C42 48 38 46 32 46C26 46 22 48 16 44C10 40 8 32 8 32Z" fill="currentColor"/>
                <circle cx="20" cy="30" r="2" fill="white"/>
              </svg>
            </div>
            
            <h1 className="mb-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
              {training.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex items-center justify-center gap-6 text-slate-600">
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-blue-500">
                  <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 1.5V4.5M11 1.5V4.5M2 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="tracking-wide">{training.date}</span>
              </div>
              <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-blue-500">
                  <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M3 13.5C3 11 5 9.5 8 9.5C11 9.5 13 11 13 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="tracking-wide">{training.lecturer}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          <div className="bg-white rounded-3xl p-12 shadow-[0_10px_40px_rgba(13,71,161,0.06)] border border-blue-50">
            <div className="markdown-content text-slate-700 leading-relaxed tracking-wide">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
              >
                {training.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>

        {/* Recording Button */}
        {training.recordingUrl && (
          <div className="mt-16 text-center">
            <a
              href={training.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-[0_10px_30px_rgba(21,101,192,0.3)] hover:shadow-[0_15px_40px_rgba(21,101,192,0.4)] hover:-translate-y-0.5 tracking-wide"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 7L13 10L8 13V7Z" fill="currentColor"/>
              </svg>
              查看录音 / 资料链接
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transform group-hover:translate-x-1 transition-transform">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        )}
      </main>

      {/* Spacer */}
      <div className="h-32"></div>
    </div>
  );
}
