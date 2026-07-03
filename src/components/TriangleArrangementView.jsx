import { triangleArrangementValue, triangleArrangementIsUp } from '../utils/sequence'

// 応用A-2用：段ごとに△▽が交互に並ぶ三角形配置を表示する。
export function TriangleArrangementView({ rows, highlightValue }) {
  const rowNums = Array.from({ length: rows }, (_, i) => i + 1)
  return (
    <div className="triangle-grid">
      {rowNums.map((row) => {
        const count = 2 * row - 1
        const positions = Array.from({ length: count }, (_, i) => i + 1)
        return (
          <div key={row} className="triangle-row">
            {positions.map((pos) => {
              const value = triangleArrangementValue(row, pos)
              const isUp = triangleArrangementIsUp(pos)
              const isHi = highlightValue === value
              return (
                <div key={pos} className="tri-cell">
                  <div className={isUp ? `tri-up${isHi ? ' tri-hi' : ''}` : `tri-down${isHi ? ' tri-hi' : ''}`} />
                  <div className={`tri-label${isHi ? ' tri-hi-label' : ''}`}>{value}</div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
