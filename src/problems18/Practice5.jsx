import { useState } from 'react'
import { combination, triangular } from '../utils/sequence'
import { PascalTriangleView } from '../components/PascalTriangleView'
import { NControl } from '../components/NControl'

export default function Practice5() {
  const [row, setRow] = useState(10)
  const [pos, setPos] = useState(5)
  const value = combination(row, pos - 1)

  return (
    <div className="problem">
      <h2>練習問題5　パスカルの三角形〈Ａ，Ｂ〉</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，右のように整数をならべます。上からＡ段目の左からＢ番目の整数を〈Ａ，Ｂ〉と表すことにします。たとえば，〈5，3〉＝10です。
        </p>
        <ol className="question-list">
          <li>〈7，4〉＝アを求めなさい。</li>
          <li>〈イ，3〉＝91となるイを求めなさい。</li>
          <li>〈10，7〉＝〈10，ウ〉＝エ（ただし，ウは7でない数）となるウ，エを求めなさい。</li>
        </ol>
      </div>

      <PascalTriangleView rows={9} offset={1} highlight={{ row, pos }} />

      <div className="readout">
        <p>〈{row}，{pos}〉＝<b>{value}</b></p>
      </div>
      <NControl n={row} setN={setRow} min={1} max={12} label={`Ａ＝${row}`} jumps={[{ label: 'A=7', n: 7 }, { label: 'A=10', n: 10 }]} />
      <NControl n={pos} setN={setPos} min={1} max={row + 1} label={`Ｂ＝${pos}`} jumps={[{ label: 'B=4', n: 4 }, { label: 'B=7', n: 7 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 7段目は左から順に，1，7，21，35，35，21，7，1。よって，〈7，4〉＝<b>ア＝35</b>。</p>
        <p>(2) 左から3番目の数だけを書き出すと，1，3，6，10，15，……（三角数）。91は13番目の三角数なので，<b>イ＝14</b>。</p>
        <p>
          (3) どの段も左右対称です。10段目には数が11個あるので，左から7番目は右から7番目と等しく，<b>ウ＝5</b>。
          10段目は，1，10，45，120，210，252，……なので，〈10，5〉＝<b>エ＝210</b>。
        </p>
      </div>
    </div>
  )
}
