import { useMemo } from 'react'
import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { ValueGraph } from '../components/ValueGraph'

const ROUTE = 720
const SPEED_OTOTO = 80
const START_ANI = 6
const SPEED_ANI = 120
const T_MAX = 14

function posOtoto(t) { return Math.min(ROUTE, SPEED_OTOTO * t) }
function posAni(t) { return t < START_ANI ? 0 : Math.min(ROUTE, SPEED_ANI * (t - START_ANI)) }
function dist(t) { return Math.abs(posOtoto(t) - posAni(t)) }

export default function Example6() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const d = dist(t)

  return (
    <div className="problem">
      <h2>例題6　二者間グラフ（追いつかれて到着）</h2>
      <div className="statement">
        <p className="setup">
          弟が家を出て，一定の速さで歩いて駅に向かいました。兄は弟よりも何分かおくれて家を出て，一定の速さで走って駅に向かいました。
          下のグラフは，弟が家を出てから兄が駅に着くまでの時間と，2人の間のきょりの関係を表したものです。
        </p>
        <ol className="question-list">
          <li>弟の速さは分速何ｍですか。</li>
          <li>兄の速さは分速何ｍですか。</li>
          <li>グラフのxにあてはまる数を求めなさい。</li>
        </ol>
      </div>

      <LinearTrackView length={ROUTE}
        markers={[{ pos: 0, label: '家' }, { pos: ROUTE, label: '駅' }]}
        points={[{ label: '弟', color: '#dd6b20', pos: posOtoto(t) }, { label: '兄', color: '#3182ce', pos: posAni(t) }]}
      />

      <div className="readout">
        <p>経過時間：<b>{t.toFixed(1)}</b> 分後　／　2人の間のきょり：<b>{d.toFixed(0)}</b> m</p>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '0〜6分（弟だけ）', t: 3 }, { label: '6〜9分（兄が追う）', t: 7.5 }, { label: '9〜12分（兄だけ）', t: 10.5 }, { label: 'x=12分（兄到着）', t: 12 }]} />

      <div className="graph-block">
        <h3>2人の間のきょりのグラフ</h3>
        <ValueGraph tMax={T_MAX} yMax={500} valueFn={dist} t={t}
          yLabel="きょり(m)" xLabel="時間(分)"
          markLines={[{ t: 6, label: '6' }, { t: 9, label: '9' }, { t: 12, label: 'x' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 0〜6分…弟だけが進んで，6分で480m。弟の速さは，480÷6＝<b>80(ｍ/分)</b>。</p>
        <p>(2) 6〜9分…兄が弟を追いかけて，3分で480－360＝120m縮まる。速さの差は120÷3＝40。兄の速さは80＋40＝<b>120(ｍ/分)</b>。</p>
        <p>(3) 9〜x分…兄だけが進んで360m。360÷120＝3分。よって，x＝9＋3＝<b>12(分)</b>。</p>
      </div>
    </div>
  )
}
