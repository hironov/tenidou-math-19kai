// 周回コース（池・公園など）を円で表示し、複数の点を位置(0〜1、周回する割合)で表示する。
// frac=0が真上（出発点）、fracが増えると時計回りに進む。
export function CircularTrackView({ points, size = 260, label }) {
  const R = size / 2 - 46
  const cx = size / 2, cy = size / 2
  const toXY = (frac) => {
    const angle = 90 - frac * 360 // 真上から時計回り
    const rad = (angle * Math.PI) / 180
    return { x: cx + R * Math.cos(rad), y: cy - R * Math.sin(rad) }
  }
  const start = toXY(0)
  return (
    <div className="stage">
      <svg width={size} height={size}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#333" strokeWidth="2" />
        <circle cx={start.x} cy={start.y} r={3} fill="#805ad5" />
        <text x={start.x + 6} y={start.y - 6} fontSize="11" fill="#805ad5">出発点</text>
        {points.map((p, i) => {
          const pos = toXY(((p.frac % 1) + 1) % 1)
          const onRight = pos.x >= cx
          return (
            <g key={i}>
              <circle cx={pos.x} cy={pos.y} r={6} fill={p.color} />
              <text
                x={pos.x + (onRight ? 9 : -9)}
                y={pos.y + 4}
                fontSize="12" fill={p.color} fontWeight="bold"
                textAnchor={onRight ? 'start' : 'end'}
              >{p.label}</text>
            </g>
          )
        })}
        {label && <text x={cx} y={cy + 4} fontSize="11" fill="#718096" textAnchor="middle">{label}</text>}
      </svg>
    </div>
  )
}
