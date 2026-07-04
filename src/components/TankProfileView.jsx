// 高さによって断面積（見た目の幅）が変わる容器を正面から見た図。水面の高さまで青く塗る。
// segments は底から順に [{ height, relWidth, label }]（relWidth は見た目の幅の比率）
export function TankProfileView({ segments, depth, width = 260, height = 260, depthLabel = true }) {
  const totalH = segments.reduce((s, seg) => s + seg.height, 0)
  const pad = { l: 20, r: 20, t: 16, b: 16 }
  const maxRel = Math.max(...segments.map((s) => s.relWidth))
  const drawW = width - pad.l - pad.r
  const drawH = height - pad.t - pad.b
  const scaleY = drawH / totalH
  const cx = pad.l + drawW / 2

  let yTop = pad.t
  const rects = []
  for (let i = segments.length - 1; i >= 0; i--) {
    const seg = segments[i]
    const h = seg.height * scaleY
    const w = (seg.relWidth / maxRel) * drawW
    rects.push({ x: cx - w / 2, y: yTop, w, h, seg })
    yTop += h
  }
  // rects は上から順に並んでいるので、底からの高さ情報を付与
  let cum = 0
  const withBase = rects
    .slice()
    .reverse()
    .map((r) => {
      const base = cum
      cum += r.seg.height
      return { ...r, base, top: base + r.seg.height }
    })

  const waterRects = withBase
    .filter((r) => depth > r.base)
    .map((r) => {
      const filledH = Math.min(depth, r.top) - r.base
      const filledPx = filledH * scaleY
      return { x: r.x, y: r.y + (r.h - filledPx), w: r.w, h: filledPx }
    })

  return (
    <svg width={width} height={height} className="tank-view">
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="none" stroke="#4a5568" strokeWidth="2" />
      ))}
      {waterRects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="#63b3ed" opacity="0.75" />
      ))}
      {depthLabel && (
        <text x={cx} y={pad.t + drawH + 14} fontSize="11" textAnchor="middle" fill="#2b6cb0">
          水面の高さ：{depth.toFixed(1)} cm
        </text>
      )}
    </svg>
  )
}
