import { useState } from 'react'
import { ComboPicker } from '../components/ComboPicker'
import { SlotSequence } from '../components/SlotSequence'

const VEG = [{ id: 'l1', label: 'レタス1' }, { id: 'l2', label: 'レタス2' }, { id: 'l3', label: 'レタス3' }, { id: 'n1', label: 'ナス1' }, { id: 'n2', label: 'ナス2' }]
const MARK_COLORS = [{ key: 'maru', label: '○', count: 3, swatch: '#63b3ed' }, { key: 'sankaku', label: '△', count: 2, swatch: '#f6ad55' }]

function DigitSlider({ template, checker, label, max = 9 }) {
  const [d, setD] = useState(0)
  const numStr = template.replace('□', String(d))
  return (
    <div>
      <p>□ の値：<b>{d}</b>　→　{numStr}</p>
      <input type="range" min={0} max={max} value={d} onChange={(e) => setD(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
      <p className={checker(d) ? 'combo-message' : ''}>{label}：{checker(d) ? `条件を満たします（${numStr}）` : '条件を満たしません'}</p>
    </div>
  )
}

export default function Basic1() {
  return (
    <div className="problem">
      <h2>基本問題1　組み合わせ・順列・倍数判定いろいろ</h2>
      <div className="statement">
        <p className="setup">次の問いに答えなさい。</p>
        <ol className="question-list">
          <li>レタスが3個，ナスが2個入っているかごから3個の野菜を選ぶとき，野菜の組み合わせは何通りありますか。</li>
          <li>Ａ，Ｂ，Ｃ，Ｄ，Ｅ，Ｆの6人の立候補者から学級委員を2人選びます。学級委員の組み合わせは何通りありますか。</li>
          <li>10色の色えんぴつが1本ずつあります。この中から3本を選ぶとき，色えんぴつの組み合わせは何通りありますか。</li>
          <li>6種類のおかしが売られています。この中から5種類のおかしを買うとき，おかしの種類の組み合わせは何通りありますか。</li>
          <li>Ａ，Ｂ，Ｃ，Ｄの4人の5年生とＰ，Ｑ，Ｒの3人の6年生がいます。5年生から1人，6年生から2人の合計3人を飼育係として選ぶ方法は何通りありますか。</li>
          <li>{'{○，○，○，△，△}'}の5個の記号を横1列にならべます。ならべ方は何通りありますか。</li>
          <li>4けたの整数「1□37」が9の倍数になるとき，□にあてはまる数字を答えなさい。</li>
          <li>5けたの整数「683□8」が4の倍数になるとき，□にあてはまる数字をすべて答えなさい。</li>
          <li>サッカーの大会に12チームが参加しました。引き分けは考えないものとします。① リーグ戦をする場合，全部で何試合行われますか。② トーナメント戦をする場合，全部で何試合行われますか。</li>
        </ol>
      </div>

      <h3>(1) 野菜3個を選ぶ</h3>
      <ComboPicker items={VEG} pickCount={3} totalLabel="3通り" />

      <h3>(6) ○3個・△2個をならべる</h3>
      <SlotSequence slotCount={5} colors={MARK_COLORS} />

      <h3>(7) 「1□37」が9の倍数</h3>
      <DigitSlider template="1□37" checker={(d) => (1 + d + 3 + 7) % 9 === 0} label="9の倍数か" />

      <h3>(8) 「683□8」が4の倍数</h3>
      <DigitSlider template="683□8" checker={(d) => Number(`${d}8`) % 4 === 0} label="4の倍数か" />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 選ぶ順序を，レ→レ→レ→ナ→ナ とします。樹形図より，<b>3通り</b></p>
        <p>(2) <sub>6</sub>C<sub>2</sub>＝6×5÷(2×1)＝<b>15(通り)</b></p>
        <p>(3) <sub>10</sub>C<sub>3</sub>＝10×9×8÷(3×2×1)＝<b>120(通り)</b></p>
        <p>(4) <sub>6</sub>C<sub>5</sub>＝6×5×4×3×2÷(5×4×3×2×1)＝<b>6(通り)</b>（余事象より，<sub>6</sub>C<sub>5</sub>＝<sub>6</sub>C<sub>1</sub>）</p>
        <p>(5) 5年生から1人選ぶ…<sub>4</sub>C<sub>1</sub>＝4(通り)。6年生から2人選ぶ…<sub>3</sub>C<sub>2</sub>＝3(通り)。これを組み合わせる方法は，4×3＝<b>12(通り)</b></p>
        <p>(6) 5個の箱のうち，2個に△が入り，残りの箱に自動的に○が入ります。△の入る2個の箱を選ぶ方法は，<sub>5</sub>C<sub>2</sub>＝<b>10(通り)</b></p>
        <p>(7) 9の倍数は「各位の和が9の倍数」である数です。1＋□＋3＋7＝11＋□ が9の倍数になるので，<b>□＝7</b></p>
        <p>(8) 4の倍数は「下2けたが4の倍数」である数です。下2けたの【□8】が4の倍数になるので，<b>□＝0，2，4，6，8</b></p>
        <p>(9) ① <sub>12</sub>C<sub>2</sub>＝12×11÷(2×1)＝<b>66(試合)</b>　② 12－1＝<b>11(試合)</b></p>
      </div>
    </div>
  )
}
