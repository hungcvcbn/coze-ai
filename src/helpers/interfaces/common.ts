import { Dayjs } from "dayjs"

export const showEvery20years = (start: number) => {
  const end = Number(start) + 19
  const yearsArray: number[] = []

  for (let i = start; i <= end; i++) {
    yearsArray.push(i)
  }

  return yearsArray
}


export const eachDayOfInterval = (start: Dayjs, end: Dayjs) => {
  const startDate = start.startOf('day')
  const endDate = end.endOf('day')
  const days = []

  let current = startDate
  while (current.isBefore(endDate) || current.isSame(endDate)) {
    days.push(current)
    current = current.add(1, 'day')
  }

  return days
}