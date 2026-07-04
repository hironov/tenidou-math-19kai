import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { ValueGraph } from '../components/ValueGraph'

const Q = 6560
const SPEED_ANI = 100
const SWITCH_T = 24
const SPEED_OTOTO_WALK = 80
const SPEED_OTOTO_RUN = 160
const T_MAX = 65.6

function posAni(t) { return Math.min(Q, SPEED_ANI * t) }
function posOtoto(t) {
  if (t <= SWITCH_T) return SPEED_OTOTO_WALK * t
  return Math.min(Q, SPEED_OTOTO_WALK * SWITCH_T + SPEED_OTOTO_RUN * (t - SWITCH_T))
}
function dist(t) { return Math.abs(posAni(t) - posOtoto(t)) }

export default function AdvancedA3() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX)
  const d = dist(t)

  return (
    <div className="problem">
      <h2>応用問題A-3　途中で走り出して追いこす弟</h2>
      <div className="statement">
        <p className="setup">
          兄と弟がＰ地点を同時に出発してＱ地点に向かいました。兄はＰ地点からＱ地点まで一定の速さで歩きました。
          弟ははじめは分速80ｍで歩いていましたが，途中からは一定の速さで走ってＱ地点に向かったところ，途中で兄を追いこし，兄よりも先にＱ地点に着きました。
          右のグラフは，2人が出発してから兄がＱ地点に着くまでの時間と，2人の間のきょりの関係を表したものです。
        </p>
        <ol className="question-list">
          <li>兄の歩く速さ，弟の走る速さはそれぞれ分速何ｍですか。</li>
          <li>弟が兄を追いこしたのは，Ｐ地点から何ｍの地点ですか。</li>
        </ol>
      </div>

      <LinearTrackView length={Q}
        markers={[{ pos: 0, label: 'P' }, { pos: Q, label: 'Q' }]}
        points={[{ label: '兄', color: '#3182ce', pos: posAni(t) }, { label: '弟', color: '#dd6b20', pos: posOtoto(t) }]}
      />

      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　2人の間のきょり：<b>{d.toFixed(0)}</b> m</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate}
        jumps={[
          { label: '24分後（弟が走り出す）', t: 24 },
          { label: '32分後（弟が兄を追いこす）', t: 32 },
          { label: '53分後（弟がQに到着）', t: 53 },
          { label: '65.6分後（兄がQに到着）', t: 65.6 },
        ]} />

      <div className="graph-block">
        <h3>2人の間のきょりのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={1400} valueFn={dist} t={t}
          yLabel="きょり(m)" xLabel="時間(分)" markLines={[{ t: 24, label: '24' }, { t: 53, label: '53' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 0〜24分後…2人が同じ方向に進み，24分間で480ｍはなれる→速さの差は20(ｍ/分)。弟が分速80ｍなので，兄は<b>分速100ｍ</b>。24〜53分後…弟が兄より早く進み，480ｍ追いついたあと，さらに1260ｍ先に進む→29分間で1740ｍ多く進んだので，弟の走る速さは<b>分速160ｍ</b>。</p>
        <p>(2) 480÷(160－100)＝8(分) より，24＋8＝32(分後)に追いこします。よって，弟が兄を追いこしたのは，Ｐ地点から，100×32＝<b>3200(ｍ)</b>。</p>
      </div>
    </div>
  )
}
