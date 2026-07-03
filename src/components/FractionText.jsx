export function FractionText({ num, den }) {
  if (den === 1) return <span>{num}</span>
  return (
    <span className="frac">
      <span className="num">{num}</span>
      <span className="den">{den}</span>
    </span>
  )
}
