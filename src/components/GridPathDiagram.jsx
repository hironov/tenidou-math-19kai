// 格子状の道の上を、右または上にだけ進んで(0,0)から各点へ行く方法の数を「和の法則」で計算し、
// 各点に数字を書きこんだ図として表示する。
// exists(x,y): その点が存在する（通れる）かどうか。cols,rows は格子の一辺の区画数。
// blockedEdges: [{x1,y1,x2,y2}] 工事中などで通れない道（辺）のリスト。
export function GridPathDiagram({ cols, rows, exists = () => true, blockedEdges = [], startLabel = '', endLabel = '', width = 320, cellSize }) {
  const size = cellSize ?? Math.min(60, (width - 40) / cols)
  const pad = 24
  const w = pad * 2 + cols * size
  const h = pad * 2 + rows * size

  const isEdgeBlocked = (x1, y1, x2, y2) => blockedEdges.some((e) => (e.x1 === x1 && e.y1 === y1 && e.x2 === x2 && e.y2 === y2))

  const count = []
  for (let y = 0; y <= rows; y++) {
    count.push([])
    for (let x = 0; x <= cols; x++) {
      if (!exists(x, y)) { count[y].push(0); continue }
      if (x === 0 && y === 0) { count[y].push(1); continue }
      const fromLeft = x > 0 && exists(x - 1, y) && !isEdgeBlocked(x - 1, y, x, y) ? count[y][x - 1] : 0
      const fromBelow = y > 0 && exists(x, y - 1) && !isEdgeBlocked(x, y - 1, x, y) ? count[y - 1][x] : 0
      count[y].push(fromLeft + fromBelow)
    }
  }

  const px = (x) => pad + x * size
  const py = (y) => h - pad - y * size

  const hLines = []
  const vLines = []
  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (exists(x, y) && exists(x + 1, y)) hLines.push({ x1: px(x), y1: py(y), x2: px(x + 1), y2: py(y), blocked: isEdgeBlocked(x, y, x + 1, y) })
    }
  }
  for (let x = 0; x <= cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (exists(x, y) && exists(x, y + 1)) vLines.push({ x1: px(x), y1: py(y), x2: px(x), y2: py(y + 1), blocked: isEdgeBlocked(x, y, x, y + 1) })
    }
  }

  return (
    <svg width={w} height={h} className="tank-view">
      {hLines.map((l, i) => <line key={`h${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.blocked ? '#e53e3e' : '#4a5568'} strokeWidth={l.blocked ? 3 : 1.5} strokeDasharray={l.blocked ? '4 3' : undefined} />)}
      {vLines.map((l, i) => <line key={`v${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.blocked ? '#e53e3e' : '#4a5568'} strokeWidth={l.blocked ? 3 : 1.5} strokeDasharray={l.blocked ? '4 3' : undefined} />)}
      {count.map((row, y) => row.map((v, x) => exists(x, y) && (
        <g key={`${x}-${y}`}>
          <circle cx={px(x)} cy={py(y)} r={3} fill="#2d3748" />
          <text x={px(x) + (x === cols ? -8 : 6)} y={py(y) - 6} fontSize="12" fontWeight={x === 0 && y === 0 ? 'normal' : 'bold'} fill="#2b6cb0" textAnchor={x === cols ? 'end' : 'start'}>
            {v}
          </text>
        </g>
      )))}
      {startLabel && <text x={px(0) - 6} y={py(0) + 18} fontSize="12" textAnchor="middle" fill="#2d3748">{startLabel}</text>}
      {endLabel && <text x={px(cols) + 6} y={py(rows) - 10} fontSize="12" textAnchor="start" fill="#2d3748">{endLabel}</text>}
    </svg>
  )
}
