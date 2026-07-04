import { useState } from 'react'

const STAGES1 = [
  {
    label: '傾ける前（空気の部分）',
    render: () => (
      <g>
        <rect x={20} y={20} width={180} height={20} fill="none" stroke="#4a5568" strokeWidth="2" />
        <rect x={20} y={20} width={180} height={20} fill="#fbd38d" opacity="0.7" />
        <text x={110} y={55} fontSize="11" textAnchor="middle">18×2（空気の部分の面積）</text>
      </g>
    ),
  },
  {
    label: 'ＣＤを水平に（45度かたむけた後）',
    render: () => (
      <g>
        <rect x={20} y={20} width={60} height={60} fill="none" stroke="#4a5568" strokeWidth="2" />
        <rect x={20} y={20} width={60} height={60} fill="#fbd38d" opacity="0.7" />
        <polygon points="80,20 200,20 80,140" fill="none" stroke="#4a5568" strokeWidth="2" />
        <polygon points="80,20 200,20 80,140" fill="#fbd38d" opacity="0.7" />
        <text x={50} y={95} fontSize="11" textAnchor="middle">6×6</text>
        <text x={140} y={70} fontSize="11" textAnchor="middle">12×12÷2</text>
      </g>
    ),
  },
]

const STAGES2 = [
  {
    label: 'ＡＢを水平に（図2）',
    render: () => (
      <g>
        <polygon points="20,140 80,140 20,20" fill="none" stroke="#4a5568" strokeWidth="2" />
        <polygon points="20,140 80,140 20,20" fill="#90cdf4" opacity="0.7" />
        <polygon points="80,140 110,140 80,80" fill="none" stroke="#4a5568" strokeWidth="2" />
        <polygon points="80,140 110,140 80,80" fill="#90cdf4" opacity="0.7" />
        <text x={45} y={110} fontSize="11" textAnchor="middle">6×12÷2</text>
        <text x={95} y={130} fontSize="10" textAnchor="middle">3×6÷2</text>
      </g>
    ),
  },
  {
    label: '再びＣＦを水平に（図3・点Ｐ）',
    render: () => (
      <g>
        <rect x={20} y={20} width={60} height={60} fill="none" stroke="#4a5568" strokeWidth="2" />
        <polygon points="80,20 80,80 20,80" fill="#90cdf4" opacity="0.5" />
        <text x={50} y={55} fontSize="11" textAnchor="middle">影の和45cm²</text>
        <text x={110} y={95} fontSize="10" textAnchor="middle">DP＝6+3/4cm</text>
      </g>
    ),
  },
]

export default function AdvancedA3() {
  const [s1, setS1] = useState(0)
  const [s2, setS2] = useState(0)

  return (
    <div className="problem">
      <h2>応用問題A-3　容器を2通りにかたむける</h2>
      <div className="statement">
        <p className="setup">
          直方体を組み合わせた形の容器に，上から2cmの高さまで水が入っています。
        </p>
        <ol className="question-list">
          <li>この容器を，辺ＣＦを床につけたまま，Ｄが床につくまで静かに右にかたむけました。このとき，こぼれた水の量は何cm3ですか。</li>
          <li>(1)の後，容器をもとの位置にもどしてから，今度は辺ＢＥを床につけたまま，Ａが床につくまで静かに左にかたむけました。そして，容器をもとの位置にもどしてから，再び辺ＣＦを床につけたまま，Ｄが床につくまで静かに右にかたむけました。このとき，水面は点Ｐのところにきました。ＤＰの長さは何cmですか。</li>
        </ol>
      </div>

      <h3>(1) 辺ＣＦを軸にかたむける（正面から見た「空気の部分」）</h3>
      <div className="jump-row">
        {STAGES1.map((s, i) => (
          <button key={s.label} className={`jump-btn${i === s1 ? ' active' : ''}`} onClick={() => setS1(i)}>{s.label}</button>
        ))}
      </div>
      <svg width={280} height={180} viewBox="0 0 220 160" className="tank-view">{STAGES1[s1].render()}</svg>

      <h3>(2) さらに別の辺を軸にかたむける</h3>
      <div className="jump-row">
        {STAGES2.map((s, i) => (
          <button key={s.label} className={`jump-btn${i === s2 ? ' active' : ''}`} onClick={() => setS2(i)}>{s.label}</button>
        ))}
      </div>
      <svg width={280} height={180} viewBox="0 0 220 160" className="tank-view">{STAGES2[s2].render()}</svg>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) ＣＤを水平にすると，三角形ＣＤＥは直角二等辺三角形なので，45度傾けたことがわかります。アどうし，イどうしの面積は同じなので，容器の半分が残ることがわかります。
          こぼれた水量は，空気部分の差に注目すると，傾ける前…18×2×5＝180(cm3)。傾けた後…(6×6＋12×12×1/2)×5＝540(cm3)。よって，こぼれた水の量は，540－180＝<b>360(cm3)</b>
        </p>
        <p>
          (2) ＡＢが水平になるように傾けると図2のようになります。このとき，影の部分の面積の和は，6×12×1/2＋3×6×1/2＝45(cm2)。図3の面積の和も45cm2で，斜線部分の面積は，45－6×6＝9(cm2)。
          斜線部分は平行四辺形でxの長さは，9÷12＝3/4(cm)。ＤＰの長さは，6＋3/4＝<b>6と3/4(cm)</b>
        </p>
      </div>
    </div>
  )
}
