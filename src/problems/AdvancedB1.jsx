import { useMemo } from 'react'
import { pointAtDistance, distanceBetween } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

// 直方体ABCD-EFGH。AD=DH=16, GH=12, AF=20（3D座標）。
// 底面: A(0,0,0) B(12,0,0) C(12,16,0) D(0,16,0)　上面(高さ16): E,F,G,H
const A3 = { x: 0, y: 0, z: 0 }
const B3 = { x: 12, y: 0, z: 0 }
const C3 = { x: 12, y: 16, z: 0 }
const D3 = { x: 0, y: 16, z: 0 }
const E3 = { x: 0, y: 0, z: 16 }
const F3 = { x: 12, y: 0, z: 16 }
const G3 = { x: 12, y: 16, z: 16 }
const H3 = { x: 0, y: 16, z: 16 }

// 斜投影で2Dに変換（見た目用）。距離の計算は3D座標のまま行う。
const K = 0.55
const ANGLE = (30 * Math.PI) / 180
function project(p3) {
  return { x: p3.x + p3.z * K * Math.cos(ANGLE), y: p3.y + p3.z * K * Math.sin(ANGLE) }
}
function dist3(p1, p2) {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z)
}
// 3D頂点列を2D投影した点列に変換しつつ、区間の長さは3D距離で計算する特別版pointAtDistance
function pointAtDistance3D(vertices3D, dist, loop) {
  const segLens = []
  let total = 0
  for (let i = 0; i < vertices3D.length - 1; i++) {
    const len = dist3(vertices3D[i], vertices3D[i + 1])
    segLens.push(len)
    total += len
  }
  let d = dist
  if (loop) d = ((dist % total) + total) % total
  else d = Math.max(0, Math.min(dist, total))
  let acc = 0
  for (let i = 0; i < segLens.length; i++) {
    const segLen = segLens[i]
    if (d <= acc + segLen || i === segLens.length - 1) {
      const local = segLen === 0 ? 0 : Math.max(0, Math.min(1, (d - acc) / segLen))
      const p1 = vertices3D[i], p2 = vertices3D[i + 1]
      return {
        x: p1.x + (p2.x - p1.x) * local,
        y: p1.y + (p2.y - p1.y) * local,
        z: p1.z + (p2.z - p1.z) * local,
      }
    }
    acc += segLen
  }
  return { ...vertices3D[vertices3D.length - 1] }
}

const P_PATH = [A3, D3, G3, F3, A3] // 点P: A→D→G→F→A（長方形ADGF、周回）
const Q_PATH = [G3, D3, C3, G3] // 点Q: G→D→C→G（三角形CDG、周回）
const SPEED = 2
const T_MAX = 80

const SCALE = 9, PAD = 46
const toSvg = (p3) => {
  const p = project(p3)
  return { x: PAD + p.x * SCALE, y: PAD + (24 - p.y) * SCALE }
}

