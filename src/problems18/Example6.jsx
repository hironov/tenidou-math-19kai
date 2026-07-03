import { useState } from 'react'
import { combination, triangular } from '../utils/sequence'
import { PascalTriangleView } from '../components/PascalTriangleView'
import { NControl } from '../components/NControl'

export default function Example6() {
  const [row, setRow] = useState(7)
  const [n, setN] = useState(100)

  const rowEntries = Array.from({ length: row }, (_, k) => combination(row - 1, k))
  const rowSum = rowEntries.reduce((a, b) => a + b, 0)
  const arrowValue = triangular(n)

  return (
    <div className="problem">
      <h2>例題6　パスカルの三角形</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，右のように整数をならべます。たとえば，4段目にならぶ整数は，左から順に，1，3，3，1となります。
        </p>
        <ol className="question-list">
          <li>7段目にならぶ整数を，左から順にすべて答えなさい。</li>
          <li>9段目にならぶ整数の和はいくつですか。</li>
          <li>図の矢印の部分には，上から順に，1番目は1，2番目は3，3番目は6，……のように整数がならんでいます。100番目の整数はいくつですか。</li>
        </ol>
      </div>

      <PascalTriangleView rows={9} />

      <div className="readout">
        <p>{row}段目：<b>{rowEntries.join('，')}</b>　（和：{rowSum}）</p>
      </div>

      <NControl n={row} setN={setRow} min={1} max={10} label="段目を表示"
        jumps={[{ label: '(1) 7段目', n: 7 }, { label: '(2) 9段目', n: 9 }]} />

      <div className="graph-block">
        <h3>(3) 矢印の列（三角数）</h3>
        <NControl n={n} setN={setN} min={1} max={200} label="番目"
          jumps={[{ label: '100番目（答え）', n: 100 }]} />
        <p className="readout" style={{ marginTop: 8 }}>矢印の列の{n}番目：<b>{arrowValue}</b></p>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 「ななめにたし算」（左上と右上の数の和が下の数になる）というきまりです。これにしたがうと，7段目は，<b>1，6，15，20，15，6，1</b>です。</p>
        <p>(2) 各段の和は，1段下に行くたびに前の段の和の2倍になります（等比数列）。7段目の和は64，8段目は128，9段目の和は<b>256</b>です。</p>
        <p>(3) 矢印で示した列は三角数になっています。100番目の三角数は，(1＋100)×100÷2＝<b>5050</b>です。</p>
      </div>
    </div>
  )
}
