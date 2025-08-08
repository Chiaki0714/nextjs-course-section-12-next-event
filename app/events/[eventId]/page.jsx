import { getEventById } from '@/lib/eventsFetch';
import { notFound } from 'next/navigation';

import styles from './page.module.css';
import { formatAddress, formatDate } from '@/lib/fotmat';

import DateIcon from '@/components/icons/date-icon';
import AddressIcon from '@/components/icons/adress-icon';
import Image from 'next/image';

export async function generateMetadata({ params }) {
  const event = await getEventById(params.eventId);

  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }) {
  const { eventId } = await params;
  const eventItem = await getEventById(eventId);
  if (!eventItem) {
    notFound();
  }
  const humanReadableDate = formatDate(eventItem.date);
  const addressText = formatAddress(eventItem.location);

  return (
    <>
      <section className={styles.summary}>
        <h1>{eventItem.title}</h1>
      </section>

      <section className={styles.logistics}>
        <div className={styles.image}>
          <Image
            src={`/${eventItem.image}`}
            alt={eventItem.title}
            sizes='(min-width: 768px) 20rem, 10rem'
            fill
            priority
          />
        </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.icon}>
              <DateIcon />
            </span>
            <span>
              <time>{humanReadableDate}</time>
            </span>
          </li>
          <li className={styles.item}>
            <span className={styles.icon}>
              <AddressIcon />
            </span>
            <span>
              <time>{addressText}</time>
            </span>
          </li>
        </ul>
      </section>
      <section className={styles.content}>
        <p>{eventItem.description}</p>
      </section>
    </>
  );
}
