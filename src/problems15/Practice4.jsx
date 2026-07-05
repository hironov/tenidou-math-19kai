import { RegionColorPicker } from '../components/RegionColorPicker'

const REGIONS = [
  { id: 'ア', label: 'ア', d: 'M 130 40 L 175 75 L 158 128 L 102 128 L 85 75 Z', labelPos: { x: 130, y: 90 } },
  { id: 'イ', label: 'イ', d: 'M 20 60 L 85 75 L 102 128 L 55 150 L 10 110 Z', labelPos: { x: 55, y: 105 } },
  { id: 'ウ', label: 'ウ', d: 'M 55 150 L 102 128 L 158 128 L 205 150 L 130 190 Z', labelPos: { x: 130, y: 150 } },
  { id: 'エ', label: 'エ', d: 'M 158 128 L 175 75 L 240 60 L 250 110 L 205 150 Z', labelPos: { x: 205, y: 105 } },
  { id: 'オ', label: 'オ', d: 'M 175 75 L 130 40 L 155 8 L 220 20 L 240 60 Z', labelPos: { x: 195, y: 45 } },
]

const ADJACENCY = [
  ['ア', 'イ'], ['ア', 'ウ'], ['ア', 'エ'],
  ['イ', 'ウ'],
  ['ウ', 'エ'], ['ウ', 'オ'],
  ['エ', 'オ'],
]

const PALETTE = [
  { key: '赤', swatch: '#fc8181' },
  { key: '青', swatch: '#63b3ed' },
  { key: '黄', swatch: '#f6e05e' },
  { key: '緑', swatch: '#68d391' },
]

export default function Practice4() {
  return (
    <div className="problem">
      <h2>練習問題4　5つの部分のぬり分け（4色すべて使う）</h2>
      <div className="statement">
        <p className="setup">
          図のようにア〜オの5つの部分があります。となり合う部分が同じ色にならないように，赤，青，黄，緑の4色すべてを使ってぬり分ける方法は何通りありますか。
        </p>
      </div>

      <RegionColorPicker regions={REGIONS} adjacency={ADJACENCY} palette={PALETTE} width={260} height={200} />

      <div className="explain">
        <h3>解説</h3>
        <p>
          部分は5つ，色は4色なので，色を1つだけ2つの部分で使うことになります。ただし，同じ色を使える2つの部分は，となり合っていない部分でなければなりません。
        </p>
        <p>
          となり合っていない(同じ色にできる)組を図から探すと，「アとオ」「イとエ」「イとオ」の3組です。
        </p>
        <p>
          どの組を選んでも，5つの部分は実質4つのグループ(まとまり)になるので，4色のぬり方は4！＝24(通り)。よって，3×24＝<b>72(通り)</b>
        </p>
      </div>
    </div>
  )
}