export default function AdvancedB1() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { loop: true })
  const P = useMemo(() => pointAtDistance3D(P_PATH, SPEED * t, true), [t])
  const Q = useMemo(() => pointAtDistance3D(Q_PATH, SPEED * t, true), [t])
  const meeting = distanceBetween(P, Q) < 0.5

  const corners = { A3, B3, C3, D3, E3, F3, G3, H3 }
  const s = Object.fromEntries(Object.entries(corners).map(([k, v]) => [k, toSvg(v)]))
  const sP = toSvg(P), sQ = toSvg(Q)
  const width = PAD * 2 + 24 * SCALE
  const height = PAD * 2 + 24 * SCALE

  const edge = (p1, p2, opts = {}) => (
    <line x1={s[p1].x} y1={s[p1].y} x2={s[p2].x} y2={s[p2].y} stroke="#333" strokeWidth="1.5" {...opts} />
  )

  return (
    <div className="problem">
      <h2>応用問題B-1　直方体の面上を動く2点（立体図形）</h2>
      <div className="statement">
        <p className="setup">
          右の図は，ＡＤ＝ＤＨ＝16cm，ＧＨ＝12cmの直方体ＡＢＣＤ－ＥＦＧＨで，ＡＦ＝20cmです。点Ｐと点Ｑが同時に
          出発して，どちらも秒速2cmの速さで，点Ｐは長方形ＡＤＧＦの周上を，点Ｑは三角形ＣＤＧの周上を次のように動きます。
        </p>
        <p style={{ margin: '0 0 10px 0' }}>
          点Ｐ：Ａ→Ｄ→Ｇ→Ｆ→Ａ→Ｄ→Ｇ→……　／　点Ｑ：Ｇ→Ｄ→Ｃ→Ｇ→Ｄ→……
        </p>
        <ol className="question-list">
          <li>点Ｐと点Ｑがはじめて重なるのは，2点が出発してから何秒後ですか。</li>
          <li>点Ｐと点Ｑが4回目に重なるのは，2点が出発してから何秒後ですか。</li>
        </ol>
      </div>
      <div className="stage">
        <svg width={width} height={height}>
          {edge('A3', 'B3')}{edge('B3', 'C3')}{edge('C3', 'D3')}{edge('D3', 'A3')}
          {edge('E3', 'F3')}{edge('F3', 'G3')}{edge('G3', 'H3')}{edge('H3', 'E3')}
          {edge('A3', 'E3', { strokeDasharray: '3 2' })}
          {edge('B3', 'F3')}
          {edge('C3', 'G3')}
          {edge('D3', 'H3', { strokeDasharray: '3 2' })}
          <polygon points={`${s.A3.x},${s.A3.y} ${s.D3.x},${s.D3.y} ${s.G3.x},${s.G3.y} ${s.F3.x},${s.F3.y}`}
            fill="rgba(66,153,225,0.15)" stroke="#3182ce" strokeWidth="1.5" />
          <polygon points={`${s.C3.x},${s.C3.y} ${s.D3.x},${s.D3.y} ${s.G3.x},${s.G3.y}`}
            fill="rgba(221,107,32,0.15)" stroke="#dd6b20" strokeWidth="1.5" />
          {Object.entries(s).map(([k, v]) => (
            <text key={k} x={v.x + 5} y={v.y - 4} fontSize="12">{k[0]}</text>
          ))}
          <text x={(s.A3.x + s.D3.x) / 2 - 18} y={(s.A3.y + s.D3.y) / 2 - 6} fontSize="10">16cm</text>
          <text x={s.D3.x + 4} y={(s.D3.y + s.H3.y) / 2} fontSize="10">16cm</text>
          <text x={(s.G3.x + s.H3.x) / 2 + 4} y={s.G3.y - 4} fontSize="10">12cm</text>
          <text x={(s.A3.x + s.F3.x) / 2 + 4} y={(s.A3.y + s.F3.y) / 2} fontSize="10">20cm</text>
          <circle cx={sP.x} cy={sP.y} r={5} fill="#3182ce" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sP.x + 8} y={sP.y + 12} fill="#3182ce" fontWeight="bold">P</text>
          <text x={sQ.x + 8} y={sQ.y + 12} fill="#dd6b20" fontWeight="bold">Q</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          {meeting && <p className="highlight">点Ｐと点Ｑが重なっています！</p>}
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        rate={rate} setRate={setRate}
        jumps={[
          { label: '(1) 1回目 9秒後', t: 9 },
          { label: '(2) 4回目 123秒後', t: 123 },
        ]}
      />
      <div className="explain">
        <h3>解説</h3>
        <p>点Ｐは1周に(16+20)×2÷2＝36秒、点Ｑは1周に(20+12+16)÷2＝24秒かかります。</p>
        <p>(1) 2点の速さが同じなので、辺ＤＧ上を同時に進む区間のちょうど真ん中の時間で出会います。1回目は<b>9秒後</b>です。</p>
        <p>(2) 36と24の最小公倍数72秒を1周期とすると、1周期に2回出会います。4回目は2周期目の2回目にあたり、<b>123秒後</b>です。</p>
      </div>
    </div>
  )
}
