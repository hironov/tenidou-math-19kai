import { useState } from 'react'
import { triangular } from '../utils/sequence'
import { NControl } from '../components/NControl'

function valueAt(row, pos) {
  return triangular(row - 1) + pos
}

export default function Basic4() {
  const [row, setRow] = useState(9)
  const rows = 6
  const rowNums = Array.from({ length: rows }, (_, i) => i + 1)

  return (
    <div className="problem">
      <h2>基本問題4　三角形に並んだカード</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，右のように，整数がかかれたカードをならべます。たとえば，4段目の左から2番目のカードは8です。
        </p>
        <ol className="question-list">
          <li>9段目の左から4番目のカードにかかれた整数はいくつですか。</li>
          <li>70は何段目の左から何番目にありますか。</li>
          <li>15段目にならぶカードにかかれた整数の和はいくつですか。</li>
        </ol>
      </div>

      <div className="pascal-wrap">
        {rowNums.map((r) => (
          <div key={r} className="pascal-row">
            {Array.from({ length: r }, (_, i) => i + 1).map((p) => (
              <div key={p} className={`pascal-cell${r === row ? ' pascal-hi' : ''}`}>{valueAt(r, p)}</div>
            ))}
          </div>
        ))}
      </div>

      <NControl n={row} setN={setRow} min={1} max={16} label="段目"
        jumps={[{ label: '9段目', n: 9 }, { label: '(2) 70がある12段目', n: 12 }, { label: '(3) 15段目', n: 15 }]} />

      <div className="readout">
        <p>{row}段目の各カード：<b>{Array.from({ length: row }, (_, i) => valueAt(row, i + 1)).join('，')}</b></p>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>各段の一番右側が，三角数になっています。</p>
        <p>(1) 8段目の一番右は，(1＋8)×8÷2＝36なので，9段目の左から4番目のカードは，36＋4＝<b>40</b>。</p>
        <p>(2) 70の直前にある三角数は11番目の三角数である66です。70－66＝4より，70は，<b>12段目の左から4番目</b>。</p>
        <p>(3) 14段目の一番右は105，15段目の一番右は120。15段目は106〜120までの15個の数なので，(106＋120)×15÷2＝<b>1695</b>。</p>
      </div>
    </div>
  )
}
