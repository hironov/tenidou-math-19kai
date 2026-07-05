import { RegionColorPicker } from '../components/RegionColorPicker'

const REGIONS = [
  { id: 'ア', d: 'M10,10 L70,10 L70,150 L10,150 Z', labelPos: { x: 40, y: 85 } },
  { id: 'イ', d: 'M70,10 L130,10 L130,150 L70,150 Z', labelPos: { x: 100, y: 85 } },
  { id: 'ウ', d: 'M130,10 L190,10 L190,150 L130,150 Z', labelPos: { x: 160, y: 85 } },
  { id: 'エ', d: 'M190,10 L250,10 L250,150 L190,150 Z', labelPos: { x: 220, y: 85 } },
]
const ADJ = [['ア', 'イ'], ['イ', 'ウ'], ['ウ', 'エ']]
const PALETTE = [
  { key: '赤', swatch: '#fc8181' }, { key: '青', swatch: '#63b3ed' },
  { key: '黄', swatch: '#f6e05e' }, { key: '緑', swatch: '#68d391' },
]

export default function Example6() {
  return (
    <div className="problem">
      <h2>例題6　ぬり分け問題</h2>
      <div className="statement">
        <p className="setup">{'{赤，青，黄，緑}'}のうちの何色かを使って，ア～エの4つの部分を，となり合う部分が同じ色にならないようにぬり分けます。クリックして色を試してみましょう。</p>
        <ol className="question-list">
          <li>4色全部を使うとき，色のぬり方は何通りありますか。</li>
          <li>3色ちょうどを使うとき，色のぬり方は何通りありますか。</li>
        </ol>
      </div>

      <RegionColorPicker regions={REGIONS} adjacency={ADJ} palette={PALETTE} width={260} height={160} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 4つの部分に対して4色を使いますので，使う色の順番だけを考えます。（ア）（イ）（ウ）（エ）4×3×2×1＝<b>24(通り)</b></p>
        <p>
          (2) 4つの部分に対して3色を使うということは，どこか2つの部分を同じ色でぬらなければならないということです。となり合う部分が同じ色になってはいけないことに注意すると，
          同じ色になるのは，(アとウ)(アとエ)(イとエ)の3通りが考えられます。使う色の順番は，(アとウ)が同じ色である場合，（アとウ）（イ）（エ）4×3×2＝24(通り)。
          これは他の2通りでも同様の式になりますので，24×3＝<b>72(通り)</b>
        </p>
        <p>ぬり分けの考え方は，①模様（どこが同じ色か）で場合分けをする。②それぞれの模様について，使う色の順番を考える（積の法則）。という手順で行うと複雑な問題でも解きやすいです。</p>
      </div>
    </div>
  )
}
