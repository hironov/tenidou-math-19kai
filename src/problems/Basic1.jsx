import { useMemo } from 'react'
import { pointAtDistance, polygonArea } from '../utils/motion'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

// (1) 直角三角形ABC。右角はA。AB=20cm(縦)、AC=10cm(横)。
const A1 = { x: 0, y: 0 }
const B1 = { x: 0, y: 20 }
const C1 = { x: 10, y: 0 }
const PATH1 = [B1, A1, C1] // 点PはB→A→Cの順
const SPEED1 = 2
const T_MAX1 = 15

// (2) 長方形ABCD。AB=10(縦)、AD=15(横)。P:B→A→D→C→B(周回)、Q:C→D→A→B→C(周回)。
const A2 = { x: 0, y: 10 }
const B2 = { x: 0, y: 0 }
const C2 = { x: 15, y: 0 }
const D2 = { x: 15, y: 10 }
const P2_PATH = [B2, A2, D2, C2, B2]
const Q2_PATH = [C2, D2, A2, B2, C2]
const P2_SPEED = 3
const Q2_SPEED = 2
const T_MAX2 = 40

const SCALE1 = 13, PAD1 = 40, MATH_H1 = 20
const toSvg1 = (p) => ({ x: PAD1 + p.x * SCALE1, y: PAD1 + (MATH_H1 - p.y) * SCALE1 })

const SCALE2 = 13, PAD2 = 40, MATH_H2 = 10
const toSvg2 = (p) => ({ x: PAD2 + p.x * SCALE2, y: PAD2 + (MATH_H2 - p.y) * SCALE2 })

