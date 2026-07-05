import { GridPathDiagram } from '../components/GridPathDiagram'

// 立体の道順をあらわす簡易な格子（東西・南北・上下の3方向、各2マス分）のイメージ図
const EX = 2, NY = 2, DZ = 2
const ORIGIN = { x: 150, y: 26 }
const STEP = { exdx: 26, exdy: 14, nodx: -26, nody: 14, downdy: 26 }

function project(i, j, k) {
  return {
    x: ORIGIN.x + i * STEP.exdx + j * STEP.nodx,
    y: ORIGIN.y + i * STEP.exdy + j * STEP.nody + k * STEP.downdy,
  }
}

const VERTS = []
for (let i = 0; i <= EX; i++) {
  for (let j = 0; j <= NY; j++) {
    for (let k = 0; k <= DZ; k++) {
      VERTS.push({ i, j, k, ...project(i, j, k) })
    }
  }
}
const findV = (i, j, k) => VERTS.find((v) => v.i === i && v.j === j && v.k === k)

const EDGES = []
for (const v of VERTS) {
  if (v.i < EX) EDGES.push({ a: v, b: findV(v.i + 1, v.j, v.k) })
  if (v.j < NY) EDGES.push({ a: v, b: findV(v.i, v.j + 1, v.k) })
  if (v.k < DZ) EDGES.push({ a: v, b: findV(v.i, v.j, v.k + 1) })
}

const A = findV(0, 0, 0)
const B = findV(EX, 0, DZ)
const C = findV(EX, NY, DZ)
const P_EDGE = { a: findV(1, 1, 0), b: findV(2, 1, 0) }
const Q_EDGE = { a: findV(1, 0, 1), b: findV(1, 1, 1) }

function LatticeDiagram({ highlightBlocked }) {
  return (
    <svg width={260} height={190} className="tank-view">
      {EDGES.map((e, idx) => (
        <line key={idx} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} stroke="#a0aec0" strokeWidth="1.2" />
      ))}
      {highlightBlocked && [P_EDGE, Q_EDGE].map((e, idx) => (
        <line key={`blocked-${idx}`} x1={e.a.x} y1={e.a.y} x2={e.b.x} y2={e.b.y} stroke="#e53e3e" strokeWidth="2.5" strokeDasharray="4 3" />
      ))}
      {VERTS.map((v, idx) => <circle key={idx} cx={v.x} cy={v.y} r={2} fill="#a0aec0" />)}
      <circle cx={A.x} cy={A.y} r={5} fill="#3182ce" />
      <text x={A.x - 16} y={A.y + 4} fontSize="13" fontWeight="bold" fill="#2d3748">Ａ</text>
      <circle cx={B.x} cy={B.y} r={5} fill="#38a169" />
      <text x={B.x + 8} y={B.y + 4} fontSize="13" fontWeight="bold" fill="#2d3748">Ｂ</text>
      <circle cx={C.x} cy={C.y} r={5} fill="#dd6b20" />
      <text x={C.x + 8} y={C.y + 4} fontSize="13" fontWeight="bold" fill="#2d3748">Ｃ</text>
      {highlightBlocked && (
        <>
          <text x={(P_EDGE.a.x + P_EDGE.b.x) / 2 - 4} y={(P_EDGE.a.y + P_EDGE.b.y) / 2 - 6} fontSize="12" fontWeight="bold" fill="#e53e3e">Ｐ</text>
          <text x={(Q_EDGE.a.x + Q_EDGE.b.x) / 2 + 6} y={(Q_EDGE.a.y + Q_EDGE.b.y) / 2} fontSize="12" fontWeight="bold" fill="#e53e3e">Ｑ</text>
        </>
      )}
      <g transform={`translate(54, ${190 - 46})`}>
        <line x1="0" y1="0" x2={STEP.exdx} y2={STEP.exdy} stroke="#4a5568" strokeWidth="1.5" />
        <text x={STEP.exdx + 4} y={STEP.exdy + 4} fontSize="11" fill="#4a5568">東</text>
        <line x1="0" y1="0" x2={STEP.nodx} y2={STEP.nody} stroke="#4a5568" strokeWidth="1.5" />
        <text x={STEP.nodx - 14} y={STEP.nody + 4} fontSize="11" fill="#4a5568">北</text>
        <line x1="0" y1="0" x2="0" y2={STEP.downdy} stroke="#4a5568" strokeWidth="1.5" />
        <text x="4" y={STEP.downdy + 4} fontSize="11" fill="#4a5568">下</text>
      </g>
    </svg>
  )
}

export default function AdvancedA2() {
  return (
    <div className="problem">
      <h2>応用問題A-2　立体の中の道順（東西・南北・上下）</h2>
      <div className="statement">
        <p className="setup">
          東西方向，南北方向，上下方向に走る線が組み合わさっています。Ａを出発して，これらの線上を進みます。
        </p>
        <ol className="question-list">
          <li>ＡからＢまで遠回りせずに行く道順は何通りありますか。</li>
          <li>ＡからＣまで遠回りせずに行く道順は何通りありますか。</li>
          <li>ＰとＱが通れないとき，ＡからＣまで遠回りせずに行く道順は何通りありますか。</li>
        </ol>
      </div>

      <h3>(1) ＡとＢのある平面だけを考える</h3>
      <GridPathDiagram cols={1} rows={4} startLabel="A" endLabel="B" cellSize={40} />

      <h3>(2) ＡからＣまで（東西・南北・上下の3方向を使う）</h3>
      <LatticeDiagram highlightBlocked={false} />
      <p style={{ fontSize: '0.85rem', color: '#4a5568' }}>
        東西・南北・上下の3方向に道が伸びるようすを表したイメージ図です。Ａから見て「上」「東」「北」の3方向を組み合わせて，Ｃまで進みます。
      </p>

      <h3>(3) ＰとＱが通れないとき</h3>
      <LatticeDiagram highlightBlocked />
      <p style={{ fontSize: '0.85rem', color: '#4a5568' }}>Ｐ，Ｑの辺（赤い点線）を通らずに，Ａ地点からＣ地点まで進みます。</p>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) ＡとＢのある平面だけを考えると，上の図のようになります。よって，<b>5通り</b></p>
        <p>
          (2) Ａから見て「上」「東」「北」の3方向すべてを使って進むと考えます。このとき，「上から来る」，「西から来る」，「南から来る」の3つの和になっている部分に注意しましょう。
          計算していくと，Ｃに行く方法は<b>192通り</b>になります。
        </p>
        <p>
          (3) ＰとＱをふくむ辺をなくして，(2)と同じように和の法則で計算していくと，Ｃに行く方法は<b>146通り</b>になります。
        </p>
      </div>
    </div>
  )
}
