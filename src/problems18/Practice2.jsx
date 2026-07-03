import { useState } from 'react'
import { triangular } from '../utils/sequence'
import { NControl } from '../components/NControl'

function groupOf(g) {
  const startIndex = triangular(g - 1) + 1
  return Array.from({ length: g }, (_, i) => 2 * (startIndex + i) - 1)
}

export default function Practice2() {
  const [g, setG] = useState(9)
  const group = groupOf(g)
  const sum = group.reduce((a, b) => a + b, 0)

  return (
    <div className="problem">
      <h2>練習問題2　奇数を組に分ける</h2>
      <div className="statement">
        <p className="setup">あるきまりにしたがって，下のように奇数をならべて組に分けます。</p>
        <p style={{ fontWeight: 'bold', margin: '0 0 10px 0' }}>1｜3，5｜7，9，11｜13，15，17，19｜21，23，25，27，29｜31，33，……</p>
        <p style={{ margin: '0 0 10px 0' }}>（1組　2組　3組　4組　5組　6組）</p>
        <ol className="question-list">
          <li>9組の左から3番目の整数はいくつですか。</li>
          <li>13組にふくまれる整数の和はいくつですか。</li>
        </ol>
      </div>

      <div className="readout">
        <p>{g}組：<b>{group.join('，')}</b>（和：{sum}）</p>
      </div>
      <NControl n={g} setN={setG} min={1} max={16} label="組" jumps={[{ label: '(1) 9組', n: 9 }, { label: '(2) 13組', n: 13 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>各組の数字の個数は，組の数と等しくなっています。</p>
        <p>
          (1) 9組の左から3番目は，数列全体の1＋2＋3＋……＋8＋3＝39(番目)。求めるのは39番目の奇数なので，39×2－1＝<b>77</b>。
        </p>
        <p>
          (2) 12組の最後尾は78番目，13組の最後尾は91番目より，79番目から91番目までの13個の和を求めます。
          79番目の奇数は157，91番目の奇数は181なので，(157＋181)×13÷2＝<b>2197</b>。
        </p>
      </div>
    </div>
  )
}
