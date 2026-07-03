export function TimeSlider({
  t,
  setT,
  tMax,
  playing,
  setPlaying,
  rate,
  setRate,
  step = 0.1,
  jumps = [],
  rateOptions = [1, 5, 20],
}) {
  return (
    <div className="time-slider">
      <div className="time-slider-row">
        <button className="play-btn" onClick={() => setPlaying((p) => !p)}>
          {playing ? '⏸ 一時停止' : '▶ 再生'}
        </button>
        <input
          type="range"
          min={0}
          max={tMax}
          step={step}
          value={t}
          onChange={(e) => {
            setPlaying(false)
            setT(parseFloat(e.target.value))
          }}
        />
        <span className="time-readout">{t.toFixed(1)} 秒後</span>
      </div>

      {setRate && (
        <div className="rate-row">
          <span>再生速度：</span>
          {rateOptions.map((r) => (
            <button
              key={r}
              className={`rate-btn${rate === r ? ' active' : ''}`}
              onClick={() => setRate(r)}
            >
              ×{r}
            </button>
          ))}
        </div>
      )}

      {jumps.length > 0 && (
        <div className="jump-row">
          {jumps.map((j) => (
            <button
              key={j.label}
              className="jump-btn"
              onClick={() => {
                setPlaying(false)
                setT(j.t)
              }}
            >
              {j.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
