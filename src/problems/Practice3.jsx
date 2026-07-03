import { useMemo } from 'react'
import { pointAtDistance, distanceBetween } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

// 正三角形ABC、1辺21cm。B(0,0)-C(21,0)-A(10.5, 10.5*sqrt3)
const SIDE = 21
const B = { x: 0, y: 0 }
const C = { x: SIDE, y: 0 }
const A = { x: SIDE / 2, y: (SIDE * Math.sqrt(3)) / 2 }
const P_PATH = [A, B, C, A] // 点P: A→B→C→A（周回）
const Q_PATH = [B, C, A, B] // 点Q: B→C→A→B（Pと同じ向き）
const P_SPEED = 7
const Q_SPEED = 3
const T_MAX = 220

const SCALE = 9, PAD = 40, MATH_H = A.y
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

const SS = 4.5, SPD = 16
const toStatic = (p) => ({ x: SPD + p.x * SS, y: SPD + (MATH_H - p.y) * SS })
const gA = toStatic(A), gB = toStatic(B), gC = toStatic(C)
const SW = SPD * 2 + SIDE * SS, SH = SPD * 2 + MATH_H * SS

export default function Practice3() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { loop: true })
  const P = useMemo(() => pointAtDistance(P_PATH, P_SPEED * t, true), [t])
  const Q = useMemo(() => pointAtDistance(Q_PATH, Q_SPEED * t, true), [t])
  const bp = distanceBetween(B, P)
  const bq = distanceBetween(B, Q)
  const isEquilateral = Math.abs(bp - bq) < 0.2 && bp > 0.5

  const sA = toSvg(A), sB = toSvg(B), sC = toSvg(C), sP = toSvg(P), sQ = toSvg(Q)
  const width = PAD * 2 + SIDE * SCALE
  const height = PAD * 2 + MATH_H * SCALE
  const atB = (pt) => distanceBetween(pt, B) < 0.3

  return (
    <div className="problem">
      <h2>練習問題3　正三角形の辺上を動く2点</h2>
      <div className="statement">
        <div className="statement-row">
          <div className="statement-text">
            <p className="setup">
              右の図のような正三角形ＡＢＣがあります。点ＰはＡを出発して秒速7cmで，点ＱはＢを出発して秒速3cmで，
              それぞれ矢印の方向に辺上をまわり続けます。いま，点Ｐと点Ｑが同時に出発しました。これについて，次の問いに答えなさい。
            </p>
            <ol className="question-list">
              <li>三角形ＰＢＱがはじめて正三角形になるのは，2点が出発してから何秒後ですか。</li>
              <li>点Ｐと点Ｑが4回目にＢを同時に通過するのは，2点が出発してから何秒後ですか。</li>
            </ol>
          </div>
          <svg className="statement-figure" width={SW} height={SH}>
            <polygon points={`${gA.x},${gA.y} ${gB.x},${gB.y} ${gC.x},${gC.y}`} fill="none" stroke="#333" strokeWidth="1.5" />
            <text x={gA.x - 4} y={gA.y - 6} fontSize="11">A</text>
            <text x={gB.x - 12} y={gB.y + 14} fontSize="11">B</text>
            <text x={gC.x + 4} y={gC.y + 14} fontSize="11">C</text>
            <text x={(gA.x + gC.x) / 2 + 4} y={(gA.y + gC.y) / 2} fontSize="10">21cm</text>
          </svg>
        </div>
      </div>
      <div className="stage">
        <svg width={width} height={height}>
          <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y}`} fill="none" stroke="#333" strokeWidth="2" />
          <polygon points={`${sP.x},${sP.y} ${sB.x},${sB.y} ${sQ.x},${sQ.y}`}
            fill={isEquilateral ? 'rgba(56,161,105,0.35)' : 'rgba(66,153,225,0.2)'}
            stroke={isEquilateral ? '#38a169' : '#3182ce'} strokeWidth="1.5" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#e53e3e" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sA.x - 4} y={sA.y - 10}>A</text>
          <text x={sB.x - 16} y={sB.y + 16}>B</text>
          <text x={sC.x + 6} y={sC.y + 16}>C</text>
          <text x={(sA.x + sC.x) / 2 + 6} y={(sA.y + sC.y) / 2} fontSize="11">21cm</text>
          <text x={sP.x + 8} y={sP.y + 4} fill="#e53e3e" fontWeight="bold">P</text>
          <text x={sQ.x + 8} y={sQ.y - 6} fill="#dd6b20" fontWeight="bold">Q</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(2)}</b> 秒後</p>
          <p>ＢＰ＝{bp.toFixed(1)}cm　／　ＢＱ＝{bq.toFixed(1)}cm</p>
          {isEquilateral && <p className="highlight">三角形ＰＢＱが正三角形になっています！</p>}
          {atB(P) && atB(Q) && <p className="highlight">2点が同時にＢを通過しています！</p>}
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        rate={rate} setRate={setRate}
        jumps={[
          { label: '0秒（出発）', t: 0 },
          { label: '(1) 正三角形 2.1秒後', t: 2.1 },
          { label: 'Ｂを1回目通過 3秒後', t: 3 },
          { label: '(2) 4回目同時通過 210秒後', t: 210 },
        ]}
      />
      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) ＢＰ＝ＢＱになるとき、三角形ＰＢＱは正三角形になります。2点が進んだ長さの和が21cmになるときなので、
          21÷(7+3)＝<b>2.1秒後</b>です。
        </p>
        <p>
          (2) 点Ｐは3秒後にはじめてＢを通過し、以降9秒ごとに通過（9×□+3）。点Ｑは21秒ごとにＢを通過（21×□）。
          1回目に同時に通過するのは<b>21秒後</b>で、以降は9と21の最小公倍数63秒ごと。
          4回目は、21+63×3＝<b>210秒後</b>です。再生速度を上げるか、ジャンプボタンで確認してみましょう。
        </p>
      </div>
    </div>
  )
}
