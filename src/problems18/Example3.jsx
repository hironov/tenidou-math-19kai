import { useMemo, useState } from 'react'
import { NControl } from '../components/NControl'
import { SequenceStrip } from '../components/SequenceStrip'
import { NumberTable } from '../components/NumberTable'

const PATTERN = [1, 2, 5, 7, 10, 11]

function valueAt(n) {
  const row = Math.ceil(n / 6)
  const col = n - 6 * (row - 1)
  return 12 * (row - 1) + PATTERN[col - 1]
}
function rowColOf(n) {
  const row = Math.ceil(n / 6)
  const col = n - 6 * (row - 1)
  return { row, col }
}

export default function Example3() {
  const [n, setN] = useState(45)

  const values = useMemo(() => Array.from({ length: 18 }, (_, i) => valueAt(i + 1)), [])
  const value = valueAt(n)
  const { row, col } = rowColOf(n)

  return (
    <div className="problem">
      <h2>例題3　3の倍数でも4の倍数でもない数の並び</h2>
      <div className="statement">
        <p className="setup">
          3の倍数でも4の倍数でもない1以上の整数を，次のように小さい方からならべます。
        </p>
        <p style={{ fontWeight: 'bold', margin: '0 0 10px 0' }}>1，2，5，7，10，11，13，14，17，……</p>
        <ol className="question-list">
          <li>89は左から何番目にありますか。</li>
          <li>左から100番目の整数はいくつですか。</li>
        </ol>
      </div>

      <SequenceStrip values={values} highlightIndex={n <= 18 ? n - 1 : -1} />

      <div className="graph-block">
        <h3>表にすると（12の倍数ごとに区切る）</h3>
        <NumberTable rows={6} cols={6} rowLabel="段目" colLabel="列目"
          cell={(r, c) => ({ value: 12 * (r - 1) + PATTERN[c - 1] })}
          highlight={{ r: row, c: col }}
        />
      </div>

      <div className="readout">
        <p>Ｎ＝<b>{n}</b> 番目の整数：<b>{value}</b>（{row}段目の{col}列目）</p>
      </div>

      <NControl n={n} setN={setN} min={1} max={120} label="番目"
        jumps={[{ label: '(2) 100番目', n: 100 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>3と4の最小公倍数は12なので，12の倍数ごとに区切って表にします。同じ列をたてに見ていくと，どの列も12ずつ増える等差数列です。</p>
        <p>
          (1) 89÷12＝7あまり5より，89＝5＋12×7となります。これより，89は5からはじまる3列目にあり，
          12を7回たしますから，8段目にあるということがわかります。1段あたり6個の数がならんでいますので，
          6×7＋3＝<b>45(番目)</b>です。
        </p>
        <p>(2) 100÷6＝16(段)あまり4(個)より，100番目の数は，17段目の4列目にあります。これより，4列目だけに注目して，7＋12×(17－1)＝<b>199</b>です。</p>
      </div>
    </div>
  )
}
