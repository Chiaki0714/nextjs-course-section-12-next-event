import EventList from '@/components/events/EventList';
import EventSearch from '@/components/events/EventSearch';
import { getAllEvents } from '@/lib/eventsFetch';

export const metadata = {
  title: 'All events',
  description: 'All events',
};

export default async function EventsPage() {
  const allEvents = await getAllEvents();

  return (
    <>
      <EventSearch />
      <EventList events={allEvents} />
    </>
  );
}
