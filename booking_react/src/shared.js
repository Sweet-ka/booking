export function differenceInDays(d0, d1) {
  // Copy dates so don't affect originals
  d0 = new Date(+d0);
  d1 = new Date(+d1);

  // Set to noon
  d0.setHours(12,0,0,0);
  d1.setHours(12,0,0,0);

  // Get difference in whole days, divide by milliseconds in one day
  // and round to remove any daylight saving boundary effects
  return Math.round((d1-d0) / 8.64e7)
}

export function time(date) {
  const d = new Date(date);
  d.setHours(12,0,0,0);
  return d
  // return Math.round((d) / 8.64e7)
}

export function dateToString (date) {
  return !date ? false : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}