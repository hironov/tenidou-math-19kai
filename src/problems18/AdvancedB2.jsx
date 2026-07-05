import { useState } from 'react'
import { spiralSquareValue, gcd } from '../utils/sequence'
import { FractionText } from '../components/FractionText'
import { NControl } from '../components/NControl'
import { NumberTable } from '../components/NumberTable'

// 表2（丸番号）は例題4と同じらせん型。行＝分母，列＝分子として考える。
function circledNumberOf(denomReduced, numerReduced) {
  return spiralSquareValue(denomReduced, numerReduced)
}

// ①②③……の丸数字表示（21以上はCJKの丸数字を使用）
const CIRCLED_1_20 = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳']
function circledDigit(n) {
  if (n >= 1 && n <= 20) return CIRCLED_1_20[n - 1]
  if (n >= 21 && n <= 35) return String.fromCodePoint(0x3251 + (n - 21))
  return `(${n})`
}

// 表（約分前）のr行c列＝分母r，分子cのマス。番号は例題4と同じらせん規則で
// 「約分前」のr，cから直接求め，表示する値だけを約分する。
function cellAt(r, c) {
  const g = gcd(r, c)
  const rn = c / g
  const rd = r / g
  const n = spiralSquareValue(r, c)
  return { value: <FractionText num={rn} den={rd} />, sub: circledDigit(n) }
}

export default function AdvancedB2() {
  const [num, setNum] = useState(6)
  const [den, setDen] = useState(7)
  const g = gcd(num, den)
  const reducedNum = num / g
  const reducedDen = den / g
  const circled = circledNumberOf(reducedDen, reducedNum)

  return (
    <div className="problem">
      <h2>応用問題B-2　番号をつけた分数の表</h2>
      <div className="statement">
        <p className="setup">
          あるきまりにしたがって，右のように整数や分数（約分したもの）をならべ，それらの数に，①，②，③，……と番号をつけました。
          表のたてが分母，横が分子を表す「約分前の表」を考えると，①②⑤⑩……という並び方は，例題4の数表とまったく同じ規則です。
        </p>
        <ol className="question-list">
          <li>6/7につけた最小の番号を答えなさい。</li>
          <li>番号①から番号④までの数にふくまれる整数だけを加えると4になります。番号①から番号⑩までの数にふくまれる整数だけを加えると，その和はいくつになりますか。</li>
          <li>番号①から番号50までの数を加えると，その和はいくつになりますか。</li>
        </ol>
      </div>

      <NumberTable rows={6} cols={6} rowLabel="段目（分母）" colLabel="列目（分子）"
        cell={(r, c) => cellAt(r, c)}
        highlight={den <= 6 && num <= 6 ? { r: den, c: num } : null} />

      <div className="readout">
        <p>
          分子：<input type="number" min={1} max={20} value={num} className="n-input"
            onChange={(e) => setNum(Math.max(1, parseInt(e.target.value, 10) || 1))} />
          ／ 分母：<input type="number" min={1} max={20} value={den} className="n-input"
            onChange={(e) => setDen(Math.max(1, parseInt(e.target.value, 10) || 1))} />
        </p>
        <p>
          <FractionText num={num} den={den} />　＝（約分すると）<FractionText num={reducedNum} den={reducedDen} />
        </p>
        <p>最小の番号：<b>{circled}</b>（{reducedDen}段目の{reducedNum}列目に相当）</p>
      </div>
      <NControl n={num} setN={setNum} min={1} max={20} label={`分子＝${num}`} jumps={[{ label: '6/7 の分子', n: 6 }]} />
      <NControl n={den} setN={setDen} min={1} max={20} label={`分母＝${den}`} jumps={[{ label: '6/7 の分母', n: 7 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>
          約分する前の表は，たての段が「分母」，横の列が「分子」を表します。6/7は7段目の6列目にあるということです。
          番号だけをならべた表は，1列目の数が平方数になっている数表（例題4と同じ）なので，7段目の1列目は7×7＝49。
          7段目の6列目は49より右に5マス戻るので，<b>44</b>。
        </p>
        <p>
          (2) 各段のうち，整数になるのは分母が1になる位置だけです。1段目はすべて整数(1〜10で55)，2段目は偶数番目のみ，……と数えると，
          番号①〜⑩までの整数の和は，1＋2＋3＋4＋5＝<b>15</b>。
        </p>
        <p>
          (3) 50＝7×7＋1より，たて7マス・横7マスの正方形と番号50の分数の和を求めます。7段目までの全ての和は28×(1＋1/2＋…＋1/7)＝72.6。
          番号50は1段目の8列目なので8/1＝8。よって，72.6＋8＝<b>80.6</b>。
        </p>
      </div>
    </div>
  )
}
