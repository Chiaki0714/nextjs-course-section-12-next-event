import Image from 'next/image';

import styles from './EventList.module.css';
import { formatAddress, formatDate } from '@/lib/fotmat';

import Button from '../ui/Button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/adress-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

export default function EventList({ events }) {
  return (
    <ul className={styles.list}>
      {events.map(event => {
        const humanReadableDate = formatDate(event.date);
        const addressText = formatAddress(event.location);

        return (
          <li key={event.id} className={styles.item}>
            <div className={styles.image}>
              <Image
                src={`/${event.image}`}
                alt={event.title}
                fill
                sizes='(max-width: 768px) 100vw, 250px'
                priority
              />
            </div>
            <div className={styles.content}>
              <div className={styles.summary}>
                <h2>{event.title}</h2>
                <div className={styles.date}>
                  <DateIcon />
                  <time dateTime={event.date}>{humanReadableDate}</time>
                </div>
                <div className={styles.address}>
                  <AddressIcon />
                  <address>{addressText}</address>
                </div>
              </div>
              <div className={styles.actions}>
                <Button link={`/events/${event.id}`}>
                  <span>Explore Event</span>
                  <span className={styles.icon}>
                    <ArrowRightIcon />
                  </span>
                </Button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
