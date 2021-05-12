import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <p className={'date'}>{format(date, 'LLLL d, yyyy')}</p>
}