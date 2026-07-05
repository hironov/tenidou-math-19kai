import { RegionColorPicker } from '../components/RegionColorPicker'

const REGIONS = [
  { id: 'ア', d: 'M80,10 L170,10 L170,60 L80,60 Z', labelPos: { x: 125, y: 40 } },
  { id: 'イ', d: 'M20,70 L120,70 L120,120 L20,120 Z', labelPos: { x: 70, y: 100 } },
  { id: 'ウ', d: 'M130,70 L230,70 L230,120 L130,120 Z', labelPos: { x: 180, y: 100 } },
  { id: 'オ', d: 'M20,130 L120,130 L120,180 L20,180 Z', labelPos: { x: 70, y: 160 } },
  { id: 'エ', d: 'M130,130 L230,130 L230,180 L130,180 Z', labelPos: { x: 180, y: 160 } },
]
const ADJ = [['ア', 'イ'], ['イ', 'ウ'], ['イ', 'オ'], ['ウ', 'エ'], ['オ', 'エ']]
const PALETTE = [{ key: '赤', swatch: '#fc8181' }, { key: '青', swatch: '#63b3ed' }, { key: '黄', swatch: '#f6e05e' }]

export default function AdvancedA3() {
  return (
    <div className="problem">
      <h2>応用問題A-3　3色でのぬり分け</h2>
      <div className="statement">
        <p className="setup">{'{赤，青，黄}'}のうちの何色かを使って，ア～オの5つの部分を，となり合う部分が同じ色にならないようにぬり分けます。</p>
        <ol className="question-list">
          <li>2色ちょうどを使うとき，色のぬり方は何通りありますか。</li>
          <li>3色全部を使うとき，色のぬり方は何通りありますか。</li>
        </ol>
      </div>

      <RegionColorPicker regions={REGIONS} adjacency={ADJ} palette={PALETTE} width={260} height={190} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 2色でぬりわけるには，(アとウとオ)を同じ色にし，かつ，(イとエ)を同じ色にする，という1通りしかありません。使う色の順番は，3×2＝<b>6(通り)</b></p>
        <p>
          (2) 3色使うには，①同じ色を3か所に使う，②同じ色を2か所に使う組が2組できる，の2通りが考えられます。①のとき…(アとウとオ)が同じになる1通りしかありませんので，3×2×1＝6(通り)。
          ②のとき…組み合わせが4通り考えられ，使う色の順番はそれぞれ3×2×1＝6(通り)なので，6×4＝24(通り)。以上より，6＋24＝<b>30(通り)</b>
        </p>
      </div>
    </div>
  )
}
