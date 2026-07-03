import { useState } from 'react'
import { spiralSquareAltValue } from '../utils/sequence'
import { NumberTable } from '../components/NumberTable'

export default function AdvancedA3() {
  const [row, setRow] = useState(1)
  const [col, setCol] = useState(20)
  const value = spiralSquareAltValue(row, col)

  return (
    <div className="problem">
      <h2>応用問題A-3　数表（進む向きが交互に変わるらせん型）</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，右の表のように整数をならべます。たとえば，3行目の2列目の整数は6です。
        </p>
        <ol className="question-list">
          <li>1行目の20列目の整数はいくつですか。</li>
          <li>15行目の8列目の整数はいくつですか。</li>
          <li>2000は何行目の何列目にありますか。</li>
        </ol>
      </div>

      <NumberTable rows={6} cols={6} cell={(r, c) => ({ value: spiralSquareAltValue(r, c) })} highlight={row <= 6 && col <= 6 ? { r: row, c: col } : null} />

      <div className="stage" style={{ marginTop: 12 }}>
        <div className="readout">
          <p>
            行：<input type="number" min={1} max={50} value={row} className="n-input"
              onChange={(e) => setRow(Math.max(1, parseInt(e.target.value, 10) || 1))} />
            列：<input type="number" min={1} max={50} value={col} className="n-input"
              onChange={(e) => setCol(Math.max(1, parseInt(e.target.value, 10) || 1))} />
          </p>
          <p>{row}行目の{col}列目：<b>{value}</b></p>
        </div>
      </div>
      <div className="jump-row" style={{ marginTop: 12 }}>
        <button className="jump-btn" onClick={() => { setRow(1); setCol(20) }}>(1) 1行目20列目</button>
        <button className="jump-btn" onClick={() => { setRow(15); setCol(8) }}>(2) 15行目8列目</button>
        <button className="jump-btn" onClick={() => { setRow(26); setCol(45) }}>(3) 2000の位置</button>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>数の進む方向が交互になっています。奇数の平方数は1行目に，偶数の平方数は1列目にあります。</p>
        <p>(1) 1行目の19列目は19×19＝361。次のグループは362からはじまるので，1行目の20列目は<b>362</b>。</p>
        <p>(2) 14行目の1列目は196です。よって，15行目の1列目は197。15行目の8列目は，197＋7＝<b>204</b>。</p>
        <p>(3) 2000にもっとも近い平方数は44×44＝1936（44行目の1列目）。45行目の1列目は1937，45行目の45列目は1981。2000－1981＝19より，<b>26行目の45列目</b>。</p>
      </div>
    </div>
  )
}
