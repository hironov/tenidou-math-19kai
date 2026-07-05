import { RegionColorPicker } from '../components/RegionColorPicker'

const REGIONS = [
  { id: 'ア', d: 'M10,10 L90,10 L90,150 L10,150 Z', labelPos: { x: 50, y: 85 } },
  { id: 'イ', d: 'M90,10 L170,10 L170,150 L90,150 Z', labelPos: { x: 130, y: 85 } },
  { id: 'ウ', d: 'M170,10 L250,10 L250,150 L170,150 Z', labelPos: { x: 210, y: 85 } },
]
const ADJ = [['ア', 'イ'], ['イ', 'ウ']]
const PALETTE = [
  { key: '赤', swatch: '#fc8181' }, { key: '青', swatch: '#63b3ed' },
  { key: '黄', swatch: '#f6e05e' }, { key: '緑', swatch: '#68d391' },
]

export default function Basic4() {
  return (
    <div className="problem">
      <h2>基本問題4　3つの部分のぬり分け</h2>
      <div className="statement">
        <p className="setup">{'{赤，青，黄，緑}'}のうちの何色かを使って，ア，イ，ウの3つの部分を，となり合う部分が同じ色にならないようにぬり分けます。</p>
        <ol className="question-list">
          <li>ア，イ，ウをすべてことなる色でぬるとき，色のぬり方は何通りありますか。</li>
          <li>アとウが同じ色になるようにぬるとき，色のぬり方は何通りありますか。</li>
        </ol>
      </div>

      <RegionColorPicker regions={REGIONS} adjacency={ADJ} palette={PALETTE} width={260} height={160} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 使う色の順番のみ考えます。（ア）（イ）（ウ）4×3×2＝<b>24(通り)</b></p>
        <p>(2)（アとウ）（イ）4×3＝<b>12(通り)</b></p>
        <p>ぬる場所は3か所でも，使える色は4通りあります。</p>
      </div>
    </div>
  )
}
