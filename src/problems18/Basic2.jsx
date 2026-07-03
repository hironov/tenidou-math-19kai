import { useState } from 'react'
import { NumberTable } from '../components/NumberTable'

function valueAt(r, c) {
  return (r - 1) * 6 + c
}

export default function Basic2() {
  const [row, setRow] = useState(5)
  const [col, setCol] = useState(3)
  const value = valueAt(row, col)

  return (
    <div className="problem">
      <h2>基本問題2　数表（行ごとに並べる）</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，右の表のように，1から100までの整数をならべました。たとえば，2行目の3列目の整数は9です。
        </p>
        <ol className="question-list">
          <li>5行目の3列目の整数はいくつですか。</li>
          <li>100は何行目の何列目にありますか。</li>
          <li>1列目にならぶ整数の和はいくつですか。</li>
        </ol>
      </div>

      <NumberTable rows={5} cols={6} cell={(r, c) => ({ value: valueAt(r, c) })} highlight={{ r: row, c: col }} />

      <div className="stage" style={{ marginTop: 12 }}>
        <div className="readout">
          <p>
            行：<input type="number" min={1} max={20} value={row} className="n-input"
              onChange={(e) => setRow(Math.max(1, parseInt(e.target.value, 10) || 1))} />
            列：<input type="number" min={1} max={6} value={col} className="n-input"
              onChange={(e) => setCol(Math.max(1, Math.min(6, parseInt(e.target.value, 10) || 1)))} />
          </p>
          <p>{row}行目の{col}列目：<b>{value}</b></p>
        </div>
      </div>
      <div className="jump-row" style={{ marginTop: 12 }}>
        <button className="jump-btn" onClick={() => { setRow(5); setCol(3) }}>(1) 5行目3列目</button>
        <button className="jump-btn" onClick={() => { setRow(17); setCol(4) }}>(2) 100の位置</button>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 6列目の数はすべて6の倍数です。5行目の6列目は6×5＝30なので，5行目の3列目は，30－3＝<b>27</b>。</p>
        <p>(2) 100÷6＝16あまり4より，16行目の6列目は96です。よって，100は，<b>17行目の4列目</b>。</p>
        <p>(3) 17行目の1列目は97です。1列目の数だけを見ると，1，7，13，19，……と差が6の等差数列。(1＋97)×17÷2＝<b>833</b>。</p>
      </div>
    </div>
  )
}
