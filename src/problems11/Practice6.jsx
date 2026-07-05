import { RegionColorPicker } from '../components/RegionColorPicker'

const REGIONS = [
  { id: 'ア', d: 'M10,10 L80,10 L80,90 L10,90 Z', labelPos: { x: 45, y: 55 } },
  { id: 'ウ', d: 'M95,10 L165,10 L165,90 L95,90 Z', labelPos: { x: 130, y: 55 } },
  { id: 'オ', d: 'M180,10 L250,10 L250,90 L180,90 Z', labelPos: { x: 215, y: 55 } },
  { id: 'イ', d: 'M10,100 L130,100 L130,160 L10,160 Z', labelPos: { x: 70, y: 135 } },
  { id: 'エ', d: 'M130,100 L250,100 L250,160 L130,160 Z', labelPos: { x: 190, y: 135 } },
]
// ア・ウ・オは互いに接していない（同じ色でもよい）。イとエはすべての部分ととなり合う。
const ADJ = [['ア', 'イ'], ['ア', 'エ'], ['ウ', 'イ'], ['ウ', 'エ'], ['オ', 'イ'], ['オ', 'エ'], ['イ', 'エ']]
const PALETTE = [
  { key: '赤', swatch: '#fc8181' }, { key: '青', swatch: '#63b3ed' },
  { key: '黄', swatch: '#f6e05e' }, { key: '緑', swatch: '#68d391' }, { key: '茶', swatch: '#b7791f' },
]

export default function Practice6() {
  return (
    <div className="problem">
      <h2>練習問題6　5つの部分のぬり分け</h2>
      <div className="statement">
        <p className="setup">{'{赤，青，黄，緑，茶}'}のうちの何色かを使って，ア～オの5つの部分を，となり合う部分が同じ色にならないようにぬり分けます。</p>
        <ol className="question-list">
          <li>4色ちょうどを使うとき，色のぬり方は何通りありますか。</li>
          <li>何色使ってもよいとすると，(1)の場合もふくめて，色のぬり方は全部で何通りありますか。</li>
        </ol>
      </div>

      <RegionColorPicker regions={REGIONS} adjacency={ADJ} palette={PALETTE} width={260} height={170} />

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 5つの部分を4色でぬりますので，どれか2つは同じ色を使います。同じ色となる部分は，(アとウ)(アとオ)(ウとオ)の3通りが考えられます。
          使う色の順番は，5×4×3×2＝120(通り)なので，120×3＝<b>360(通り)</b>
        </p>
        <p>
          (2) 5色すべてを使う場合…5×4×3×2×1＝120(通り)。4色だけ使う場合…(1)より360通り。3色だけ使う場合…(アとウ)が同じ，かつ，(アとオ)が同じ場合のみ（つまりア＝ウ＝オ）ですので，
          使う色の順番は，5×4×3＝60(通り)。以上より，120＋360＋60＝<b>540(通り)</b>
        </p>
      </div>
    </div>
  )
}
