// 時間の経過にともなって値（面積など）がどう変化するかを示す折れ線グラフ。
export function ValueGraph({
  tMax,
  yMax,
  valueFn,
  t,
  width = 320,
  height = 200,
  yLabel = 'cm²',
  xLabel = '(秒)',
  markLines = [],
}) {
  const padding = { left: 46, right: 16, top: 16, bottom: 32 }
  const w = width - padding.left - padding.right
  const h = height - padding.top - padding.bottom
  const N = 160
  const pts = []
  for (let i = 0; i <= N; i++) {
    const tt = (tMax * i) / N
    pts.push([tt, valueFn(tt)])
  }
  const sx = (tt) => padding.left + (tt / tMax) * w
  const sy = (yy) => padding.top + h - (Math.max(0, yy) / yMax) * h
  const pathD = pts.map(([tt, yy], i) => `${i === 0 ? 'M' : 'L'} ${sx(tt).toFixed(1)} ${sy(yy).toFixed(1)}`).join(' ')
  const curY = valueFn(t)

  return (
    <svg width={width} height={height} className="value-graph">
      <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + h} stroke="#888" />
      <line x1={padding.left} y1={padding.top + h} x2={padding.left + w} y2={padding.top + h} stroke="#888" />
      {markLines.map((m) => (
        <g key={m.t}>
          <line x1={sx(m.t)} y1={padding.top} x2={sx(m.t)} y2={padding.top + h} stroke="#cbd5e0" strokeDasharray="2 3" />
          <text x={sx(m.t)} y={padding.top + h + 14} fontSize="9" textAnchor="middle" fill="#718096">
            {m.label ?? m.t}
          </text>
        </g>
      ))}
      <path d={pathD} fill="none" stroke="#2b6cb0" strokeWidth="2" />
      <line x1={sx(t)} y1={padding.top} x2={sx(t)} y2={padding.top + h} stroke="#e53e3e" strokeDasharray="4 3" />
      <circle cx={sx(t)} cy={sy(curY)} r={4} fill="#e53e3e" />
      <text x={padding.left - 6} y={padding.top + 4} fontSize="10" textAnchor="end">{yMax}</text>
      <text x={padding.left - 6} y={padding.top + h} fontSize="10" textAnchor="end">0</text>
      <text x={padding.left + w} y={padding.top + h + 16} fontSize="10" textAnchor="end">{xLabel}</text>
      <text x={4} y={padding.top - 4} fontSize="10">{yLabel}</text>
    </svg>
  )
}
