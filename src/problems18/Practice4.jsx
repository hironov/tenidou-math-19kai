import { useState } from 'react'
import { triangleSpiralValue } from '../utils/sequence'
import { NumberTable } from '../components/NumberTable'

function valueAt(r, c) {
  return triangleSpiralValue(c, r)
}

export default function Practice4() {
  const [row, setRow] = useState(7)
  const [col, setCol] = useState(2)
  const value = valueAt(row, col)

  return (
    <div className="problem">
      <h2>練習問題4　数表（らせん型・三角数の転置）</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，右の表のように整数をならべます。たとえば，3行目の2列目の整数は8です。
        </p>
        <ol className="question-list">
          <li>7行目の2列目の整数はいくつですか。</li>
          <li>83は何行目の何列目にありますか。</li>
        </ol>
      </div>

      <NumberTable rows={6} cols={6} cell={(r, c) => ({ value: valueAt(r, c) })} highlight={{ r: row, c: col }} />

      <div className="stage" style={{ marginTop: 12 }}>
        <div className="readout">
          <p>
            行：<input type="number" min={1} max={20} value={row} className="n-input"
              onChange={(e) => setRow(Math.max(1, parseInt(e.target.value, 10) || 1))} />
            列：<input type="number" min={1} max={20} value={col} className="n-input"
              onChange={(e) => setCol(Math.max(1, parseInt(e.target.value, 10) || 1))} />
          </p>
          <p>{row}行目の{col}列目：<b>{value}</b></p>
        </div>
      </div>
      <div className="jump-row" style={{ marginTop: 12 }}>
        <button className="jump-btn" onClick={() => { setRow(7); setCol(2) }}>(1) 7行目2列目</button>
        <button className="jump-btn" onClick={() => { setRow(9); setCol(5) }}>(2) 83の位置</button>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>1行目の数は三角数になっています。</p>
        <p>(1) 1行目の8列目は8番目の三角数36なので，7行目の2列目は，36－6＝<b>30</b>。</p>
        <p>(2) 83より大きく，もっとも近い三角数は13番目の三角数91です。83＝91－8より，<b>9行目の5列目</b>。</p>
      </div>
    </div>
  )
}
