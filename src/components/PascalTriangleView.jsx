import { combination } from '../utils/sequence'

// row(A) の左からB番目 = C(A-1, B-1) という「例題6式」の行番号（1段目=[1]）。
// offset=1にすると「練習5式」の C(A, B-1)（1段目=[1,1]）になる。
export function PascalTriangleView({ rows, highlight, offset = 0 }) {
  const rowNums = Array.from({ length: rows }, (_, i) => i + 1)
  return (
    <div className="pascal-wrap">
      {rowNums.map((row) => {
        const n = row - 1 + offset
        const entries = Array.from({ length: n + 1 }, (_, k) => combination(n, k))
        return (
          <div key={row} className="pascal-row">
            {entries.map((v, i) => {
              const isHi = highlight && highlight.row === row && highlight.pos === i + 1
              return (
                <div key={i} className={`pascal-cell${isHi ? ' pascal-hi' : ''}`}>{v}</div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
