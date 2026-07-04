import { useState } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { TankProfileView } from '../components/TankProfileView'
import { ValueGraph } from '../components/ValueGraph'

const SEGMENTS = [
  { height: 28, area: 30000 }, // 下の段（120cm×250cm）
  { height: 16, area: 37500 }, // 上の段（150cm×250cm）、満水44cm
]

// 図2：深さ20cmになった時点で毎分40Ｌに切りかえ
function depthMode1(t) {
  if (t <= 24) return (5 / 6) * t
  if (t <= 30) return 20 + (4 / 3) * (t - 24)
  return Math.min(44, 28 + (16 / 15) * (t - 30))
}
const T_MAX_1 = 45

// 図3：48分たった時点で毎分40Ｌに切りかえ
function depthMode2(t) {
  if (t <= 24) return (5 / 6) * t
  if (t <= 33.6) return 20 + (5 / 6) * (t - 24)
  if (t <= 48) return 28 + (2 / 3) * (t - 33.6)
  return Math.min(44, 37.6 + (16 / 15) * (t - 48))
}
const T_MAX_2 = 54

export default function AdvancedB1() {
  const [mode, setMode] = useState('1')
  const depthAt = mode === '1' ? depthMode1 : depthMode2
  const T_MAX = mode === '1' ? T_MAX_1 : T_MAX_2
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { initialRate: 5 })
  const depth = depthAt(t)

  return (
    <div className="problem">
      <h2>応用問題B-1　切りかえのタイミングが異なる2つの実験</h2>
      <div className="statement">
        <p className="setup">
          直方体を組み合わせた形の水そうがあります。図2は，水そうが空の状態から，はじめ毎分25Ｌの割合で水を注ぎ，深さ20cmになったときからは毎分40Ｌの割合でいっぱいになるまで水そうに水を入れたときの時間と水の深さの関係を表しています。
          図3は，水そうが空の状態から，はじめ毎分25Ｌの割合で水を注ぎ，48分たってからは毎分40Ｌの割合でいっぱいになるまで水そうに水を入れたときの時間と水の深さの関係を表しています。
        </p>
        <ol className="question-list">
          <li>アにあてはまる数を求めなさい。</li>
          <li>イ，ウ，エにあてはまる数をそれぞれ求めなさい。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${mode === '1' ? ' active' : ''}`} onClick={() => { setMode('1'); setT(0) }}>図2（深さ20cmで切りかえ）</button>
        <button className={`jump-btn${mode === '2' ? ' active' : ''}`} onClick={() => { setMode('2'); setT(0) }}>図3（48分後に切りかえ）</button>
      </div>

      <div className="stage">
        <TankProfileView segments={SEGMENTS.map((s) => ({ height: s.height, relWidth: Math.sqrt(s.area) }))} depth={depth} />
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 分後</p>
          <p>水面の高さ：<b>{depth.toFixed(1)}</b> cm</p>
        </div>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate}
        jumps={
          mode === '1'
            ? [{ label: 'ア＝24分後（深さ20cmに到達）', t: 24 }, { label: '30分後（実際の段差28cmを通過）', t: 30 }, { label: '45分後（満水44cm）', t: 45 }]
            : [{ label: '24分後（20cm）', t: 24 }, { label: 'イ＝33.6分後（段差28cmを通過）', t: 33.6 }, { label: '48分後（37.6cmで切りかえ）', t: 48 }, { label: 'ウ＝54分後（エ＝44cmで満水）', t: 54 }]
        } />

      <div className="graph-block">
        <h3>水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={44} valueFn={depthAt} t={t} yLabel="cm" xLabel="(分)"
          markLines={mode === '1' ? [{ t: 24, label: 'ア' }, { t: 45, label: '45' }] : [{ t: 33.6, label: 'イ' }, { t: 48, label: '48' }, { t: 54, label: 'ウ' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 図2のグラフでは，アの時間から，1分間に上がる水の深さが速くなっているので，アの時間のときに毎分40Ｌにかえたことがわかります。
          下の段に水を入れているとき，1分間に上がる水の深さは，25×1000÷(120×250)＝5/6(cm/分)。よって，ア＝20÷5/6＝<b>24(分)</b>です。
        </p>
        <p>
          (2) 上の段に毎分25Ｌずつ水を入れるときに，1分間に上がる水の深さは，25×1000÷(150×250)＝2/3(cm/分)。
          図3では，48分間のうち，はじめは5/6(cm/分)，段差を超えてからは2/3(cm/分)の割合で上昇して，合計37.6cmに達します。
          よって，つるかめ算より，下の段に水を入れるのにかかった時間は，(37.6－2/3×48)÷(5/6－2/3)＝33.6(分)。したがって，グラフのイは，5/6×33.6＝<b>28(cm)</b>です。
        </p>
        <p>
          次に，図2のグラフについて考えると，水そうの容積は，25×24＋40×(45－24)＝1440(Ｌ)なので，図3のグラフから，毎分40Ｌの割合で入れた時間は，
          (1440－25×48)÷40＝6(分)とわかります。よって，ウ＝48＋6＝<b>54(分)</b>。48分後以降で1分間に上がる水の深さは，40×1000÷(150×250)＝16/15(cm/分) より，
          37.6＋16/15×6＝<b>44(cm)</b>…エです。
        </p>
      </div>
    </div>
  )
}
