// ダイヤグラム：横軸=時間、縦軸=位置。複数人の位置の変化を折れ線で表示し、現在時刻をマーカーで示す。
export function PositionDiagram({ tMax, yMax, series, t, width = 420, height = 260, yLabel = 'm', xLabel = '(分)', markLines = [], yBottomLabel = '', yTopLabel = '' }) {
  const pad = { l: 46, r: 14, t: 14, b: 28 }
  const w = width - pad.l - pad.r
  const h = height - pad.t - pad.b
  const N = 200
  const sx = (tt) => pad.l + (tt / tMax) * w
  const sy = (yy) => pad.t + h - (Math.max(0, Math.min(yMax, yy)) / yMax) * h

  return (
    <svg width={width} height={height} className="value-graph">
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={pad.t + h} stroke="#888" />
      <line x1={pad.l} y1={pad.t + h} x2={pad.l + w} y2={pad.t + h} stroke="#888" />
      {markLines.map((m) => (
        <g key={m.t}>
          <line x1={sx(m.t)} y1={pad.t} x2={sx(m.t)} y2={pad.t + h} stroke="#cbd5e0" strokeDasharray="2 3" />
          <text x={sx(m.t)} y={pad.t + h + 14} fontSize="9" textAnchor="middle" fill="#718096">{m.label ?? m.t}</text>
        </g>
      ))}
      {series.map((s, i) => {
        const pts = []
        for (let k = 0; k <= N; k++) {
          const tt = (tMax * k) / N
          pts.push([tt, s.fn(tt)])
        }
        const d = pts.map(([tt, yy], k) => `${k === 0 ? 'M' : 'L'} ${sx(tt).toFixed(1)} ${sy(yy).toFixed(1)}`).join(' ')
        const curY = s.fn(t)
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={s.color} strokeWidth="2" />
            <circle cx={sx(t)} cy={sy(curY)} r={4} fill={s.color} />
          </g>
        )
      })}
      <line x1={sx(t)} y1={pad.t} x2={sx(t)} y2={pad.t + h} stroke="#e53e3e" strokeDasharray="4 3" />
      <text x={pad.l - 6} y={pad.t + h} fontSize="10" textAnchor="end">{yBottomLabel || 0}</text>
      <text x={pad.l - 6} y={pad.t + 8} fontSize="10" textAnchor="end">{yTopLabel || yMax}</text>
      <text x={pad.l + w} y={pad.t + h + 16} fontSize="10" textAnchor="end">{xLabel}</text>
      <text x={4} y={pad.t - 2} fontSize="10">{yLabel}</text>
    </svg>
  )
}
