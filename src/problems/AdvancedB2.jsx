import { useMemo } from 'react'
import { pointAtDistanceOnSegment, polygonArea, boundaryPolygon } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

// 長方形ABCD。AB=24(縦), AD=60(横)。A(0,24)-B(0,0)-C(60,0)-D(60,24)
const A = { x: 0, y: 24 }
const B = { x: 0, y: 0 }
const C = { x: 60, y: 0 }
const D = { x: 60, y: 24 }
const CORNERS = [A, B, C, D] // 辺: 0=AB, 1=BC, 2=CD, 3=DA
const P_PATH = [A, B, C, D, A] // 点P: A→B→C→D→A（周回）
const Q_PATH = [A, D, C, B, A] // 点Q: A→D→C→B→A（Pと逆向き、周回）
const P_SPEED = 6
const Q_SPEED = 4
const T_MAX = 84 // 2点が再びAで重なるまで(28と42の最小公倍数)

const SCALE = 6, PAD = 46, MATH_H = 24
const toSvg = (p) => ({ x: PAD + p.x * SCALE, y: PAD + (MATH_H - p.y) * SCALE })

const SS = 2.8, SPD = 18
const toStatic = (p) => ({ x: SPD + p.x * SS, y: SPD + (MATH_H - p.y) * SS })
const gA = toStatic(A), gB = toStatic(B), gC = toStatic(C), gD = toStatic(D)
const SW = SPD * 2 + 60 * SS, SH = SPD * 2 + 24 * SS

