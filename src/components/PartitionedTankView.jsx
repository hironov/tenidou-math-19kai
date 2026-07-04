// 仕切り板で区切られた容器を正面から見た図。各部屋ごとの現在の水位を青く塗る。
// widths: 各部屋の幅の比率, dividerHeights: 部屋の間の仕切りの高さ, totalHeight: 容器の高さ
// levels: 各部屋の現在の水面の高さの配列, labels: 各部屋のラベル（A,B,C…）
export function PartitionedTankView({ widths, dividerHeights, totalHeight, levels, labels, width = 300, height = 240 }) {
  const pad = { l: 20, r: 20, t: 16, b: 20 }
  const drawW = width - pad.l - pad.r
  const drawH = height - pad.t - pad.b
  const totalWidth = widths.reduce((a, b) => a + b, 0)
  const scaleX = drawW / totalWidth
  const scaleY = drawH / totalHeight

  let x = pad.l
  const cols = widths.map((w, i) => {
    const px = x
    const pw = w * scaleX
    x += pw
    return { x: px, w: pw, width: w, divH: dividerHeights[i] ?? null, level: levels[i], label: labels[i] }
  })

  return (
    <svg width={width} height={height} className="tank-view">
      {cols.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={pad.t} width={c.w} height={drawH} fill="none" stroke="#4a5568" strokeWidth="2" />
          {c.level > 0 && (
            <rect
              x={c.x}
              y={pad.t + drawH - c.level * scaleY}
              width={c.w}
              height={c.level * scaleY}
              fill="#63b3ed"
              opacity="0.75"
            />
          )}
          {c.divH != null && (
            <line
              x1={c.x + c.w}
              y1={pad.t + drawH - c.divH * scaleY}
              x2={c.x + c.w}
              y2={pad.t + drawH}
              stroke="#4a5568"
              strokeWidth="3"
            />
          )}
          <text x={c.x + c.w / 2} y={pad.t + drawH + 14} fontSize="11" textAnchor="middle" fill="#2d3748">
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
