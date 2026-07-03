import { useState } from 'react'
import { spiralSquareValue } from '../utils/sequence'
import { NumberTable } from '../components/NumberTable'

function valueAt(r, c) {
  return spiralSquareValue(c, r)
}

export default function Practice3() {
  const [row, setRow] = useState(3)
  const [col, setCol] = useState(9)
  const value = valueAt(row, col)

  return (
    <div className="problem">
      <h2>練習問題3　数表（らせん型・平方数の転置）</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，右の表のように整数をならべます。たとえば，3行目の2列目の整数は6です。
        </p>
        <ol className="question-list">
          <li>3行目の9列目の整数はいくつですか。</li>
          <li>102は何行目の何列目にありますか。</li>
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
        <button className="jump-btn" onClick={() => { setRow(3); setCol(9) }}>(1) 3行目9列目</button>
        <button className="jump-btn" onClick={() => { setRow(11); setCol(2) }}>(2) 102の位置</button>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>1行目の数は平方数になっています。</p>
        <p>(1) 1行目の9列目は9×9＝81なので，3行目の9列目は，81－2＝<b>79</b>。</p>
        <p>(2) 102に近い平方数は10×10＝100より，1行目の10列目は100，11行目の1列目は101です。これより，102は，<b>11行目の2列目</b>。</p>
      </div>
    </div>
  )
}
