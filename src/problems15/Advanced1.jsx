import { useState } from 'react'

const CARDS = [1, 2, 3, 4, 5]

function ArrangePicker({ checkFn, checkLabel }) {
  const [order, setOrder] = useState([])

  const toggle = (v) => {
    setOrder((prev) => {
      if (prev.includes(v)) return prev.filter((x) => x !== v)
      if (prev.length >= CARDS.length) return prev
      return [...prev, v]
    })
  }

  const full = order.length === CARDS.length
  const ok = full && checkFn ? checkFn(order) : null

  return (
    <div>
      <div className="combo-items">
        {CARDS.map((v) => (
          <button key={v} className={`combo-item${order.includes(v) ? ' active' : ''}`} onClick={() => toggle(v)}>{v}</button>
        ))}
      </div>
      <p className="readout" style={{ marginTop: 8 }}>
        {full ? `ならべ方：${order.join(' ')}` : `カードをならべる順にクリックしてください（${order.length}/5）`}
      </p>
      {full && checkFn && (
        <p className="combo-message">{checkLabel}：{ok ? '条件を満たします' : '条件を満たしません'}</p>
      )}
    </div>
  )
}

export default function Advanced1() {
  return (
    <div className="problem">
      <h2>最難関問題集1　カードのならべ方</h2>
      <div className="statement">
        <p className="setup">1，2，3，4，5の数字が1つずつ書かれた5枚のカードを横1列にならべます。</p>
        <ol className="question-list">
          <li>ならべ方は全部で何通りありますか。</li>
          <li>「1」が「3」より左，「3」が「5」より左になるようなならべ方は何通りありますか。</li>
          <li>左から右に見ていくとき，数字が「大きくなってから小さくなる」山型のならべ方（はじめから終わりまでずっと大きくなる，またはずっと小さくなるものは除く）は何通りありますか。</li>
        </ol>
      </div>

      <h3>(2) 「1」→「3」→「5」の順になっているか</h3>
      <ArrangePicker checkFn={(o) => o.indexOf(1) < o.indexOf(3) && o.indexOf(3) < o.indexOf(5)} checkLabel="1，3，5がこの順にならんでいるか" />

      <h3>(3) 山型のならび方か</h3>
      <ArrangePicker checkFn={(o) => {
        const peak = o.indexOf(Math.max(...o))
        if (peak === 0 || peak === o.length - 1) return false
        for (let i = 0; i < peak; i++) if (o[i] >= o[i + 1]) return false
        for (let i = peak; i < o.length - 1; i++) if (o[i] <= o[i + 1]) return false
        return true
      }} checkLabel="山型（増加してから減少する）か" />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 積の法則を用いて，5×4×3×2×1＝<b>120(通り)</b></p>
        <p>(2) 「1」「3」「5」の3枚の並び方は3！＝6通りありますが，そのうち「1→3→5」の順になっているのは1通りだけです。したがって，120÷6＝<b>20(通り)</b></p>
        <p>
          (3) 山型になるには，5個の数字のうち「5」を除く4個から，山の左側(小さい順)に入るものを何個選ぶかで決まります。左側に0個(全部右側)…1通り，1個…4通り，2個…6通り，3個…4通り，4個(全部左側)…1通り。
          このうち，山の左側が0個(ずっと減少)と4個(ずっと増加)の場合を除くので，4＋6＋4＝<b>14(通り)</b>
        </p>
      </div>
    </div>
  )
}
