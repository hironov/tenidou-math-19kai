const CELL = 28

function GridFigure({ cols, rows, extraCells = [] }) {
  const topPad = extraCells.length ? CELL : 0
  const width = cols * CELL + 20
  const height = rows * CELL + 20 + topPad
  const gridTop = 10 + topPad
  const lines = []
  for (let x = 0; x <= cols; x++) lines.push(<line key={`v${x}`} x1={10 + x * CELL} y1={gridTop} x2={10 + x * CELL} y2={gridTop + rows * CELL} stroke="#a0aec0" strokeWidth="1" />)
  for (let y = 0; y <= rows; y++) lines.push(<line key={`h${y}`} x1={10} y1={gridTop + y * CELL} x2={10 + cols * CELL} y2={gridTop + y * CELL} stroke="#a0aec0" strokeWidth="1" />)

  return (
    <svg width={width} height={height} className="tank-view">
      {lines}
      {extraCells.map(([cx], i) => (
        <rect key={i} x={10 + cx * CELL} y={gridTop - CELL} width={CELL} height={CELL} fill="none" stroke="#a0aec0" strokeWidth="1" />
      ))}
      <rect x={10} y={gridTop} width={cols * CELL} height={rows * CELL} fill="none" stroke="#4a5568" strokeWidth="2.5" />
    </svg>
  )
}

export default function Advanced2() {
  return (
    <div className="problem">
      <h2>最難関問題集2　図形の中の正方形・長方形の数</h2>
      <div className="statement">
        <p className="setup">下の図1，図2について，それぞれ次の問いに答えなさい（図の線はすべて，たてまたは横の方眼線です）。</p>
        <ol className="question-list">
          <li>図1について，①正方形は全部で何個ありますか。②長方形（正方形をふくむ）は全部で何個ありますか。</li>
          <li>図2について，①正方形は全部で何個ありますか。②長方形（正方形をふくむ）は全部で何個ありますか。</li>
        </ol>
      </div>

      <h3>図1（5×4の方眼）</h3>
      <GridFigure cols={5} rows={4} />

      <h3>図2（図1に一部の方眼を継ぎ足した形）</h3>
      <GridFigure cols={5} rows={4} extraCells={[[0, -1], [1, -1], [2, -1]]} />

      <div className="explain">
        <h3>解説</h3>
        <p>
          正方形・長方形を数えるときは，大きさ別に分けて数えます。5×4の方眼(たて4本×横5本の線)では，1辺1マスの正方形…5×4＝20個，1辺2マスの正方形…4×3＝12個，1辺3マスの正方形…3×2＝6個，1辺4マスの正方形…2×1＝2個。
        </p>
        <p>(1)① 20＋12＋6＋2＝<b>40(個)</b></p>
        <p>
          (1)② 長方形は，たて線6本から2本，横線5本から2本を選べば1つ決まるので，<sub>6</sub>C<sub>2</sub>×<sub>5</sub>C<sub>2</sub>＝15×10＝<b>150(個)</b>
        </p>
        <p>
          (2) 図2は図1に方眼を継ぎ足した形なので，新しくできる正方形・長方形も数え合わせます。正方形は，1辺1マス…23個，1辺2マス…14個，1辺3マス…7個，1辺4マス…2個。
        </p>
        <p>(2)① 23＋14＋7＋2＝<b>46(個)</b></p>
        <p>(2)② 図1の150個に，継ぎ足した部分を使う長方形30個を加えて，150＋30＝<b>180(個)</b></p>
      </div>
    </div>
  )
}
