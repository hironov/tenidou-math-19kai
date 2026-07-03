import { useState } from 'react'
import { triangleSpiralValue } from '../utils/sequence'
import { NumberTable } from '../components/NumberTable'

export default function Example5() {
  const [row, setRow] = useState(4)
  const [col, setCol] = useState(6)
  const value = triangleSpiralValue(row, col)

  return (
    <div className="problem">
      <h2>例題5　数表（らせん型・三角数）</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，下の表のように整数をならべます。たとえば，3行目の2列目の整数は9です。
        </p>
        <ol className="question-list">
          <li>7行目の1列目の整数はいくつですか。</li>
          <li>4行目の6列目の整数はいくつですか。</li>
          <li>60は何行目の何列目にありますか。</li>
        </ol>
      </div>

      <NumberTable rows={6} cols={6} cell={(r, c) => ({ value: triangleSpiralValue(r, c) })} highlight={{ r: row, c: col }} />

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
        <button className="jump-btn" onClick={() => { setRow(7); setCol(1) }}>(1) 7行目1列目</button>
        <button className="jump-btn" onClick={() => { setRow(4); setCol(6) }}>(2) 4行目6列目</button>
        <button className="jump-btn" onClick={() => { setRow(5); setCol(7) }}>(3) 60の位置</button>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>数の進み方に注目すると，三角形を作るように進んでいき，各グループの最後尾＝1列目は，すべて三角数になっています。</p>
        <p>(1) 7行目の1列目は，7番目の三角数です。(1＋7)×7÷2＝<b>28</b>。</p>
        <p>(2) 4行目の6列目は9行目の1列目（9番目の三角数＝45）の5つ前の数なので，45－5＝<b>40</b>。</p>
        <p>(3) 60より大きく，60にもっとも近い三角数は，11番目の三角数である66です。60は66から右に6マス，上に6マス進んだ位置にあるので，<b>5行目の7列目</b>。</p>
      </div>
    </div>
  )
}
