import { useMemo } from 'react'
import { pointAtDistance, distanceBetween } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

// 正方形ABCD(1辺12) と 正方形ECFG(1辺15) をCで組み合わせた図形。
// B(0,0)-C(12,0)-D(12,12)-A(0,12)  /  C(12,0)-F(27,0)-G(27,15)-E(12,15)
const B = { x: 0, y: 0 }
const C = { x: 12, y: 0 }
const D = { x: 12, y: 12 }
const A = { x: 0, y: 12 }
const F = { x: 27, y: 0 }
const G = { x: 27, y: 15 }
const E = { x: 12, y: 15 }

const P_PATH = [B, A, D, C, B] // 点P: B→A→D→C→B（周回）
const Q_PATH = [G, F, C, E, G] // 点Q: G→F→C→E→G（周回）
const P_SPEED = 4
const Q_SPEED = 3
const T_MAX = 60

const SCALE = 9, PAD = 40, MATH_H = 15
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

const SS = 4.5, SPD = 16
const toStatic = (p) => ({ x: SPD + p.x * SS, y: SPD + (MATH_H - p.y) * SS })
const gB = toStatic(B), gC = toStatic(C), gD = toStatic(D), gA = toStatic(A)
const gF = toStatic(F), gG = toStatic(G), gE = toStatic(E)
const SW = SPD * 2 + 27 * SS, SH = SPD * 2 + 15 * SS

export default function AdvancedA1() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { loop: true })
  const P = useMemo(() => pointAtDistance(P_PATH, P_SPEED * t, true), [t])
  const Q = useMemo(() => pointAtDistance(Q_PATH, Q_SPEED * t, true), [t])
  const meeting = distanceBetween(P, Q) < 0.5

  const sB = toSvg(B), sC = toSvg(C), sD = toSvg(D), sA = toSvg(A)
  const sF = toSvg(F), sG = toSvg(G), sE = toSvg(E), sP = toSvg(P), sQ = toSvg(Q)
  const width = PAD * 2 + 27 * SCALE
  const height = PAD * 2 + 15 * SCALE

  return (
    <div className="problem">
      <h2>応用問題A-1　2つの正方形を組み合わせた図形上の2点</h2>
      <div className="statement">
        <div className="statement-row">
          <div className="statement-text">
            <p className="setup">
              右の図のような，正方形を2つ組み合わせた図形があります。点ＰはＢを出発して秒速4cmで，正方形ＡＢＣＤの辺上を
              Ｂ→Ａ→Ｄ→Ｃ→Ｂ→Ａ→……の順にまわり続けます。点ＱはＧを出発して秒速3cmで正方形ＥＣＦＧの辺上を
              Ｇ→Ｆ→Ｃ→Ｅ→Ｇ→Ｆ→……の順にまわり続けます。いま，点Ｐと点Ｑが同時に出発しました。これについて，次の問いに答えなさい。
            </p>
            <ol className="question-list">
              <li>点Ｐと点Ｑが1回目，2回目に重なるのは，それぞれ2点が出発してから何秒後ですか。</li>
              <li>2点が出発してから5分後までの間に，点Ｐと点Ｑは何回重なりますか。</li>
            </ol>
          </div>
          <svg className="statement-figure" width={SW} height={SH}>
            <polygon points={`${gA.x},${gA.y} ${gB.x},${gB.y} ${gC.x},${gC.y} ${gD.x},${gD.y}`} fill="none" stroke="#333" strokeWidth="1.5" />
            <polygon points={`${gE.x},${gE.y} ${gC.x},${gC.y} ${gF.x},${gF.y} ${gG.x},${gG.y}`} fill="none" stroke="#333" strokeWidth="1.5" />
            <text x={gA.x - 12} y={gA.y - 4} fontSize="11">A</text>
            <text x={gB.x - 12} y={gB.y + 14} fontSize="11">B</text>
            <text x={gC.x - 4} y={gC.y + 14} fontSize="11">C</text>
            <text x={gD.x + 4} y={gD.y - 4} fontSize="11">D</text>
            <text x={gE.x - 12} y={gE.y - 4} fontSize="11">E</text>
            <text x={gF.x + 4} y={gF.y + 14} fontSize="11">F</text>
            <text x={gG.x + 4} y={gG.y - 4} fontSize="11">G</text>
            <text x={(gB.x + gC.x) / 2 - 8} y={gB.y + 14} fontSize="10">12cm</text>
            <text x={(gC.x + gF.x) / 2 - 8} y={gC.y + 14} fontSize="10">15cm</text>
          </svg>
        </div>
      </div>
      <div className="stage">
        <svg width={width} height={height}>
          <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y} ${sD.x},${sD.y}`} fill="none" stroke="#333" strokeWidth="2" />
          <polygon points={`${sE.x},${sE.y} ${sC.x},${sC.y} ${sF.x},${sF.y} ${sG.x},${sG.y}`} fill="none" stroke="#333" strokeWidth="2" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#3182ce" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sA.x - 14} y={sA.y - 6}>A</text>
          <text x={sB.x - 14} y={sB.y + 16}>B</text>
          <text x={sC.x - 4} y={sC.y + 16}>C</text>
          <text x={sD.x + 6} y={sD.y - 6}>D</text>
          <text x={sE.x - 14} y={sE.y - 6}>E</text>
          <text x={sF.x + 6} y={sF.y + 16}>F</text>
          <text x={sG.x + 6} y={sG.y - 6}>G</text>
          <text x={(sB.x + sC.x) / 2 - 14} y={sB.y + 16} fontSize="11">12cm</text>
          <text x={(sC.x + sF.x) / 2 - 14} y={sC.y + 16} fontSize="11">15cm</text>
          <text x={sP.x + 8} y={sP.y + 4} fill="#3182ce" fontWeight="bold">P</text>
          <text x={sQ.x + 8} y={sQ.y - 6} fill="#dd6b20" fontWeight="bold">Q</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(2)}</b> 秒後</p>
          {meeting && <p className="highlight">点Ｐと点Ｑが重なっています！</p>}
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        rate={rate} setRate={setRate}
        jumps={[
          { label: '0秒（出発）', t: 0 },
          { label: '(1) 1回目 31と5/7秒後', t: 31 + 5 / 7 },
          { label: '(1) 2回目 54秒後', t: 54 },
        ]}
      />
      <div className="explain">
        <h3>解説</h3>
        <p>点Ｐは1周に12秒、点Ｑは1周に20秒かかるので、12と20の最小公倍数60秒を1周期と考えます。</p>
        <p>
          (1) 1回目に重なるのは<b>31と5/7秒後</b>、2回目は辺ＣＤ（Ｄの位置）で<b>54秒後</b>に重なります。
        </p>
        <p>
          (2) 1周期(60秒)ごとに2回重なるので、5分(300秒)＝5周期の間に、2×5＝<b>10回</b>重なります。
        </p>
      </div>
    </div>
  )
}
