import { useMemo } from 'react'
import { pointAtDistance, distanceBetween } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

// 正方形ABCD、1辺75cm（解説で求まる値）。A(0,75)-B(0,0)-C(75,0)-D(75,75)
const SIDE = 75
const A = { x: 0, y: SIDE }
const B = { x: 0, y: 0 }
const C = { x: SIDE, y: 0 }
const D = { x: SIDE, y: SIDE }
const P_PATH = [A, B, C, D, A] // 点P: A→B→C→D→A
const Q_PATH = [D, C, B, A, D] // 点Q: D→C→B→A→D（Pと逆向き）
const P_SPEED = 9
const Q_SPEED = 6
const T_MAX = 60

const SCALE = 4.6, PAD = 40, MATH_H = SIDE
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

// 静止図は辺の長さが未知（求める値）なので、正方形の見た目だけの簡易図にする。
const SG_SIZE = 90
const gA2 = { x: 12, y: 12 }, gB2 = { x: 12, y: SG_SIZE - 12 }
const gC2 = { x: SG_SIZE - 12, y: SG_SIZE - 12 }, gD2 = { x: SG_SIZE - 12, y: 12 }

export default function AdvancedA2() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { loop: true })
  const P = useMemo(() => pointAtDistance(P_PATH, P_SPEED * t, true), [t])
  const Q = useMemo(() => pointAtDistance(Q_PATH, Q_SPEED * t, true), [t])
  const meeting = distanceBetween(P, Q) < 0.6

  const sA = toSvg(A), sB = toSvg(B), sC = toSvg(C), sD = toSvg(D), sP = toSvg(P), sQ = toSvg(Q)
  const width = PAD * 2 + SIDE * SCALE
  const height = PAD * 2 + SIDE * SCALE

  return (
    <div className="problem">
      <h2>応用問題A-2　正方形の辺の長さを求める（出会いの時間から逆算）</h2>
      <div className="statement">
        <div className="statement-row">
          <div className="statement-text">
        <p className="setup">
          右の図のような正方形ＡＢＣＤがあります。点ＰはＡを出発して秒速9cmで，点ＱはＤを出発して秒速6cmで，
          それぞれ矢印の方向に辺上をまわり続けます。点Ｐと点Ｑが3回目に重なるのは，出発してから55秒後です。
        </p>
        <ol className="question-list">
          <li>正方形ＡＢＣＤの1辺の長さは何cmですか。</li>
        </ol>
          </div>
          <svg className="statement-figure" width={SG_SIZE} height={SG_SIZE}>
            <polygon points={`${gA2.x},${gA2.y} ${gB2.x},${gB2.y} ${gC2.x},${gC2.y} ${gD2.x},${gD2.y}`} fill="none" stroke="#333" strokeWidth="1.5" />
            <text x={gA2.x - 12} y={gA2.y - 2} fontSize="11">A</text>
            <text x={gB2.x - 12} y={gB2.y + 12} fontSize="11">B</text>
            <text x={gC2.x + 4} y={gC2.y + 12} fontSize="11">C</text>
            <text x={gD2.x + 4} y={gD2.y - 2} fontSize="11">D</text>
          </svg>
        </div>
      </div>
      <div className="stage">
        <svg width={width} height={height}>
          <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y} ${sD.x},${sD.y}`} fill="none" stroke="#333" strokeWidth="2" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#3182ce" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sA.x - 14} y={sA.y - 6}>A</text>
          <text x={sB.x - 14} y={sB.y + 16}>B</text>
          <text x={sC.x + 6} y={sC.y + 16}>C</text>
          <text x={sD.x + 6} y={sD.y - 6}>D</text>
          <text x={sP.x + 8} y={sP.y + 4} fill="#3182ce" fontWeight="bold">P</text>
          <text x={sQ.x + 8} y={sQ.y - 6} fill="#dd6b20" fontWeight="bold">Q</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後（正方形の1辺＝75cmとして表示）</p>
          {meeting && <p className="highlight">点Ｐと点Ｑが重なっています！</p>}
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        rate={rate} setRate={setRate}
        jumps={[
          { label: '1回目 15秒後', t: 15 },
          { label: '2回目 35秒後', t: 35 },
          { label: '3回目 55秒後', t: 55 },
        ]}
      />
      <div className="explain">
        <h3>解説</h3>
        <p>
          正方形の1辺を①とすると、1回目に重なるまでに2点が進む長さの和は③、それ以降は④ごとに重なります。
          1回目の時間を③秒後とすると、3回目は③+④×2＝⑪(秒後)。これが55秒にあたるので、①＝55÷11＝<b>5秒</b>。
        </p>
        <p>③＝5×3＝15秒なので、正方形の1辺の長さは、(9+6)×15÷3＝<b>75cm</b>です。</p>
      </div>
    </div>
  )
}
