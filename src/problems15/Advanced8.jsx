import { useState } from 'react'

const POSTS = [
  { pos: 0, label: 'A', phase: 0 },
  { pos: 230, label: 'B', phase: 20 },
  { pos: 460, label: 'C', phase: 40 },
  { pos: 690, label: 'D', phase: 0 },
]
const PERIOD = 60
const GREEN = 28
const T_MAX = 140

function waitAtSignal(arrival, phase, period, green) {
  const cycle = ((arrival - phase) % period + period) % period
  if (cycle < green) return arrival
  return arrival + (period - cycle)
}

// 復路：Dを出発してA方向へ一定の速さvで進む（信号はB,C,Aの順に通過）
function computeReturnTrip(speed) {
  const stops = [POSTS[2], POSTS[1], POSTS[0]] // C, B, A
  let t = 0
  let prevPos = POSTS[3].pos
  const arrivals = []
  for (const post of stops) {
    const arrive = t + (prevPos - post.pos) / speed
    const depart = waitAtSignal(arrive, post.phase, PERIOD, GREEN)
    arrivals.push({ label: post.label, arrive, depart })
    t = depart
    prevPos = post.pos
  }
  return arrivals
}

function posAtReturn(speed, arrivals, tt) {
  let prevPos = POSTS[3].pos
  let prevT = 0
  for (let i = 0; i < arrivals.length; i++) {
    const { arrive, depart } = arrivals[i]
    const post = [POSTS[2], POSTS[1], POSTS[0]][i]
    if (tt <= arrive) return prevPos - speed * (tt - prevT)
    if (tt <= depart) return post.pos
    prevT = depart
    prevPos = post.pos
  }
  return prevPos
}

function redBands(phase, period, green, tMax) {
  const bands = []
  let t = phase + green
  while (t < tMax) { bands.push([t, Math.min(tMax, t + (period - green))]); t += period }
  return bands
}

const WIDTH = 640
const HEIGHT = 320
const PAD = { l: 46, r: 16, t: 16, b: 30 }
const W = WIDTH - PAD.l - PAD.r
const H = HEIGHT - PAD.t - PAD.b
const sx = (t) => PAD.l + (t / T_MAX) * W
const sy = (pos) => PAD.t + H - (pos / 690) * H

export default function Advanced8() {
  const [speed, setSpeed] = useState(5.75)
  const arrivals = computeReturnTrip(speed)
  const N = 300
  const pts = []
  for (let i = 0; i <= N; i++) { const tt = (T_MAX * i) / N; pts.push([tt, posAtReturn(speed, arrivals, tt)]) }
  const pathD = pts.map(([tt, pp], i) => `${i === 0 ? 'M' : 'L'} ${sx(tt).toFixed(1)} ${sy(pp).toFixed(1)}`).join(' ')

  return (
    <div className="problem">
      <h2>最難関問題集8　信号にとまらず進める速さ（4地点）</h2>
      <div className="statement">
        <p className="setup">
          一直線の道路上に，Ａ，Ｂ，Ｃ，Ｄの4地点が，この順に230mずつはなれて並んでいます（ＡＤ間690m）。Ｂ，Ｃ，Ｄにはそれぞれ信号があり，どの信号も28秒青，32秒赤(周期60秒)をくり返します。
          Ａ地点をちょうど信号が青に変わった瞬間に出発し，一定の速さ分速11.5mで進んだ車は，ＢとＣの信号のどちらにもとまらずにＤまで進むことができました。
        </p>
        <ol className="question-list">
          <li>Ｄ地点をちょうど信号が青に変わった瞬間に出発し，Ａ方向に一定の速さで戻る車が，ＣとＢの信号にとまらずにＡまで進めるもっとも速い速さは，秒速何mですか。</li>
        </ol>
      </div>

      <div className="readout">
        <p>復路の速さ：秒速 <b>{speed}</b> m　（赤い帯＝信号が赤の時間帯）</p>
        {arrivals.map((a) => (
          <p key={a.label}>
            {a.label}地点：{a.arrive.toFixed(2)}秒後に到着
            {a.depart > a.arrive + 0.001 ? `（赤信号のため${a.depart.toFixed(2)}秒後まで待機）` : '（青信号で通過）'}
          </p>
        ))}
      </div>

      <div className="jump-row">
        {[4, 5, 5.75, 6.5].map((v) => (
          <button key={v} className={`jump-btn${speed === v ? ' active' : ''}`} onClick={() => setSpeed(v)}>秒速{v}m</button>
        ))}
      </div>
      <input type="range" min={4} max={7} step={0.05} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} style={{ width: '100%', marginTop: 8 }} />

      <div className="graph-block">
        <h3>ダイヤグラム（復路，赤信号帯つき）</h3>
        <svg width={WIDTH} height={HEIGHT} className="value-graph">
          <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + H} stroke="#888" />
          <line x1={PAD.l} y1={PAD.t + H} x2={PAD.l + W} y2={PAD.t + H} stroke="#888" />
          {[POSTS[0], POSTS[1], POSTS[2]].map((p) => (
            redBands(p.phase, PERIOD, GREEN, T_MAX).map(([t0, t1], i) => (
              <line key={`${p.label}${i}`} x1={sx(t0)} y1={sy(p.pos)} x2={sx(t1)} y2={sy(p.pos)} stroke="#e53e3e" strokeWidth="5" />
            ))
          ))}
          <path d={pathD} fill="none" stroke="#3182ce" strokeWidth="2.5" />
          {POSTS.map((p) => <text key={p.label} x={4} y={sy(p.pos) - 6} fontSize="10">{p.label}({p.pos})</text>)}
          <text x={PAD.l + W} y={PAD.t + H + 16} fontSize="10" textAnchor="end">(秒)</text>
        </svg>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          Ａを出発してから，Ｂ(230÷11.5＝20秒後)，Ｃ(460÷11.5＝40秒後)にちょうど青に変わった瞬間に着くので，Ｂの信号は出発の20秒後，Ｃの信号は出発の40秒後に青に変わることがわかります(Ｄの信号はＡと同じ0秒)。
        </p>
        <p>
          復路では，Ｃまでにかかった時間をｘ秒とすると，Ｂまでは2ｘ秒，Ａまでは3ｘ秒かかります。この3つの時間が，それぞれの信号が青である時間帯におさまるように，速さをおそくしていくと考えます。
        </p>
        <p>
          Ｃの信号（60秒ごとの[40,68)秒＝[40,60)と[0,8)が青）に間に合う中でもっとも小さいｘは40。このときＢの信号での時刻は2×40＝80秒 ⇒ 60でわった余りは20秒で，Ｂの信号が青になる瞬間とちょうど一致します。
          さらにＡの信号での時刻は3×40＝120秒 ⇒ 60でわった余りは0秒で，Ａの信号が青になる瞬間ともちょうど一致します。
        </p>
        <p>ｘ＝40(秒)のときが，とまらずに進める中でもっとも速い場合なので，もっとも速い速さは，230÷40＝<b>秒速5.75m</b>です。</p>
      </div>
    </div>
  )
}
