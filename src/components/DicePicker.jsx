import { useState } from 'react'

// 大小2つのさいころの目を選んで、合計や条件を確かめられるウィジェット。
export function DicePicker({ checkFn, checkLabel, mode = 'sum' }) {
  const [big, setBig] = useState(1)
  const [small, setSmall] = useState(1)
  const sum = big + small
  const product = big * small
  const ok = checkFn ? checkFn(mode === 'product' ? product : sum, big, small) : null

  return (
    <div>
      <div className="stage">
        <div>
          <p style={{ fontWeight: 'bold', marginBottom: 6 }}>大</p>
          <div className="combo-items">
            {[1, 2, 3, 4, 5, 6].map((v) => (
              <button key={v} className={`combo-item${big === v ? ' active' : ''}`} onClick={() => setBig(v)}>{v}</button>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontWeight: 'bold', marginBottom: 6 }}>小</p>
          <div className="combo-items">
            {[1, 2, 3, 4, 5, 6].map((v) => (
              <button key={v} className={`combo-item${small === v ? ' active' : ''}`} onClick={() => setSmall(v)}>{v}</button>
            ))}
          </div>
        </div>
      </div>
      <p className="readout">
        合計：<b>{sum}</b>　積：<b>{product}</b>
        {checkFn && <span className={ok ? 'combo-message' : ''}>　{checkLabel}：{ok ? '条件を満たす' : '条件を満たさない'}</span>}
      </p>
    </div>
  )
}
