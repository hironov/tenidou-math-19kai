import { useState } from 'react'
import { triangleArrangementValue } from '../utils/sequence'
import { TriangleArrangementView } from '../components/TriangleArrangementView'
import { NControl } from '../components/NControl'

export default function AdvancedA2() {
  const [row, setRow] = useState(8)
  const [pos, setPos] = useState(2)
  const value = triangleArrangementValue(row, pos)

  return (
    <div className="problem">
      <h2>応用問題A-2　正三角形をならべた図形の数</h2>
      <div className="statement">
        <p className="setup">
          右の図のように，同じ大きさの正三角形をならべ，それぞれの正三角形の中に，あるきまりにしたがって1から順に整数をかき入れます。たとえば，4段目の左から5番目の整数は12です。
        </p>
        <ol className="question-list">
          <li>8段目の左から2番目の整数はいくつですか。</li>
          <li>100は何段目の左から何番目にありますか。</li>
          <li>1000は何段目の左から何番目にありますか。</li>
        </ol>
      </div>

      <TriangleArrangementView rows={5} highlightValue={value} />

      <div className="readout"><p>{row}段目の左から{pos}番目：<b>{value}</b></p></div>
      <NControl n={row} setN={(v) => { setRow(v); setPos(Math.min(pos, 2 * v - 1)) }} min={1} max={35} label={`段目＝${row}`} />
      <NControl n={pos} setN={setPos} min={1} max={2 * row - 1} label={`左から＝${pos}番目`} />
      <div className="jump-row" style={{ marginTop: 12 }}>
        <button className="jump-btn" onClick={() => { setRow(8); setPos(2) }}>(1) 8段目2番目</button>
        <button className="jump-btn" onClick={() => { setRow(10); setPos(18) }}>(2) 100の位置</button>
        <button className="jump-btn" onClick={() => { setRow(32); setPos(14) }}>(3) 1000の位置</button>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>△は段の数と同じ個数，▽は段の数より1少ない個数，▽の最後の数は段の数の平方数になっています。</p>
        <p>(1) 7段目の最後の数は49なので，8段目は50からはじまります。8段目の△は8個あるので，50～57です。よって，8段目の左から2番目（▽の1個目）は，<b>58</b>。</p>
        <p>(2) 100＝10×10なので，10段目の▽の最後（右から2番目）です。よって，<b>10段目の左から18番目</b>。</p>
        <p>(3) 1000にもっとも近い平方数は31×31＝961。32段目は962からはじまり，1000は32段目の▽のうち7番目にあたるので，<b>32段目の左から14番目</b>。</p>
      </div>
    </div>
  )
}
