import { useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { TankProfileView } from '../components/TankProfileView'
import { computeProfileDepth } from '../utils/tank'

function MiniTank({ segments, rate, tMax: forcedTMax, jumps, unitLabel = '分後' }) {
  const { depthAt, totalTime } = computeProfileDepth(segments, rate)
  const tMax = forcedTMax ?? totalTime
  const { t, setT, playing, setPlaying } = useAnimatedTime(tMax)
  const depth = depthAt(t)
  return (
    <div className="stage">
      <TankProfileView segments={segments.map((s) => ({ height: s.height, relWidth: Math.sqrt(s.area) }))} depth={depth} width={200} height={200} />
      <div style={{ flex: 1, minWidth: 240 }}>
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> {unitLabel}</p>
          <p>水面の高さ：<b>{depth.toFixed(2)}</b> cm</p>
        </div>
        <TimeSlider t={t} setT={setT} tMax={tMax} playing={playing} setPlaying={setPlaying} jumps={jumps} />
      </div>
    </div>
  )
}

export default function Basic1() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="problem">
      <h2>基本問題1　水量の変化：いろいろな容器</h2>
      <div className="statement">
        <p className="setup">次の問いに答えなさい。</p>
        <ol className="question-list">
          <li>たて5cm，横8cm，高さ20cmの直方体の形の容器に，15cmの深さまで水が入っています。水は何dL入っていますか。</li>
          <li>高さ10cmの円柱の形の容器があります。この容器が空の状態から，毎秒30cm3の割合で水を15秒入れたところ，水の深さは9cmになりました。容器の底面積は何cm2ですか。</li>
          <li>直方体を組み合わせた形の容器があります。この容器が空の状態から，毎分200cm3の割合で水を15分入れました。水の深さは何cmになりましたか。</li>
          <li>直方体を組み合わせた形の容器が床に置かれています。この容器が空の状態から，毎分400cm3の割合で水を入れるとき，床からの水面の高さが12cmになるのは，水を入れ始めてから何分後ですか。</li>
          <li>直方体の形の容器に，10cmの深さまで水が入っています。この容器にふたをして，太線で囲まれた面が下になるように容器をたおすと，水の深さは何cmになりますか。</li>
        </ol>
      </div>

      <h3>(1) たて5cm，横8cm，高さ20cm，深さ15cm</h3>
      <MiniTank segments={[{ height: 20, area: 40 }]} rate={40} tMax={20} jumps={[{ label: '15cm（問題の深さ）', t: 15 }]} />
      <div className="explain"><p>5×8×15＝600(cm3)。1dL＝100cm3 より，600÷100＝<b>6(dL)</b></p></div>

      <h3>(2) 円柱，毎秒30cm3を15秒</h3>
      <MiniTank segments={[{ height: 10, area: 50 }]} rate={30} tMax={15} jumps={[{ label: '15秒後（水深9cm）', t: 15 }]} unitLabel="秒後" />
      <div className="explain"><p>30×15÷9＝<b>50(cm2)</b></p></div>

      <h3>(3) 段差のある容器，毎分200cm3を15分</h3>
      <MiniTank segments={[{ height: 20, area: 375 }]} rate={200} tMax={15} jumps={[{ label: '15分後', t: 15 }]} />
      <div className="explain"><p>容器の底面積は，20×20－5×5＝375(cm2)。200×15÷375＝<b>8(cm)</b></p></div>

      <h3>(4) 段差のある容器，毎分400cm3</h3>
      <MiniTank segments={[{ height: 10, area: 600 }, { height: 2, area: 800 }]} rate={400}
        jumps={[{ label: '15分後（10cmに到達）', t: 15 }, { label: '19分後（12cmに到達）', t: 19 }]} />
      <div className="explain">
        <p>
          12cm分の水の体積は，30×20×10＋40×20×(12－10)＝6000＋1600＝7600(cm3)。よって，7600÷400＝<b>19(分後)</b>
        </p>
      </div>

      <h3>(5) 容器をたおす</h3>
      <div className="jump-row">
        <button className={`jump-btn${!flipped ? ' active' : ''}`} onClick={() => setFlipped(false)}>たおす前（深さ10cm）</button>
        <button className={`jump-btn${flipped ? ' active' : ''}`} onClick={() => setFlipped(true)}>たおした後</button>
      </div>
      <TankProfileView
        segments={flipped ? [{ height: 6, relWidth: Math.sqrt(15) }] : [{ height: 15, relWidth: Math.sqrt(6) }]}
        depth={flipped ? 6 : 10}
        width={200}
        height={200}
      />
      <div className="explain">
        <p>正面から見たときの面積は変わらないことに注目します。10×9＝90(cm2)…正面から見た面積。90÷15＝<b>6(cm)</b></p>
      </div>
    </div>
  )
}
