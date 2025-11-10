import { createClient } from '@supabase/supabase-js';

// Supabase 配置
const supabaseUrl = 'https://wftgrambumrqthvaxaca.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmdGdyYW1idW1ycXRodmF4YWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NzE1ODgsImV4cCI6MjA3ODM0NzU4OH0.piuucv-8o-KBtTwQsGbelOi1qKS1gNtGYTeHcGrLbDU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 数据库类型定义
export interface Training {
  id: string;
  title: string;
  date: string;
  lecturer: string;
  content: string;
  recording_url?: string;
  created_at?: string;
}

// Supabase API 服务
export const trainingService = {
  // 获取所有培训记录
  async getAllTrainings(): Promise<Training[]> {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('获取培训记录失败:', error);
      throw error;
    }
    
    return data || [];
  },

  // 创建新培训记录
  async createTraining(training: Omit<Training, 'id' | 'created_at'>): Promise<Training> {
    const { data, error } = await supabase
      .from('trainings')
      .insert([training])
      .select()
      .single();
    
    if (error) {
      console.error('创建培训记录失败:', error);
      throw error;
    }
    
    return data;
  },

  // 更新培训记录
  async updateTraining(id: string, training: Partial<Training>): Promise<Training> {
    const { data, error } = await supabase
      .from('trainings')
      .update(training)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('更新培训记录失败:', error);
      throw error;
    }
    
    return data;
  },

  // 删除培训记录
  async deleteTraining(id: string): Promise<void> {
    const { error } = await supabase
      .from('trainings')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('删除培训记录失败:', error);
      throw error;
    }
  }
};

