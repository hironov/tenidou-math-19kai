export default function Basic6() {
  return (
    <div className="problem">
      <h2>基本問題6　往復の速さ</h2>
      <div className="statement">
        <p className="setup">
          家から公園までの1.8kmの道のりを，行きは分速200mで，帰りは分速300mで往復しました。
        </p>
        <ol className="question-list">
          <li>往復にかかった時間は何分ですか。</li>
          <li>往復の平均の速さは分速何mですか。</li>
        </ol>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 行き…1800÷200＝9(分)。帰り…1800÷300＝6(分)。あわせて，9＋6＝<b>15(分)</b></p>
        <p>
          (2) 平均の速さ＝合計の道のり÷合計の時間 です。往復では、行きと帰りでかかった時間が異なるので，単純に2つの速さを平均してはいけません。
          (1800×2)÷15＝<b>240(m/分)</b>
        </p>
      </div>
    </div>
  )
}
