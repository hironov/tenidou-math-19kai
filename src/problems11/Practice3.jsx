export default function Practice3() {
  return (
    <div className="problem">
      <h2>練習問題3　立方体の辺を通る道順</h2>
      <div className="statement">
        <p className="setup">
          同じ大きさの立方体を2つ組み合わせた直方体があります。これらの立方体の辺（実線と点線）を通って，頂点Ａから頂点Ｂまで遠回りせずに進む行き方は何通りありますか。
        </p>
      </div>

      <svg width={280} height={200} className="tank-view">
        {/* 簡略化した2つの立方体（直方体）の見取り図 */}
        <polygon points="30,150 150,150 190,110 70,110" fill="none" stroke="#4a5568" strokeWidth="1.5" />
        <polygon points="30,60 150,60 190,20 70,20" fill="none" stroke="#4a5568" strokeWidth="1.5" />
        <line x1="30" y1="150" x2="30" y2="60" stroke="#4a5568" strokeWidth="1.5" />
        <line x1="150" y1="150" x2="150" y2="60" stroke="#4a5568" strokeWidth="1.5" />
        <line x1="190" y1="110" x2="190" y2="20" stroke="#4a5568" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="70" y1="110" x2="70" y2="20" stroke="#4a5568" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="70" y1="110" x2="30" y2="150" stroke="#4a5568" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="70" y1="20" x2="30" y2="60" stroke="#4a5568" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="90" y1="150" x2="90" y2="60" stroke="#4a5568" strokeWidth="1.5" />
        <line x1="130" y1="110" x2="130" y2="20" stroke="#4a5568" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="110" y1="150" x2="150" y2="110" stroke="#4a5568" strokeWidth="1.5" />
        <line x1="110" y1="60" x2="150" y2="20" stroke="#4a5568" strokeWidth="1.5" />
        <text x="20" y="165" fontSize="13" fontWeight="bold">Ａ</text>
        <text x="195" y="18" fontSize="13" fontWeight="bold">Ｂ</text>
      </svg>

      <div className="explain">
        <h3>解説</h3>
        <p>
          和の法則を用いて，1回ごとに移動する方法を数えていくと，<b>12通り</b>になります。
        </p>
        <p>
          立体図形ですから進む方向は右（→），上（↑）に加えて，奥（↗）があるので，平面のときと同じように「直前にいた点」が3か所あることに注意しましょう。
          Ａから出発してすぐの3方向にはそれぞれ「1」が書きこまれ，そこから先は「和の法則」で数字をたしていくと，最終的にＢには12がならびます。
        </p>
      </div>
    </div>
  )
}
