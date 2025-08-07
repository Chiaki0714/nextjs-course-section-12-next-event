import { getFilteredEvents } from '@/lib/eventsFetch';
import styles from './page.module.css';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/fotmat';
import EventList from '@/components/events/EventList';

export default async function FilteredEventsPage({ params }) {
  const slug = (await params.eventSlug) ?? [];
  const [year, month] = slug;
  const numYear = +year;
  const numMonth = +month;

  // Invalid Page
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <div className={styles.alert}>
          <p>Invalid filter. Please adjust your values!</p>
        </div>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  // No events
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <div className={styles.alert}>
          <p>No events found for the chosen filter!</p>
        </div>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  // Filterd Events
  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <section className={styles.title}>
        <h1>Events in {formatDate(date)}</h1>
        <Button link='/events'>Show all events</Button>
      </section>
      <EventList events={filteredEvents} />
    </>
  );
}