export default function Basic1() {
  const anim1 = useAnimatedTime(T_MAX1)
  const P1 = useMemo(() => pointAtDistance(PATH1, SPEED1 * anim1.t, false), [anim1.t])
  const area1 = useMemo(() => polygonArea([P1, B1, C1]), [P1])

  const anim2 = useAnimatedTime(T_MAX2, { loop: true })
  const P2 = useMemo(() => pointAtDistance(P2_PATH, P2_SPEED * anim2.t, true), [anim2.t])
  const Q2 = useMemo(() => pointAtDistance(Q2_PATH, Q2_SPEED * anim2.t, true), [anim2.t])
  const meeting = Math.hypot(P2.x - Q2.x, P2.y - Q2.y) < 0.2

  const s1A = toSvg1(A1), s1B = toSvg1(B1), s1C = toSvg1(C1), s1P = toSvg1(P1)
  const w1 = PAD1 * 2 + 10 * SCALE1, h1 = PAD1 * 2 + 20 * SCALE1

  const s2A = toSvg2(A2), s2B = toSvg2(B2), s2C = toSvg2(C2), s2D = toSvg2(D2)
  const s2P = toSvg2(P2), s2Q = toSvg2(Q2)
  const w2 = PAD2 * 2 + 15 * SCALE2, h2 = PAD2 * 2 + 10 * SCALE2

  return (
    <div className="problem">
      <h2>基本問題1</h2>

      <p className="statement">次の問いに答えなさい。</p>

      <h3>(1) 直角三角形の辺上を動く点と面積</h3>
      <div className="statement">
        <p className="setup">
          右の図のような直角三角形ＡＢＣがあります。点ＰはＢを出発して，秒速2cmで辺上をＢ→Ａ→Ｃの順に動きます。
        </p>
        <ol className="question-list">
          <li>点Ｐが出発してから3秒後の三角形ＰＢＣの面積は何cm²ですか。</li>
          <li>点Ｐが出発してから13秒後の三角形ＰＢＣの面積は何cm²ですか。</li>
          <li>三角形ＰＢＣの面積がはじめて80cm²になるのは，点Ｐが出発してから何秒後ですか。</li>
          <li>三角形ＰＢＣの面積が2回目に80cm²になるのは，点Ｐが出発してから何秒後ですか。</li>
        </ol>
      </div>
      <div className="stage">
        <svg width={w1} height={h1}>
          <polygon points={`${s1B.x},${s1B.y} ${s1A.x},${s1A.y} ${s1C.x},${s1C.y}`} fill="none" stroke="#333" strokeWidth="2" />
          <polygon points={`${s1P.x},${s1P.y} ${s1B.x},${s1B.y} ${s1C.x},${s1C.y}`} fill="rgba(66,153,225,0.35)" stroke="#3182ce" strokeWidth="1.5" />
          <circle cx={s1P.x} cy={s1P.y} r={5} fill="#e53e3e" />
          <text x={s1A.x + 6} y={s1A.y - 6}>A</text>
          <text x={s1B.x - 16} y={s1B.y + 4}>B</text>
          <text x={s1C.x + 6} y={s1C.y + 14}>C</text>
          <text x={s1P.x + 8} y={s1P.y - 6} fill="#e53e3e" fontWeight="bold">P</text>
          <text x={(s1A.x + s1B.x) / 2 - 26} y={(s1A.y + s1B.y) / 2} fontSize="11">20cm</text>
          <text x={(s1A.x + s1C.x) / 2 - 4} y={s1A.y - 10} fontSize="11">10cm</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{anim1.t.toFixed(1)}</b> 秒後</p>
          <p>三角形ＰＢＣの面積：<b>{area1.toFixed(1)}</b> cm²</p>
        </div>
      </div>
      <TimeSlider
        t={anim1.t} setT={anim1.setT} tMax={T_MAX1} playing={anim1.playing} setPlaying={anim1.setPlaying}
        jumps={[
          { label: '① 3秒後', t: 3 },
          { label: '② 13秒後', t: 13 },
          { label: '③ 1回目80cm² 8秒後', t: 8 },
          { label: '④ 2回目80cm² 11秒後', t: 11 },
        ]}
      />
      <div className="explain">
        <p>① 3秒後：ＢＰ＝6cmより、面積は6×10÷2＝<b>30cm²</b>。② 13秒後：Ｐは辺ＡＣ上にいて、面積は<b>40cm²</b>。</p>
        <p>③ はじめて80cm²になるのは辺ＡＢ上、ＢＰ＝16cmより<b>8秒後</b>。④ 2回目は辺ＡＣ上、<b>11秒後</b>。</p>
      </div>

      <h3>(2) 長方形の辺上をまわる2点が出会う時間</h3>
      <div className="statement">
        <p className="setup">
          右の図のような長方形ＡＢＣＤがあります。点ＰはＢを出発して秒速3cmで，点ＱはＣを出発して秒速2cmで，
          それぞれ矢印の方向に辺上をまわり続けます。
        </p>
        <ol className="question-list">
          <li>点Ｐと点Ｑがはじめて重なるのは，2点が出発してから何秒後ですか。また，その場所は最も近い頂点から何cmはなれたところですか。</li>
          <li>点Ｐと点Ｑが2回目に重なるのは，2点が出発してから何秒後ですか。また，その場所は最も近い頂点から何cmはなれたところですか。</li>
        </ol>
      </div>
      <div className="stage">
        <svg width={w2} height={h2}>
          <polygon points={`${s2A.x},${s2A.y} ${s2B.x},${s2B.y} ${s2C.x},${s2C.y} ${s2D.x},${s2D.y}`} fill="none" stroke="#333" strokeWidth="2" />
          <circle cx={s2P.x} cy={s2P.y} r={5} fill="#3182ce" />
          <circle cx={s2Q.x} cy={s2Q.y} r={5} fill="#dd6b20" />
          <text x={s2A.x - 16} y={s2A.y - 6}>A</text>
          <text x={s2B.x - 16} y={s2B.y + 16}>B</text>
          <text x={s2C.x + 6} y={s2C.y + 16}>C</text>
          <text x={s2D.x + 6} y={s2D.y - 6}>D</text>
          <text x={s2P.x + 8} y={s2P.y + 4} fill="#3182ce" fontWeight="bold">P</text>
          <text x={s2Q.x + 8} y={s2Q.y - 6} fill="#dd6b20" fontWeight="bold">Q</text>
          <text x={(s2A.x + s2D.x) / 2 - 14} y={s2A.y - 12} fontSize="11">15cm</text>
          <text x={s2A.x - 36} y={(s2A.y + s2B.y) / 2} fontSize="11">10cm</text>
        </svg>
        <div className="readout">
          <p>経過時間：<b>{anim2.t.toFixed(1)}</b> 秒後</p>
          {meeting && <p className="highlight">点Ｐと点Ｑが重なっています！</p>}
        </div>
      </div>
      <TimeSlider
        t={anim2.t} setT={anim2.setT} tMax={T_MAX2} playing={anim2.playing} setPlaying={anim2.setPlaying}
        jumps={[
          { label: '① 1回目 7秒後', t: 7 },
          { label: '② 2回目 17秒後', t: 17 },
        ]}
      />
      <div className="explain">
        <p>
          ① ＰとＱが出会うまでに進む長さの和は、ＡＢ＋ＡＤ＋ＤＣ＝10+15+10=35cmなので、35÷(3+2)＝<b>7秒後</b>。
          このとき、ＤからＡの方向に4cmの地点で出会います。
        </p>
        <p>② 2回目に出会うのは、1周(50cm)分あとなので、7+50÷(3+2)＝<b>17秒後</b>です。</p>
      </div>
    </div>
  )
}
