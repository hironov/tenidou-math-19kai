import { useState } from 'react'

export default function Practice3() {
  const [d1, setD1] = useState(1)
  const [d2, setD2] = useState(3)
  const lo = Math.min(d1, d2)
  const hi = Math.max(d1, d2)
  const countA = lo
  const countB = hi - lo
  const countC = 5 - hi

  return (
    <div className="problem">
      <h2>練習問題3　同じコインを分ける（分配）</h2>
      <div className="statement">
        <p className="setup">5枚の同じコインを，Ａ，Ｂ，Ｃの3人で分けます。</p>
        <ol className="question-list">
          <li>全員，必ず1枚はもらえるとすると，分け方は何通りありますか。</li>
          <li>1枚ももらえない人がいてもよいとすると，分け方は何通りありますか。</li>
        </ol>
      </div>

      <p className="setup" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 14px' }}>
        コインを5枚ならべて置き，2本の仕切り線の位置をスライダーで動かして，Ａ・Ｂ・Ｃの受け取り枚数を確かめてみましょう（0枚も選べます）。
      </p>

      <svg width={340} height={70} className="tank-view">
        {Array.from({ length: 5 }, (_, i) => (
          <circle key={i} cx={30 + i * 50} cy={35} r={16} fill="#f6ad55" stroke="#c05621" strokeWidth="2" />
        ))}
        <line x1={5 + lo * 50} y1={5} x2={5 + lo * 50} y2={65} stroke="#e53e3e" strokeWidth="3" />
        <line x1={5 + hi * 50} y1={5} x2={5 + hi * 50} y2={65} stroke="#e53e3e" strokeWidth="3" />
      </svg>
      <div className="readout">
        <p>仕切り1：<input type="range" min={0} max={5} value={d1} onChange={(e) => setD1(parseInt(e.target.value, 10))} /> 仕切り2：<input type="range" min={0} max={5} value={d2} onChange={(e) => setD2(parseInt(e.target.value, 10))} /></p>
        <p>Ａ：<b>{countA}</b>枚　Ｂ：<b>{countB}</b>枚　Ｃ：<b>{countC}</b>枚　（合計{countA + countB + countC}枚）</p>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) まず，何枚ずつ分けるのかで場合分けします。分け方は，(1，1，3)(1，2，2)の2通りで，これをならべかえる方法を考えることで，Ａ，Ｂ，Ｃに何枚ずつ分けたかを求めることができます。
          (1，1，3) → 誰が3枚もらうかを考えればよいので，3通り。(1，2，2) → 誰が1枚もらうかを考えればよいので，3通り。よって，3＋3＝<b>6(通り)</b>
        </p>
        <p>
          (2) 分け方は，(1)で求めたもの以外に，(0，0，5)(0，1，4)(0，2，3)があります。(0，0，5) → 3通り。(0，1，4) → 3×2×1＝6通り。(0，2，3) → 3×2×1＝6通り。
          以上より，6＋3＋6＋6＝<b>21(通り)</b>
        </p>
      </div>
    </div>
  )
}
