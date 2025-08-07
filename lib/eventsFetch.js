import { supabase } from './supabaseClient';

// ① 特集イベント（isFeatured = true）
export async function getFeaturedEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('isFeatured', true);

  if (error) throw new Error(error.message);
  return data;
}

// ② 全イベント
export async function getAllEvents() {
  const { data, error } = await supabase.from('events').select('*');

  if (error) throw new Error(error.message);
  return data;
}

// ③ 年・月でフィルタ（イベント開催日）
export async function getFilteredEvents({ year, month }) {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = new Date(year, month, 0).toISOString().split('T')[0]; // 月末日を取得

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate);

  if (error) throw new Error(error.message);
  return data;
}

// ④ IDで1件取得
export async function getEventById(id) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
