interface TimeDifference {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export default function getTimeDifference(start: string, end: string): TimeDifference {
  const diff = new Date(end).valueOf() - new Date(start).valueOf() // 时间差（毫秒）

  // 计算各单位的差值
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  const milliseconds = diff % 1000

  return { days, hours, minutes, seconds, milliseconds }
}
