import { useState } from 'react'
import { spiralSquareValue } from '../utils/sequence'
import { NumberTable } from '../components/NumberTable'

export default function Example4() {
  const [row, setRow] = useState(3)
  const [col, setCol] = useState(2)
  const value = spiralSquareValue(row, col)

  return (
    <div className="problem">
      <h2>例題4　数表（らせん型・平方数）</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，下の表のように整数をならべます。たとえば，3行目の2列目の整数は8です。
        </p>
        <ol className="question-list">
          <li>6行目の1列目の整数はいくつですか。</li>
          <li>5行目の11列目の整数はいくつですか。</li>
          <li>62は何行目の何列目にありますか。</li>
        </ol>
      </div>

      <NumberTable rows={6} cols={6} cell={(r, c) => ({ value: spiralSquareValue(r, c) })} highlight={{ r: row, c: col }} />

      <div className="stage" style={{ marginTop: 12 }}>
        <div className="readout">
          <p>
            行：<input type="number" min={1} max={20} value={row} className="n-input"
              onChange={(e) => setRow(Math.max(1, parseInt(e.target.value, 10) || 1))} />
            列：<input type="number" min={1} max={20} value={col} className="n-input"
              onChange={(e) => setCol(Math.max(1, parseInt(e.target.value, 10) || 1))} />
          </p>
          <p>{row}行目の{col}列目の整数：<b>{value}</b></p>
        </div>
      </div>

      <div className="jump-row" style={{ marginTop: 12 }}>
        <button className="jump-btn" onClick={() => { setRow(6); setCol(1) }}>(1) 6行目1列目</button>
        <button className="jump-btn" onClick={() => { setRow(5); setCol(11) }}>(2) 5行目11列目</button>
        <button className="jump-btn" onClick={() => { setRow(8); setCol(3) }}>(3) 62の位置</button>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          数の進み方に注目すると，四角形を作るように進んでいき，各グループの最後尾＝1列目は，すべて平方数になっています。
        </p>
        <p>(1) 6行目の1列目は，6番目の平方数です。6×6＝<b>36</b>。</p>
        <p>
          (2) 10行目の1列目は10×10＝100なので，次の数である101は1行目の11列目にあります。
          1行目から5行目に進むには数字が4だけ増えるので，101＋4＝<b>105</b>。
        </p>
        <p>(3) 7×7＝49，8×8＝64より，62の位置は8行目の3列目付近です。よって，<b>8行目の3列目</b>。</p>
      </div>
    </div>
  )
}
