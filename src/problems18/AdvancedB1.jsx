import { useState } from 'react'
import { harmonicTriangleValue, gcd } from '../utils/sequence'
import { FractionText } from '../components/FractionText'
import { NControl } from '../components/NControl'

function rowSum(row) {
  let num = 0, den = 1
  for (let pos = 1; pos <= row; pos++) {
    const f = harmonicTriangleValue(row, pos)
    // num/den + f.num/f.den
    const newDen = den * f.den / gcd(den, f.den)
    num = num * (newDen / den) + f.num * (newDen / f.den)
    den = newDen
    const g = gcd(num, den)
    num /= g; den /= g
  }
  return { num, den }
}

export default function AdvancedB1() {
  const [row, setRow] = useState(6)
  const rows = Array.from({ length: 7 }, (_, i) => i + 1)
  const sum = rowSum(row)

  return (
    <div className="problem">
      <h2>応用問題B-1　分数の三角形</h2>
      <div className="statement">
        <p className="setup">
          右のように，三角形状に分数がならんでいます。数のならびは，次の規則にしたがっています。
        </p>
        <p style={{ margin: '0 0 10px 0' }}>
          規則Ａ：それぞれの行の左はしの数と右はしの数は，その行番号の逆数である。<br />
          規則Ｂ：それぞれの数は，その数の左下の数と右下の数の和である。
        </p>
        <ol className="question-list">
          <li>行番号6の左から4番目の数を求めなさい。</li>
          <li>行番号7にあるすべての数の和を求めなさい。</li>
          <li>行番号9にあるすべての数の和は83/315であることがわかっています。行番号10にあるすべての数の和を求めなさい。</li>
        </ol>
      </div>

      <div className="pascal-wrap">
        {rows.map((r) => (
          <div key={r} className="pascal-row">
            {Array.from({ length: r }, (_, i) => i + 1).map((p) => {
              const f = harmonicTriangleValue(r, p)
              return (
                <div key={p} className={`pascal-cell${r === row ? ' pascal-hi' : ''}`}>
                  <FractionText num={f.num} den={f.den} />
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="readout">
        <p>行番号{row}の和：<FractionText num={sum.num} den={sum.den} /></p>
      </div>
      <NControl n={row} setN={setRow} min={1} max={7} label="行番号"
        jumps={[{ label: '(1) 6行目', n: 6 }, { label: '(2) 7行目', n: 7 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) きまりにしたがって書き出していくと，行番号6の左から4番目は，<b>1/60</b>です。</p>
        <p>
          (2) 下の行の和から上の行の和を逆算できます。行番号5の和は8/15，行番号6の和は13/30，
          行番号7の和は<b>151/420</b>です。
        </p>
        <p>(3) 同じように，行番号10の和は，(83/315＋1/10×2)÷2＝<b>73/315</b>です。</p>
      </div>
    </div>
  )
}
