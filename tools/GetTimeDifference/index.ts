interface TimeDifference {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

/**
 * Calculate the time difference between two points in time
 * @param start start time (a string parsable by new Date())
 * @param end end time (a string parsable by new Date())
 * @returns the difference in days / hours / minutes / seconds / milliseconds
 */
export default function getTimeDifference(start: string, end: string): TimeDifference {
  const diff = new Date(end).valueOf() - new Date(start).valueOf() // time difference (milliseconds)

  // Compute the difference for each unit
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  const milliseconds = diff % 1000

  return { days, hours, minutes, seconds, milliseconds }
}
