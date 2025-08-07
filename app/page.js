import EventList from '@/components/events/EventList';
import { getAllEvents, getFeaturedEvents } from '@/lib/eventsFetch';
import Image from 'next/image';

export default async function Home() {
  const featuredEvents = await getFeaturedEvents();

  return <EventList events={featuredEvents} />;
}