export default function AdvancedB2() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { loop: true })
  const P = useMemo(() => pointAtDistanceOnSegment(P_PATH, P_SPEED * t, true), [t])
  const Q = useMemo(() => pointAtDistanceOnSegment(Q_PATH, Q_SPEED * t, true), [t])

  // P,QのセグメントインデックスをCORNERS(=P_PATHと同じ頂点順)基準に変換
  const pSegOnCorners = P.segment % 4
  // Q_PATHはA→D→C→Bの順なので、CORNERS(A→B→C→D)基準では 0:A-D→corners外周では index3(D-A)の逆
  const qCornerMap = [3, 2, 1, 0] // Q_PATHのseg0(A-D)はCORNERSのseg3(D-A)、seg1(D-C)→2(C-D)、seg2(C-B)→1(B-C)、seg3(B-A)→0(A-B)
  const qSegOnCorners = qCornerMap[Q.segment % 4]

  const areaTotal = useMemo(() => polygonArea(CORNERS), [])
  const { smaller, larger } = useMemo(() => {
    const poly = boundaryPolygon(CORNERS, pSegOnCorners, P, qSegOnCorners, Q)
    const a1 = polygonArea(poly)
    const a2 = areaTotal - a1
    return { smaller: Math.min(a1, a2), larger: Math.max(a1, a2) }
  }, [P, Q, pSegOnCorners, qSegOnCorners, areaTotal])

  const sA = toSvg(A), sB = toSvg(B), sC = toSvg(C), sD = toSvg(D), sP = toSvg(P), sQ = toSvg(Q)
  const width = PAD * 2 + 60 * SCALE
  const height = PAD * 2 + 24 * SCALE

  return (
    <div className="problem">
      <h2>応用問題B-2　長方形の辺上を動く2点と直線が分ける面積</h2>
      <div className="statement">
        <div className="statement-row">
          <div className="statement-text">
        <p className="setup">
          辺ＡＢが24cm，辺ＡＤが60cmの長方形ＡＢＣＤがあります。点ＰはＡを出発して，長方形の辺上をＡ→Ｂ→Ｃ→Ｄ→Ａ→……の
          向きに，秒速6cmで動きます。点Ｑは点Ｐと同時にＡを出発して，長方形ＡＢＣＤの辺上をＡ→Ｄ→Ｃ→Ｂ→Ａ→……の向きに，
          秒速4cmで動きます。2点は，Ａを出発した後，ふたたびＡで重なるまで動き続けます。長方形ＡＢＣＤを直線ＰＱで
          2つの部分に分けるとき，次の問いに答えなさい。
        </p>
        <ol className="question-list">
          <li>2点が出発してから7秒後の小さい方の面積は何cm²ですか。</li>
          <li>2点Ｐ，Ｑがともに長方形の頂点にあるときで，2つの部分の面積が等しくなるのは，出発してから何秒後ですか。</li>
          <li>点Ｐが長方形の頂点にあるときで，大きい方の面積が小さい方の面積の3倍となるのは，出発してから何秒後ですか。</li>
        </ol>
          </div>
          <svg className="statement-figure" width={SW} height={SH}>
            <polygon points={`${gA.x},${gA.y} ${gB.x},${gB.y} ${gC.x},${gC.y} ${gD.x},${gD.y}`} fill="none" stroke="#333" strokeWidth="1.5" />
            <text x={gA.x - 12} y={gA.y - 4} fontSize="11">A</text>
            <text x={gB.x - 12} y={gB.y + 14} fontSize="11">B</text>
            <text x={gC.x + 4} y={gC.y + 14} fontSize="11">C</text>
            <text x={gD.x + 4} y={gD.y - 4} fontSize="11">D</text>
            <text x={(gA.x + gD.x) / 2 - 12} y={gA.y - 8} fontSize="10">60cm</text>
            <text x={gA.x - 34} y={(gA.y + gB.y) / 2} fontSize="10">24cm</text>
          </svg>
        </div>
      </div>
      <div className="stage">
        <svg width={width} height={height}>
          <polygon points={`${sA.x},${sA.y} ${sB.x},${sB.y} ${sC.x},${sC.y} ${sD.x},${sD.y}`} fill="none" stroke="#333" strokeWidth="2" />
          <line x1={sP.x} y1={sP.y} x2={sQ.x} y2={sQ.y} stroke="#805ad5" strokeWidth="2" />
          <circle cx={sP.x} cy={sP.y} r={5} fill="#3182ce" />
          <circle cx={sQ.x} cy={sQ.y} r={5} fill="#dd6b20" />
          <text x={sA.x - 14} y={sA.y - 6}>A</text>
          <text x={sB.x - 14} y={sB.y + 16}>B</text>
          <text x={sC.x + 6} y={sC.y + 16}>C</text>
          <text x={sD.x + 6} y={sD.y - 6}>D</text>
          <text x={(sA.x + sD.x) / 2 - 14} y={sA.y - 12} fontSize="11">60cm</text>
          <text x={sA.x - 40} y={(sA.y + sB.y) / 2} fontSize="11">24cm</text>
          <text x={sP.x + 8} y={sP.y + 4} fill="#3182ce" fontWeight="bold">P</text>
          <text x={sQ.x + 8} y={sQ.y - 6} fill="#dd6b20" fontWeight="bold">Q</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>小さい方の面積：<b>{smaller.toFixed(1)}</b> cm²</p>
          <p>大きい方の面積：<b>{larger.toFixed(1)}</b> cm²</p>
        </div>
      </div>
      <TimeSlider
        t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        rate={rate} setRate={setRate}
        jumps={[
          { label: '(1) 7秒後', t: 7 },
          { label: '(2) 2等分 42秒後', t: 42 },
          { label: '(3) 3倍になる 60秒後', t: 60 },
        ]}
      />
      <div className="explain">
        <h3>解説</h3>
        <p>(1) 7秒後、点Ｐは42cm、点Ｑは28cm動いており、小さい方の面積は<b>552cm²</b>です。</p>
        <p>(2) 2点がともに長方形の頂点にあるときで、面積が半分ずつになるのは<b>42秒後</b>です。</p>
        <p>(3) 点Ｐが頂点にあるときで、大きい方が小さい方の3倍になるのは<b>60秒後</b>です。</p>
      </div>
    </div>
  )
}
