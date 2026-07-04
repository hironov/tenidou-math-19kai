import { useState } from 'react'
import { ComboPicker } from '../components/ComboPicker'

const PEOPLE = ['A', 'B', 'C', 'D', 'E'].map((l) => ({ id: l, label: l }))

export default function Basic2() {
  const [order, setOrder] = useState([])

  const pickLeader = (id) => {
    setOrder((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 2) return prev
      return [...prev, id]
    })
  }

  return (
    <div className="problem">
      <h2>基本問題2　組み合わせと順列のちがい</h2>
      <div className="statement">
        <p className="setup">Ａ，Ｂ，Ｃ，Ｄ，Ｅの5人の班があります。</p>
        <ol className="question-list">
          <li>5人の中から班長と副班長を1人ずつ選ぶ方法は何通りありますか。</li>
          <li>5人の中から給食係を2人選ぶ方法は何通りありますか。</li>
        </ol>
      </div>

      <h3>(1) 班長→副班長の順にクリック</h3>
      <div className="combo-items">
        {PEOPLE.map((p) => (
          <button key={p.id} className={`combo-item${order.includes(p.id) ? ' active' : ''}`} onClick={() => pickLeader(p.id)}>{p.label}</button>
        ))}
      </div>
      <p className="readout">
        {order.length === 0 && '班長を選んでください'}
        {order.length === 1 && `班長：${order[0]}　次に副班長を選んでください`}
        {order.length === 2 && `班長：${order[0]}　副班長：${order[1]}（クリック順が結果に反映されます＝順列）`}
      </p>

      <h3>(2) 給食係2人を選ぶ（順番は関係ない＝組み合わせ）</h3>
      <ComboPicker items={PEOPLE} pickCount={2} totalLabel="10通り" />

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 班長と副班長を「選ぶ」とありますが，「班長がＡで副班長がＢ」と，「班長がＢで副班長がＡ」は異なる事象です。つまり，今回は組み合わせ方ではなく，
          ならべ方の話をしていますので，班長5×副班長4＝<b>20(通り)</b>
        </p>
        <p>(2) <sub>5</sub>C<sub>2</sub>＝5×4÷(2×1)＝<b>10(通り)</b></p>
      </div>
    </div>
  )
}
