// 2のべき乗チームのトーナメント表を描画する（○の中に回戦の数字を表示）。
export function Bracket({ teamCount, rowHeight = 26, colWidth = 70, showLabels = true }) {
  const rounds = Math.round(Math.log2(teamCount))
  const width = rounds * colWidth + 60
  const height = teamCount * rowHeight + 20

  // 各チームの初期y座標
  const teamY = (i) => 10 + i * rowHeight + rowHeight / 2

  const elements = []
  let curYs = Array.from({ length: teamCount }, (_, i) => teamY(i))
  let curX = 30

  for (let r = 1; r <= rounds; r++) {
    const nextYs = []
    for (let i = 0; i < curYs.length; i += 2) {
      const y1 = curYs[i]
      const y2 = curYs[i + 1]
      const midY = (y1 + y2) / 2
      const nextX = curX + colWidth
      elements.push(<line key={`h1-${r}-${i}`} x1={curX} y1={y1} x2={nextX} y2={y1} stroke="#4a5568" strokeWidth="1.5" />)
      elements.push(<line key={`h2-${r}-${i}`} x1={curX} y1={y2} x2={nextX} y2={y2} stroke="#4a5568" strokeWidth="1.5" />)
      elements.push(<line key={`v-${r}-${i}`} x1={nextX} y1={y1} x2={nextX} y2={y2} stroke="#4a5568" strokeWidth="1.5" />)
      elements.push(
        <g key={`c-${r}-${i}`}>
          <circle cx={nextX} cy={midY} r={11} fill="white" stroke="#3182ce" strokeWidth="1.5" />
          {showLabels && <text x={nextX} y={midY + 4} fontSize="11" textAnchor="middle" fill="#2b6cb0">{r}</text>}
        </g>
      )
      nextYs.push(midY)
    }
    curYs = nextYs
    curX += colWidth
  }

  return (
    <svg width={width} height={height} className="tank-view">
      {Array.from({ length: teamCount }, (_, i) => (
        <text key={`t${i}`} x={4} y={teamY(i) + 4} fontSize="10" fill="#2d3748">{i + 1}</text>
      ))}
      {elements}
    </svg>
  )
}
