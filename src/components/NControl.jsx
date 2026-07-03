// 「N番目」を選ぶための共通コントロール（スライダー＋数値入力＋ジャンプボタン）。
export function NControl({ n, setN, min = 1, max, jumps = [], label = '番目' }) {
  return (
    <div className="time-slider">
      <div className="time-slider-row">
        <input
          type="range" min={min} max={max} step={1} value={n}
          onChange={(e) => setN(parseInt(e.target.value, 10))}
        />
        <input
          type="number" min={min} max={max} value={n}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10)
            if (!Number.isNaN(v)) setN(Math.max(min, Math.min(max, v)))
          }}
          className="n-input"
        />
        <span className="time-readout">{label}</span>
      </div>
      {jumps.length > 0 && (
        <div className="jump-row">
          {jumps.map((j) => (
            <button key={j.label} className="jump-btn" onClick={() => setN(j.n)}>{j.label}</button>
          ))}
        </div>
      )}
    </div>
  )
}
