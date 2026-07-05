import { useState } from 'react'
import { TreeDiagram } from '../components/TreeDiagram'
import { ComboPicker } from '../components/ComboPicker'
import { SlotSequence } from '../components/SlotSequence'

const COIN_TREE = {
  label: '選ぶ',
  children: [
    { label: '10円', children: [{ label: '100円' }, { label: '500円' }] },
    { label: '100円', children: [{ label: '100円' }, { label: '500円' }] },
    { label: '500円', children: [{ label: '500円' }] },
  ],
}

const FRUITS = ['リンゴ', 'ミカン', 'イチゴ', 'メロン'].map((l) => ({ id: l, label: l }))
const PEOPLE7 = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((l) => ({ id: l, label: l }))
const PEOPLE6 = ['A', 'B', 'C', 'D', 'E', 'F'].map((l) => ({ id: l, label: l }))
const MARKS = [{ key: '☆', label: '☆', count: 3, swatch: '#f6ad55' }, { key: '◇', label: '◇', count: 3, swatch: '#63b3ed' }]
const BOYS = ['A', 'B', 'C'].map((l) => ({ id: l, label: l }))
const GIRLS = ['P', 'Q', 'R', 'S'].map((l) => ({ id: l, label: l }))

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

export default function Basic3() {
  const [step, setStep] = useState('4')

  return (
    <div className="problem">
      <h2>基本問題3　組み合わせいろいろ</h2>
      <div className="statement">
        <p className="setup">次の問いに答えなさい。</p>
        <ol className="question-list">
          <li>10円玉が1枚，100円玉が2枚，500円玉が2枚あります。これらの5枚の硬貨から2枚を選ぶとき，硬貨の組み合わせは何通りありますか。</li>
          <li>リンゴ，ミカン，イチゴ，メロンが1個ずつあります。この中から2個を選ぶとき，組み合わせは何通りありますか。</li>
          <li>Ａ，Ｂ，Ｃ，Ｄ，Ｅ，Ｆ，Ｇの7人からそうじ当番を3人選びます。そうじ当番の組み合わせは何通りありますか。</li>
          <li>Ａ，Ｂ，Ｃ，Ｄ，Ｅ，Ｆの6人の中から班長を1人，副班長を2人選ぶ方法は何通りありますか。</li>
          <li>{'{☆，☆，☆，◇，◇，◇}'}の6個の記号を横1列にならべます。ならべ方は何通りありますか。</li>
          <li>Ａ，Ｂ，Ｃの3人の男子とＰ，Ｑ，Ｒ，Ｓの4人の女子がいます。男子から2人，女子から1人の合計3人を体育係として選ぶ方法は何通りありますか。</li>
          <li>5けたの整数「2□416」が9の倍数になるとき，□にあてはまる数字を答えなさい。</li>
        </ol>
      </div>

      <h3>(1) 硬貨2枚の組み合わせ（樹形図）</h3>
      <TreeDiagram root={COIN_TREE} />

      <h3>(2) くだもの2個</h3>
      <ComboPicker items={FRUITS} pickCount={2} totalLabel="6通り" />

      <h3>(3) そうじ当番3人</h3>
      <ComboPicker items={PEOPLE7} pickCount={3} totalLabel="35通り" />

      <h3>(4) 班長1人・副班長2人</h3>
      <div className="jump-row">
        <button className={`jump-btn${step === '4' ? ' active' : ''}`} onClick={() => setStep('4')}>まず班長を決める</button>
      </div>
      <ComboPicker items={PEOPLE6} pickCount={1} totalLabel="6通り（班長）" />
      <p style={{ fontSize: '0.85rem', color: '#4a5568' }}>班長を除いた5人から副班長2人を選ぶ組み合わせは<sub>5</sub>C<sub>2</sub>＝10通り。あわせて6×10＝60通り。</p>

      <h3>(5) ☆3個・◇3個をならべる</h3>
      <SlotSequence slotCount={6} colors={MARKS} />

      <h3>(6) 体育係（男子2人＋女子1人）</h3>
      <div className="stage">
        <div>
          <p style={{ fontWeight: 'bold', marginBottom: 6 }}>男子から2人</p>
          <ComboPicker key="boys" items={BOYS} pickCount={2} totalLabel="3通り" />
        </div>
        <div>
          <p style={{ fontWeight: 'bold', marginBottom: 6 }}>女子から1人</p>
          <ComboPicker key="girls" items={GIRLS} pickCount={1} totalLabel="4通り" />
        </div>
      </div>

      <h3>(7) 「2□416」が9の倍数</h3>
      <DigitSlider template="2□416" checker={(d) => (2 + d + 4 + 1 + 6) % 9 === 0} label="9の倍数か" />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 区別できないものが複数個あるので，樹形図で考えます。以上より，<b>5通り</b></p>
        <p>(2) すべて1個ずつで区別できるので，コンビネーションを用います。<sub>4</sub>C<sub>2</sub>＝4×3÷(2×1)＝<b>6(通り)</b></p>
        <p>(3) <sub>7</sub>C<sub>3</sub>＝7×6×5÷(3×2×1)＝<b>35(通り)</b></p>
        <p>(4) 班長を選ぶ方法は6通り，残った5人の中から2人の副班長を選ぶ方法は，<sub>5</sub>C<sub>2</sub>＝10通りあるので，6×10＝<b>60(通り)</b></p>
        <p>(5) 6個の箱のうち，3個の☆が入る箱を選ぶ方法を考えればよいので，<sub>6</sub>C<sub>3</sub>＝6×5×4÷(3×2×1)＝<b>20(通り)</b></p>
        <p>(6) 3人の男子から2人を選ぶ方法は，<sub>3</sub>C<sub>2</sub>＝3通り，4人の女子から1人を選ぶ方法は4通りなので，3×4＝<b>12(通り)</b>（3人から2人を決めることは，選ばれなかった1人を決めることと同じですから，<sub>3</sub>C<sub>2</sub>＝<sub>3</sub>C<sub>1</sub>）</p>
        <p>(7) 9の倍数は，「各位の数字の和が9の倍数」である数です。2＋□＋4＋1＋6＝□＋13 が9の倍数となるような□は，<b>5</b>です。</p>
      </div>
    </div>
  )
}
