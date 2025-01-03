export default function toPostgresTimestamp(dateStr: string): string {
  const [day, month, year] = dateStr.split('/');

  // Return in the format: YYYY-MM-DD HH:mm:ss
  return `${year}-${month}-${day} 00:00:00`;
}
