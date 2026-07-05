import { useState } from 'react'
import { DicePicker } from '../components/DicePicker'
import { GridPathDiagram } from '../components/GridPathDiagram'

const AB_ROUTES = ['道1', '道2']
const BC_ROUTES = ['道1', '道2', '道3', '道4']

export default function Basic1() {
  const [ab, setAb] = useState(null)
  const [bc, setBc] = useState(null)

  return (
    <div className="problem">
      <h2>基本問題1　和分解・道順・積の法則いろいろ</h2>
      <div className="statement">
        <p className="setup">次の問いに答えなさい。</p>
        <ol className="question-list">
          <li>大小2つのさいころを同時に1回ふります。出た目の合計が6の倍数になるような目の出方は何通りありますか。</li>
          <li>直角に交わる道があります。Ａ地点からＢ地点まで遠回りせずに行く道順は何通りありますか。</li>
          <li>Ａ，Ｂ，Ｃの3種類のおかずと，Ｄ，Ｅの2種類のデザートがあります。おかずとデザートを1種類ずつ選ぶとき，選び方は何通りありますか。</li>
          <li>Ａ，Ｂ，Ｃの3つの地点を結ぶ道があります（ＡＢ間2本，ＢＣ間4本）。Ａ地点からＢ地点を通ってＣ地点まで行く道順は何通りありますか。</li>
          <li>{'{1，2，3，4}'}の4枚のカードがあります。このうちの2枚をならべて2けたの整数を作ります。整数は何通りできますか。</li>
          <li>Ａ，Ｂ，Ｃ，Ｄ，Ｅ，Ｆの6人の班で，班長と副班長を1人ずつ選びます。班長と副班長の選び方は何通りありますか。</li>
          <li>Ａ，Ｂ，Ｃ，Ｄ，Ｅの5人が横1列にならぶとき，ならび方は何通りありますか。</li>
          <li>10円玉，100円玉，500円玉の3枚の硬貨を同時に1回投げます。表と裏の出方は何通りありますか。</li>
        </ol>
      </div>

      <h3>(1) さいころの目の合計が6の倍数</h3>
      <DicePicker checkFn={(s) => s % 6 === 0} checkLabel="6の倍数か" />

      <h3>(2) Ａ地点からＢ地点までの道順</h3>
      <GridPathDiagram cols={3} rows={3} startLabel="A" endLabel="B" />

      <h3>(4) Ａ地点からＢ地点を通ってＣ地点まで（ＡＢ間2本，ＢＣ間4本）</h3>
      <p style={{ fontWeight: 'bold', marginBottom: 4 }}>ＡＢ間の道を選ぶ</p>
      <div className="combo-items">
        {AB_ROUTES.map((r) => <button key={r} className={`combo-item${ab === r ? ' active' : ''}`} onClick={() => setAb(r)}>{r}</button>)}
      </div>
      <p style={{ fontWeight: 'bold', margin: '10px 0 4px' }}>ＢＣ間の道を選ぶ</p>
      <div className="combo-items">
        {BC_ROUTES.map((r) => <button key={r} className={`combo-item${bc === r ? ' active' : ''}`} onClick={() => setBc(r)}>{r}</button>)}
      </div>
      {ab && bc && <p className="combo-message">ルート決定：Ａ→({ab})→Ｂ→({bc})→Ｃ</p>}

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 合計が6…（大，小）＝（1，5）（2，4）（3，3）（4，2）（5，1）の5通り。合計が12…（6，6）の1通り。以上より，5＋1＝<b>6(通り)</b></p>
        <p>(2) 和の法則を用いると，<b>20通り</b>になります。</p>
        <p>(3) おかずとデザートは連続して選びますので，積の法則を使うことができます。3×2＝<b>6(通り)</b></p>
        <p>(4) 積の法則を使います。2×4＝<b>8(通り)</b></p>
        <p>(5) 積の法則を使います。（十）（一）4×3＝<b>12(通り)</b></p>
        <p>(6) 班長と副班長は連続して選びますので，積の法則を使うことができます。（班長）（副班長）6×5＝<b>30(通り)</b></p>
        <p>(7) 積の法則を使います。5×4×3×2×1＝<b>120(通り)</b></p>
        <p>(8) 3枚の硬貨を同時に投げますので，積の法則を使うことができます。それぞれの硬貨について，出方は「表」か「裏」の2通りずつありますので，2×2×2＝<b>8(通り)</b></p>
      </div>
    </div>
  )
}
