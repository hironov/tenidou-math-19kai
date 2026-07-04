import { TreeDiagram } from '../components/TreeDiagram'

const ROOT = {
  label: '選ぶ',
  children: [
    {
      label: '赤',
      children: [
        {
          label: '赤',
          children: [
            { label: '赤' },
            { label: '白' },
            { label: '青' },
          ],
        },
        { label: '白', children: [{ label: '青' }] },
        { label: '青', children: [{ label: '青' }] },
      ],
    },
    { label: '白', children: [{ label: '青', children: [{ label: '青' }] }] },
  ],
}

export default function Example1() {
  return (
    <div className="problem">
      <h2>例題1　樹形図で組み合わせを数える</h2>
      <div className="statement">
        <p className="setup">
          赤いボールが3個，白いボールが1個，青いボールが2個あります。これらの6個のボールの中から3個を選ぶとき，ボールの組み合わせは何通りありますか。
        </p>
      </div>

      <div className="graph-block">
        <h3>樹形図（選ぶ順序：赤→白→青）</h3>
        <TreeDiagram root={ROOT} />
        <p style={{ fontSize: '0.85rem', color: '#4a5568', marginTop: 6 }}>
          葉（一番下の○）までの経路が1つの組み合わせ：赤3／赤2白1／赤2青1／赤1白1青1／赤1青2／白1青2 の6通り。
        </p>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          選ぶ順序を 赤→白→青 とします。今あるボールを，赤 赤 赤 白 青 青 のようにならべ，この矢印にそって戻らないように樹形図を書いていきます。
          （白のあとに赤，青のあとに赤や白を選ばないように気をつけましょう。）
        </p>
        <p>組み合わせの樹形図では，樹形図を書く前に「選ぶ順序」を決めることが重要です。「選ぶ順序」にしたがって，戻らずに書くことで，同じ組み合わせの重複をふせぐことができます。</p>
        <p>以上より，<b>6通り</b></p>
      </div>
    </div>
  )
}
