export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatAddress(address) {
  return address.replace(', ', '\n');
}
