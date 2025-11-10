-- 蓝鲸摄影艺术协会培训记录表
-- 在 Supabase SQL Editor 中运行此脚本

-- 创建 trainings 表
CREATE TABLE IF NOT EXISTS trainings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  lecturer TEXT NOT NULL,
  content TEXT NOT NULL,
  recording_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 启用 Row Level Security (RLS)
ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有人读取数据
CREATE POLICY "允许所有人查看培训记录" ON trainings
  FOR SELECT
  USING (true);

-- 创建策略：允许所有人插入数据
CREATE POLICY "允许所有人添加培训记录" ON trainings
  FOR INSERT
  WITH CHECK (true);

-- 创建策略：允许所有人更新数据
CREATE POLICY "允许所有人更新培训记录" ON trainings
  FOR UPDATE
  USING (true);

-- 创建策略：允许所有人删除数据
CREATE POLICY "允许所有人删除培训记录" ON trainings
  FOR DELETE
  USING (true);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS trainings_created_at_idx ON trainings(created_at DESC);

-- 插入示例数据（可选）
INSERT INTO trainings (title, date, lecturer, content, recording_url) VALUES
('摄影基础入门', '2024.11.10', '张老师', '## 课程简介

本课程将带您了解摄影的基本概念和技术要点。

## 课程内容

- 相机的基本操作
- 曝光三要素：光圈、快门、ISO
- 构图基础
- 光线的运用

欢迎大家积极参与！', 'https://example.com/recording/1');

