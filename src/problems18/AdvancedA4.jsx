import { useState } from 'react'
import { NumberTable } from '../components/NumberTable'

function valueAt(n, r, c) {
  const lo = Math.min(r, c)
  const hi = Math.max(r, c)
  return lo + ((hi - lo) * (2 * n - hi + lo + 1)) / 2
}

export default function AdvancedA4() {
  const [size, setSize] = useState(5)
  const [row, setRow] = useState(1)
  const [col, setCol] = useState(1)
  const value = valueAt(size, row, col)
  const total = (size * (size + 1)) / 2
  const allSum = total * total

  return (
    <div className="problem">
      <h2>応用問題A-4　左右対称に広がる数表</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，下のようにマスの中に整数がかかれています。図は少しずつ大きくなり，n番目の図はn×nのマスをもちます。
        </p>
        <ol className="question-list">
          <li>20番目の図の一番上の行の右はしの整数はいくつですか。</li>
          <li>20番目の図にかかれた整数をすべて加えると，その和はいくつになりますか。</li>
          <li>50番目の図の上から8行目の左から5列目の整数はいくつですか。</li>
        </ol>
      </div>

      <NumberTable rows={Math.min(size, 6)} cols={Math.min(size, 6)}
        cell={(r, c) => ({ value: valueAt(size, r, c) })}
        highlight={row <= 6 && col <= 6 ? { r: row, c: col } : null} />
      {size > 6 && <p style={{ fontSize: '0.85rem', color: '#718096' }}>※ {size}番目の図は{size}×{size}マスですが、表示は6×6までにしています。</p>}

      <div className="stage" style={{ marginTop: 12 }}>
        <div className="readout">
          <p>
            図の番号(n)：<input type="number" min={1} max={60} value={size} className="n-input"
              onChange={(e) => setSize(Math.max(1, parseInt(e.target.value, 10) || 1))} />
          </p>
          <p>
            行：<input type="number" min={1} max={size} value={row} className="n-input"
              onChange={(e) => setRow(Math.max(1, Math.min(size, parseInt(e.target.value, 10) || 1)))} />
            列：<input type="number" min={1} max={size} value={col} className="n-input"
              onChange={(e) => setCol(Math.max(1, Math.min(size, parseInt(e.target.value, 10) || 1)))} />
          </p>
          <p>{size}番目の図の{row}行目{col}列目：<b>{value}</b></p>
          <p>{size}番目の図の全マスの和：<b>{allSum}</b></p>
        </div>
      </div>
      <div className="jump-row" style={{ marginTop: 12 }}>
        <button className="jump-btn" onClick={() => { setSize(20); setRow(1); setCol(20) }}>(1)(2) 20番目</button>
        <button className="jump-btn" onClick={() => { setSize(50); setRow(8); setCol(5) }}>(3) 50番目 8行5列</button>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>右はしの整数は，1番目から順に1，3，6，10，15，……と三角数になっています。</p>
        <p>(1) 20番目の一番右上は，(1＋20)×20÷2＝<b>210</b>。</p>
        <p>(2) 20番目の図の全マスの和は「三角数の平方数」になっています。210×210＝<b>44100</b>。</p>
        <p>(3) 対称性から，上から8行目・左から5列目は，小さい方の数(5)＋「148からはじまるグループの5番目」で，148＋4＝<b>152</b>。</p>
      </div>
    </div>
  )
}
