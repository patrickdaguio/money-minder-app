export function getFormattedDate(date: Date): string {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day: number = date.getDate();
  const month: string = months[date.getMonth()];
  const year: number = date.getFullYear();

  const suffix: string =
    day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";

  return `${day}${suffix} ${month} ${year}`;
}
