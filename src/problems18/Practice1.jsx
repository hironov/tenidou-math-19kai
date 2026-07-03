import { useMemo, useState } from 'react'
import { NControl } from '../components/NControl'
import { SequenceStrip } from '../components/SequenceStrip'
import { NumberTable } from '../components/NumberTable'

const PATTERN = [1, 3, 5, 9, 11, 13]

function valueAt(n) {
  const row = Math.ceil(n / 6)
  const col = n - 6 * (row - 1)
  return 14 * (row - 1) + PATTERN[col - 1]
}
function rowColOf(n) {
  const row = Math.ceil(n / 6)
  const col = n - 6 * (row - 1)
  return { row, col }
}

export default function Practice1() {
  const [n, setN] = useState(27)
  const values = useMemo(() => Array.from({ length: 14 }, (_, i) => valueAt(i + 1)), [])
  const { row, col } = rowColOf(n)

  return (
    <div className="problem">
      <h2>練習問題1　2の倍数でも7の倍数でもない数の並び</h2>
      <div className="statement">
        <p className="setup">2の倍数でも7の倍数でもない1以上の整数を，下のように小さい方からならべます。</p>
        <p style={{ fontWeight: 'bold', margin: '0 0 10px 0' }}>1，3，5，9，11，13，15，17，19，23，25，27，29，31，……</p>
        <ol className="question-list">
          <li>61は左から何番目にありますか。</li>
          <li>左から50番目の整数はいくつですか。</li>
        </ol>
      </div>

      <SequenceStrip values={values} highlightIndex={n <= 14 ? n - 1 : -1} />

      <div className="graph-block">
        <h3>表にすると（14の倍数ごとに区切る）</h3>
        <NumberTable rows={5} cols={6} rowLabel="段目" colLabel="列目"
          cell={(r, c) => ({ value: 14 * (r - 1) + PATTERN[c - 1] })}
          highlight={{ r: row, c: col }} />
      </div>

      <div className="readout"><p>Ｎ＝<b>{n}</b> 番目：<b>{valueAt(n)}</b>（{row}段目の{col}列目）</p></div>
      <NControl n={n} setN={setN} min={1} max={60} label="番目"
        jumps={[{ label: '(1) 61の位置 → 27番目', n: 27 }, { label: '(2) 50番目', n: 50 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>2と7の最小公倍数である14の倍数ごとに区切って考えます。</p>
        <p>(1) 61＝5＋14×4より，5段目の3列目にあります。よって，6×4＋3＝<b>27(番目)</b>。</p>
        <p>(2) 50÷6＝8(段)あまり2(個)より，9段目の2列目を求めます。3＋14×(9－1)＝<b>115</b>。</p>
      </div>
    </div>
  )
}
