export default function Advanced6() {
  return (
    <div className="problem">
      <h2>最難関問題集6　ブロックの入った立方体容器をかたむける</h2>
      <div className="statement">
        <p className="setup">
          1辺20cmの立方体の形をした容器の中に，たて8cm，横15cm，高さ20cmの直方体のブロックが，容器の1つの角にぴったりつくように底に固定されています。容器には深さ18cmまで水が入っています。容器のふちの1つの辺を軸にして，水がこぼれるまで45°かたむけます。
        </p>
        <ol className="question-list">
          <li>辺ＡＢを軸にしてかたむけたとき，こぼれる水の体積は何cm3ですか。</li>
          <li>辺ＣＤを軸にしてかたむけたとき，こぼれる水の体積は何cm3ですか。</li>
          <li>辺ＢＣを軸にしてかたむけたとき，こぼれる水の体積は何cm3ですか。</li>
        </ol>
      </div>

      <svg width={260} height={220} className="tank-view">
        <rect x={40} y={30} width={160} height={160} fill="none" stroke="#4a5568" strokeWidth="2" />
        <rect x={40} y={90} width={60} height={100} fill="#cbd5e0" stroke="#4a5568" strokeWidth="1.5" />
        <rect x={40} y={54} width={160} height={136} fill="#63b3ed" opacity="0.5" />
        <text x={120} y={22} fontSize="11" textAnchor="middle" fill="#2d3748">立方体容器（1辺20cm）</text>
        <text x={70} y={145} fontSize="10" textAnchor="middle" fill="#2d3748">ブロック</text>
        <text x={205} y={58} fontSize="10" fill="#2d3748">水面(18cm)</text>
      </svg>

      <div className="explain">
        <h3>解説</h3>
        <p>
          このような問題では，かたむける軸によって「正面から見た断面」が変わるので，水の体積をたて・横・高さに分けて，かたむく前後の断面積の変化から考えます。
        </p>
        <p>(1) 辺ＡＢを軸にしてかたむけたとき，こぼれる水の体積は<b>1440(cm3)</b></p>
        <p>(2) 辺ＣＤを軸にしてかたむけたとき，こぼれる水の体積は<b>2390(cm3)</b></p>
        <p>(3) 辺ＢＣを軸にしてかたむけたとき，こぼれる水の体積は<b>2300(cm3)</b></p>
      </div>
    </div>
  )
}
