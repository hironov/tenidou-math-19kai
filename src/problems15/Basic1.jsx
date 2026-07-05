import { DicePicker } from '../components/DicePicker'
import { GridPathDiagram } from '../components/GridPathDiagram'
import { SlotSequence } from '../components/SlotSequence'

const LOS = [0, 0, 3, 3]
const exists13 = (x, y) => x >= LOS[y] && x <= 4

const PEOPLE = [
  { key: '父', label: '父', count: 1, swatch: '#63b3ed' },
  { key: '母', label: '母', count: 1, swatch: '#f6ad55' },
  { key: '花子', label: '花子', count: 1, swatch: '#68d391' },
  { key: '弟', label: '弟', count: 1, swatch: '#fc8181' },
]

export default function Basic1() {
  return (
    <div className="problem">
      <h2>基本問題1　場合の数の基本</h2>
      <div className="statement">
        <ol className="question-list">
          <li>大小2つのさいころを同時に1回ふります。出た目の積が10の倍数になるような目の出方は何通りありますか。</li>
          <li>直角に交わる道があります。Ａ地点からＢ地点まで遠回りせずに行く道順は何通りありますか。</li>
          <li>Ａ，Ｂ，Ｃの3つの地点を結ぶ道があります（ＡＢ間4本，ＢＣ間5本）。Ａ地点からＢ地点を通ってＣ地点まで行く道順は何通りありますか。</li>
          <li>父，母，花子さん，弟の4人が横1列にならぶとき，ならび方は何通りありますか。</li>
        </ol>
      </div>

      <h3>(1) さいころの目の積が10の倍数</h3>
      <DicePicker mode="product" checkFn={(p) => p % 10 === 0} checkLabel="積が10の倍数か" />

      <h3>(2) Ａ地点からＢ地点までの道順</h3>
      <GridPathDiagram cols={4} rows={3} exists={exists13} startLabel="A" endLabel="B" />

      <h3>(4) 4人のならび方</h3>
      <SlotSequence slotCount={4} colors={PEOPLE} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 積が10になる…(2，5)(5，2)。積が20になる…(4，5)(5，4)。積が30になる…(5，6)(6，5)。以上より，<b>6通り</b></p>
        <p>(2) 和の法則を用います。図より，<b>13通り</b></p>
        <p>(3) 積の法則を用いて，4×5＝<b>20(通り)</b></p>
        <p>(4) 積の法則を用いて，4×3×2×1＝<b>24(通り)</b></p>
      </div>
    </div>
  )
}
