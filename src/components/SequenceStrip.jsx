// 数列を横一列に並べて表示し、N番目を強調表示する。差の数列も表示できる。
export function SequenceStrip({ values, highlightIndex, showDiff = false, groupOf }) {
  return (
    <div className="seq-wrap">
      <div className="seq-strip">
        {values.map((v, i) => {
          const newGroup = groupOf && i > 0 && groupOf(i) !== groupOf(i - 1)
          return (
            <div key={i} className={`seq-item-wrap${newGroup ? ' seq-group-start' : ''}`}>
              <div className={`seq-item${i === highlightIndex ? ' seq-highlight' : ''}`}>{v}</div>
              {showDiff && i < values.length - 1 && (
                <div className="seq-diff">{values[i + 1] - v}</div>
              )}
            </div>
          )
        })}
        <div className="seq-item seq-ellipsis">…</div>
      </div>
    </div>
  )
}
