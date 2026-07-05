import { triangular } from '../utils/sequence'

function valueAt(col, row) {
  return triangular(col + row - 1) - col + 1
}

const SIZE = 6

export default function Practice3() {
  const rows = Array.from({ length: SIZE }, (_, i) => SIZE - i) // 上から表示するので下からの行番号を降順に

  return (
    <div className="problem">
      <h2>練習問題3　三角数の対角配置</h2>
      <div className="statement">
        <p className="setup">あるきまりにしたがって，整数をならべます。たとえば，左から2番目，下から3番目の整数は9です。</p>
        <ol className="question-list">
          <li>左から10番目，下から6番目の整数はいくつですか。</li>
          <li>155は左から何番目，下から何番目にありますか。</li>
        </ol>
      </div>

      <div className="num-table-wrap">
        <table className="num-table">
          <tbody>
            {rows.map((row) => (
              <tr key={row}>
                {Array.from({ length: SIZE - row + 1 }, (_, i) => i + 1).map((col) => {
                  const isHi = col === 2 && row === 3
                  return (
                    <td key={col} className={isHi ? 'num-table-hi' : ''}>
                      <div className="num-table-value">{valueAt(col, row)}</div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: '0.8rem', color: '#4a5568', marginTop: 6 }}>（下から数えた行を上から順に表示。左端の列が三角数の列です）</p>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>左から1番目は三角数（1，3，6，10，15，…）になっています。</p>
        <p>
          (1) 左から10番目，下から6番目の整数がふくまれるグループの最後尾の数は，15番目の三角数なので120です。これより，120－9＝<b>111</b>
        </p>
        <p>
          (2) 155に最も近い三角数は，1＋2＋3＋……＋17＝153です。これより，左から1番目，下から17番目の数は153なので，左から18番目，下から1番目の数は154，<b>左から17番目，下から2番目</b>の数が155です。
        </p>
      </div>
    </div>
  )
}
