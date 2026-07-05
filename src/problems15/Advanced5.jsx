import { RegionColorPicker } from '../components/RegionColorPicker'

const CX = 130
const CY = 110
const R = 80
const INSET = 14
const LABELS = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ']

function vertex(i, r) {
  const angle = (-90 + i * 60) * (Math.PI / 180)
  return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)]
}

const OUTER = Array.from({ length: 6 }, (_, i) => vertex(i, R))
const INNER = Array.from({ length: 6 }, (_, i) => vertex(i, R - INSET))

const REGIONS = LABELS.map((label, i) => {
  const j = (i + 1) % 6
  const [ox1, oy1] = OUTER[i]
  const [ox2, oy2] = OUTER[j]
  const [ix1, iy1] = INNER[i]
  const [ix2, iy2] = INNER[j]
  const midX = (ox1 + ox2 + ix1 + ix2) / 4
  const midY = (oy1 + oy2 + iy1 + iy2) / 4
  return {
    id: label,
    label,
    d: `M ${ox1} ${oy1} L ${ox2} ${oy2} L ${ix2} ${iy2} L ${ix1} ${iy1} Z`,
    labelPos: { x: midX, y: midY },
  }
})

const ADJACENCY = LABELS.map((label, i) => [label, LABELS[(i + 1) % 6]])

const PALETTE = [
  { key: '赤', swatch: '#fc8181' },
  { key: '黄', swatch: '#f6e05e' },
  { key: '青', swatch: '#63b3ed' },
]

export default function Advanced5() {
  return (
    <div className="problem">
      <h2>最難関問題集5　正六角形の辺のぬり分け</h2>
      <div className="statement">
        <p className="setup">
          正六角形の6つの辺ア〜カを，赤，黄，青の3色すべてを使ってぬり分けます。となり合う辺は同じ色にならないようにします。
        </p>
        <ol className="question-list">
          <li>ちょうど3つの辺が黄色になるようなぬり方は何通りありますか。</li>
          <li>3つの色をどれもちょうど2回ずつ使うようなぬり方は何通りありますか。</li>
        </ol>
      </div>

      <RegionColorPicker regions={REGIONS} adjacency={ADJACENCY} palette={PALETTE} width={260} height={220} />

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 黄色になる3つの辺は，たがいにとなり合ってはいけないので，「ア・ウ・オ」または「イ・エ・カ」の2通りの選び方があります。
          残りの3つの辺は，赤と青の両方を使ってぬる必要があります（そうしないと3色すべてを使ったことになりません）。2色の選び方は2×2×2＝8通りありますが，
          全部赤・全部青の2通りを除くので，8－2＝6(通り)。よって，2×6＝<b>12(通り)</b>
        </p>
        <p>
          (2) 各色をちょうど2回ずつ使うには，同じ色になる2つの辺の組が，となり合わない3組のペアに分かれる必要があります。このような分け方は，
          「アエ・イオ・ウカ」「アエ・イカ・ウオ」「イオ・アウ・エカ」「ウカ・アオ・イエ」の4通りです。それぞれのペアの組に3色を割り当てる方法は3！＝6(通り)なので，4×6＝<b>24(通り)</b>
        </p>
      </div>
    </div>
  )
}
