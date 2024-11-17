export default function daysAgo(dateString: string) {
  // Convert the date string to a Date object
  const targetDate = new Date(dateString);
  const currentDate = new Date();

  // Calculate the difference in time (milliseconds)
  const diffInMs = currentDate.getTime() - targetDate.getTime();

  // Convert milliseconds to days
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Return the result as "x days ago"
  if (diffInDays === 0) return 'today';
  if (diffInDays === 1) return 'yesterday';
  return `${diffInDays} days ago`;
}
