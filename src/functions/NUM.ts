export default function NUM(value: any) {
  if (isNaN(value)) return NaN
  return parseFloat(value)
}
