// 容器を傾ける問題用：正面から見た断面（台形・三角形など）をステージ切り替えで表示する。
// stages: [{ label, outline: [[x,y],...], water: [[x,y],...] | null, marks: [{x,y,text,anchor}] }]
export function TiltStageView({ stages, stageIndex, setStageIndex, width = 320, height = 240, viewBox = '0 0 200 160' }) {
  const stage = stages[stageIndex]
  const toPath = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ') + ' Z'

  return (
    <div className="tilt-stage-view">
      <div className="jump-row">
        {stages.map((s, i) => (
          <button key={s.label} className={`jump-btn${i === stageIndex ? ' active' : ''}`} onClick={() => setStageIndex(i)}>
            {s.label}
          </button>
        ))}
      </div>
      <svg width={width} height={height} viewBox={viewBox} className="tank-view">
        {stage.water && <path d={toPath(stage.water)} fill="#63b3ed" opacity="0.75" />}
        <path d={toPath(stage.outline)} fill="none" stroke="#4a5568" strokeWidth="2" />
        {(stage.marks ?? []).map((m, i) => (
          <text key={i} x={m.x} y={m.y} fontSize="9" textAnchor={m.anchor ?? 'middle'} fill="#2d3748">
            {m.text}
          </text>
        ))}
      </svg>
    </div>
  )
}
