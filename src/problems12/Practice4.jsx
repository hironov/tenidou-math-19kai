import { ComboPicker } from '../components/ComboPicker'

const PEOPLE = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((l) => ({ id: l, label: l }))

export default function Practice4() {
  return (
    <div className="problem">
      <h2>練習問題4　2部屋への泊まり方</h2>
      <div className="statement">
        <p className="setup">
          Ａ，Ｂ，Ｃ，Ｄ，Ｅ，Ｆ，Ｇの7人が旅行に行き，旅館にとまることになりました。旅館では，3人がとまれる「鶴の間」と，4人がとまれる「亀の間」の2部屋に分かれてとまることにします。
        </p>
        <ol className="question-list">
          <li>とまり方は何通りありますか。</li>
          <li>ＡとＢが同じ部屋になるとまり方は何通りありますか。</li>
        </ol>
      </div>

      <h3>「鶴の間」（3人）に泊まる人を選ぶ</h3>
      <ComboPicker items={PEOPLE} pickCount={3} totalLabel="35通り" />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 「鶴の間」にとまる3人を選ぶと，残りの4人は自動的に「亀の間」にとまることが決まりますので，考える必要はありません。よって，<sub>7</sub>C<sub>3</sub>＝7×6×5÷(3×2×1)＝<b>35(通り)</b></p>
        <p>
          (2) ＡとＢが「鶴の間」にとまるとき，残り5人のうち1人が「鶴の間」にとまります。これは，<sub>5</sub>C<sub>1</sub>＝5(通り)考えられます。
          また，ＡとＢが「亀の間」にとまるとき，残り5人のうち2人が「亀の間」にとまります。これは，<sub>5</sub>C<sub>2</sub>＝10(通り)考えられます。
          以上より，5＋10＝<b>15(通り)</b>
        </p>
      </div>
    </div>
  )
}
