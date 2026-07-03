// 行×列の数表を描画する。cellは{value, order, sub}を返す関数。
export function NumberTable({ rows, cols, cell, highlight, rowLabel = '行', colLabel = '列' }) {
  const rowIdx = Array.from({ length: rows }, (_, i) => i + 1)
  const colIdx = Array.from({ length: cols }, (_, i) => i + 1)
  return (
    <div className="num-table-wrap">
      <table className="num-table">
        <thead>
          <tr>
            <th></th>
            {colIdx.map((c) => <th key={c}>{c}{colLabel}</th>)}
          </tr>
        </thead>
        <tbody>
          {rowIdx.map((r) => (
            <tr key={r}>
              <th>{r}{rowLabel}</th>
              {colIdx.map((c) => {
                const info = cell(r, c)
                const isHi = highlight && highlight.r === r && highlight.c === c
                return (
                  <td key={c} className={isHi ? 'num-table-hi' : ''}>
                    <div className="num-table-value">{info?.value ?? ''}</div>
                    {info?.sub && <div className="num-table-sub">{info.sub}</div>}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
