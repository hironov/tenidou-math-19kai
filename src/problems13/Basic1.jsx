function MiniGraph({ points, xMax, yMax, marks, width = 260, height = 180 }) {
  const pad = { l: 40, r: 16, t: 14, b: 26 }
  const w = width - pad.l - pad.r
  const h = height - pad.t - pad.b
  const sx = (x) => pad.l + (x / xMax) * w
  const sy = (y) => pad.t + h - (y / yMax) * h
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.x)} ${sy(p.y)}`).join(' ')
  return (
    <svg width={width} height={height} className="value-graph">
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={pad.t + h} stroke="#888" />
      <line x1={pad.l} y1={pad.t + h} x2={pad.l + w} y2={pad.t + h} stroke="#888" />
      <path d={d} fill="none" stroke="#3182ce" strokeWidth="2" />
      {marks.map((m, i) => (
        <g key={i}>
          <line x1={sx(m.x)} y1={pad.t} x2={sx(m.x)} y2={pad.t + h} stroke="#cbd5e0" strokeDasharray="2 3" />
          <line x1={pad.l} y1={sy(m.y)} x2={pad.l + w} y2={sy(m.y)} stroke="#cbd5e0" strokeDasharray="2 3" />
          <text x={sx(m.x)} y={pad.t + h + 14} fontSize="9" textAnchor="middle">{m.xLabel ?? m.x}</text>
          <text x={pad.l - 4} y={sy(m.y) + 3} fontSize="9" textAnchor="end">{m.yLabel ?? m.y}</text>
        </g>
      ))}
      <text x={4} y={pad.t - 2} fontSize="10">(m)</text>
      <text x={pad.l + w} y={pad.t + h + 16} fontSize="10" textAnchor="end">(分)</text>
    </svg>
  )
}

export default function Basic1() {
  return (
    <div className="problem">
      <h2>基本問題1　速さの計算いろいろ</h2>
      <div className="statement">
        <p className="setup">次の問いに答えなさい。</p>
        <ol className="question-list">
          <li>① 分速45m＝秒速□cm　② 分速90m＝時速□km　③ 時速43.2km＝秒速□m</li>
          <li>分速80mで35分歩くと，何km進みますか。</li>
          <li>50秒で1.4km進む電車の速さは，秒速何mですか。</li>
          <li>300mの道のりを秒速1.2mで歩くと，何分何秒かかりますか。</li>
          <li>時速40kmで走る自動車は，6分で何km進みますか。</li>
          <li>20分で4km進む自転車の速さは，時速何kmですか。</li>
          <li>7kmの道のりを時速4kmで歩くと，何時間何分かかりますか。</li>
          <li>下のグラフはそれぞれ，一定の速さで歩いたときの時間ときょりの関係を表したものです。ア，イにあてはまる数をそれぞれ求めなさい。</li>
          <li>460mの道のりを，はじめは分速40mで，途中からは分速50mで歩いたところ，全部で10分かかりました。分速50mで歩いた時間は何分ですか。</li>
        </ol>
      </div>

      <div className="explain">
        <h3>(1)〜(7) の解説</h3>
        <p>(1)① 45m＝4500cm より，4500÷60＝<b>75(cm/秒)</b></p>
        <p>② 90×60＝5400(m) より，<b>時速5.4km</b></p>
        <p>③ 43.2÷3.6＝<b>12(m/秒)</b></p>
        <p>(2) 80×35＝2800(m) ⇒ <b>2.8(km)</b></p>
        <p>(3) 1.4km＝1400m より，1400÷50＝<b>28(m/秒)</b></p>
        <p>(4) 300÷1.2＝250(秒)。250÷60＝4あまり10 より，<b>4分10秒</b></p>
        <p>(5) 40×1/10＝<b>4(km)</b></p>
        <p>(6) 4÷20/60＝<b>12(km/時)</b></p>
        <p>(7) 7÷4＝1と3/4(時間)。3/4×60＝45(分) より，<b>1時間45分</b></p>
      </div>

      <h3>(8) グラフの読み取り</h3>
      <div className="stage">
        <div>
          <p style={{ textAlign: 'center', marginBottom: 4 }}>①</p>
          <MiniGraph points={[{ x: 0, y: 0 }, { x: 8, y: 480 }]} xMax={8} yMax={500}
            marks={[{ x: 5, y: 300, xLabel: '5', yLabel: '300' }, { x: 8, y: 480, xLabel: '8', yLabel: 'ア' }]} />
        </div>
        <div>
          <p style={{ textAlign: 'center', marginBottom: 4 }}>②</p>
          <MiniGraph points={[{ x: 0, y: 900 }, { x: 18, y: 0 }]} xMax={18} yMax={900}
            marks={[{ x: 6, y: 600, xLabel: 'イ', yLabel: '600' }, { x: 18, y: 0, xLabel: '18', yLabel: '0' }]} />
        </div>
      </div>

      <div className="explain">
        <h3>(8)(9) の解説</h3>
        <p>① 300÷5＝60(m/分)。60×8＝<b>480</b> …ア</p>
        <p>② 900÷18＝50(m/分)。(900－600)÷50＝<b>6</b> …イ</p>
        <p>(9) (460－40×10)÷(50－40)＝<b>6(分)</b></p>
      </div>
    </div>
  )
}
