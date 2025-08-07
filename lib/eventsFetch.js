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

// const DUMMY_EVENTS = [
//   {
//     id: 'e1',
//     title: 'Programming for everyone',
//     description:
//       'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
//     location: 'Somestreet 25, 12345 San Somewhereo',
//     date: '2021-05-12',
//     image: 'images/coding-event.jpg',
//     isFeatured: false,
//   },
//   {
//     id: 'e2',
//     title: 'Networking for introverts',
//     description:
//       "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
//     location: 'New Wall Street 5, 98765 New Work',
//     date: '2021-05-30',
//     image: 'images/introvert-event.jpg',
//     isFeatured: true,
//   },
//   {
//     id: 'e3',
//     title: 'Networking for extroverts',
//     description:
//       'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
//     location: 'My Street 12, 10115 Broke City',
//     date: '2022-04-10',
//     image: 'images/extrovert-event.jpg',
//     isFeatured: true,
//   },
// ];

// export function getFeaturedEvents() {
//   return DUMMY_EVENTS.filter(event => event.isFeatured);
// }

// export function getAllEvents() {
//   return DUMMY_EVENTS;
// }

// export function getFilteredEvents(dateFilter) {
//   const { year, month } = dateFilter;

//   let filteredEvents = DUMMY_EVENTS.filter(event => {
//     const eventDate = new Date(event.date);
//     return (
//       eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
//     );
//   });

//   return filteredEvents;
// }

// export function getEventById(id) {
//   return DUMMY_EVENTS.find(event => event.id === id);
// }
