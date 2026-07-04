import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { TankProfileView } from '../components/TankProfileView'
import { ValueGraph } from '../components/ValueGraph'
import { computeProfileDepth } from '../utils/tank'

const RATE = 20 // cm3/秒
const SEGMENTS = [
  { height: 8, area: 140 }, // おもりA・Bの両方がある区間
  { height: 10, area: 180 }, // おもりBのみある区間（Aの高さ8cmを超えた）
  { height: 5, area: 300 }, // おもりが無い区間（Bの高さ18cmを超えた）
]
const { depthAt, totalTime } = computeProfileDepth(SEGMENTS, RATE)
const T_MAX = totalTime

export default function AdvancedA2() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { initialRate: 5 })
  const depth = depthAt(t)

  return (
    <div className="problem">
      <h2>応用問題A-2　底に2つの円柱のおもり</h2>
      <div className="statement">
        <p className="setup">
          直方体の形をした水そうの底に2つの円柱のおもりＡ，Ｂが置かれています。Ｂの高さはＡよりも高いです。この水そうに一定の割合で水を入れました。グラフは，水を入れ始めてからの時間と水面の高さの関係を表したもので，・はグラフが折れ曲がる点を表しています。
        </p>
        <ol className="question-list">
          <li>おもりＡの底面積は何cm2ですか。</li>
          <li>おもりＢの高さは何cmですか。</li>
        </ol>
      </div>

      <div className="stage">
        <TankProfileView segments={SEGMENTS.map((s) => ({ height: s.height, relWidth: Math.sqrt(s.area) }))} depth={depth} />
        <div className="readout">
          <p>経過時間：<b>{t.toFixed(1)}</b> 秒後</p>
          <p>水面の高さ：<b>{depth.toFixed(1)}</b> cm</p>
        </div>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate} rateOptions={[1, 5, 20]}
        jumps={[
          { label: '56秒後（おもりAの高さ8cmを通過）', t: 56 },
          { label: '101秒後（13cm）', t: 101 },
          { label: '146秒後（おもりBの高さ18cmを通過）', t: 146 },
          { label: '176秒後（20cm）', t: 176 },
          { label: '221秒後（23cm）', t: 221 },
        ]} />

      <div className="graph-block">
        <h3>水面の高さのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={23} valueFn={depthAt} t={t} yLabel="cm" xLabel="(秒)"
          markLines={[{ t: 56, label: '56' }, { t: 101, label: '101' }, { t: 176, label: '176' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) 水そうの底面積は，20×15＝300(cm2)。176秒後から221秒後は水がおもりの無い部分に入っているので，このとき水面の上がる速さは，
          (23－20)÷(221－176)＝1/15(cm/秒) より，1秒間に入る水の量は，300×1/15＝20(cm3/秒)です。
          よって，おもりAとBの両方がある部分の底面積は，20×56÷8＝140(cm2)。また，おもりBのみある部分の底面積は，20×(101－56)÷(13－8)＝180(cm2)。
          以上より，Ａの底面積は，180－140＝<b>40(cm2)</b>
        </p>
        <p>
          (2) おもりBのみある部分に水が入っているときの水面の上がる速さは，(13－8)÷(101－56)＝1/9(cm/秒)。101秒から176秒の間に，水面は，20－13＝7(cm)上がっているので，
          この間に1/9(cm/秒)の割合で水面が上がった時間は，(7－1/15×75)÷(1/9－1/15)＝45(秒)です。したがって，Ｂの高さは，13＋1/9×45＝<b>18(cm)</b>とわかります。
        </p>
      </div>
    </div>
  )
}
