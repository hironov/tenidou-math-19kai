import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { LinearTrackView } from '../components/LinearTrackView'
import { PositionDiagram } from '../components/PositionDiagram'

const Q_DIST = 4400 / 3 // P駅からQ駅までの距離（解説で求まる）
const SPEED_ROPE = 300
const START_B = 8
const SPEED_TARO = 100
const T_MAX = 16

function posRopeA(t) { return Math.min(Q_DIST, SPEED_ROPE * t) }
function posRopeB(t) { return t < START_B ? 0 : Math.min(Q_DIST, SPEED_ROPE * (t - START_B)) }
function posTaro(t) { return Math.max(0, Q_DIST - SPEED_TARO * t) }

function toClock(t) {
  const totalSec = Math.round(t * 60)
  const m = 0 + Math.floor(totalSec / 60)
  const s = totalSec % 60
  const hh = 8 + Math.floor(m / 60)
  const mm = m % 60
  return `${hh}時${mm}分${s.toString().padStart(2, '0')}秒`
}

export default function AdvancedA1() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)

  return (
    <div className="problem">
      <h2>応用問題A-1　ロープウェイと下山する太郎君</h2>
      <div className="statement">
        <p className="setup">
          ロープウェイＡはＰ駅を午前8時に出発して，一定の速さで山頂のＱ駅に向かいました。ロープウェイＢは，ロープウェイＡより8分おくれてＰ駅を出発して，ロープウェイＡと同じ速さでＱ駅に向かいました。
          ロープウェイの経路の真下にある道を，Ｑ駅からＰ駅に向かって分速100ｍで下山していた太郎君は，Ｐ駅まであと1100ｍの地点でロープウェイＡとすれちがい，その後，Ｐ駅まであと500ｍの地点でロープウェイＢとすれちがいました。
        </p>
        <ol className="question-list">
          <li>ロープウェイの速さは分速何ｍですか。</li>
          <li>太郎君は，午前何時何分何秒にＰ駅に着きましたか。</li>
        </ol>
      </div>

      <LinearTrackView length={Q_DIST}
        markers={[{ pos: 0, label: 'P' }, { pos: Q_DIST, label: 'Q' }, { pos: 1100, label: '1100m' }, { pos: 500, label: '500m' }]}
        points={[
          { label: '太郎', color: '#38a169', pos: posTaro(t), row: 0 },
          { label: 'A', color: '#3182ce', pos: posRopeA(t), row: 1 },
          { label: 'B', color: '#dd6b20', pos: posRopeB(t), row: 2 },
        ]}
      />
      <div className="readout"><p>8時からの経過：<b>{t.toFixed(2)}</b> 分後　＝　<b>{toClock(t)}</b></p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[
          { label: '3分40秒後（AとTaroがすれちがう）', t: 11 / 3 },
          { label: '8分後（Bが出発）', t: 8 },
          { label: '9分40秒後（BとTaroがすれちがう）', t: 29 / 3 },
          { label: '14分40秒後（太郎がPに到着）', t: 44 / 3 },
        ]} />

      <div className="graph-block">
        <h3>ダイヤグラム</h3>
        <PositionDiagram tMax={T_MAX} yMax={Q_DIST} t={t}
          yLabel="位置(m)" xLabel="時間(分)" yBottomLabel="P" yTopLabel="Q"
          series={[
            { label: '太郎', color: '#38a169', fn: posTaro },
            { label: 'A', color: '#3182ce', fn: posRopeA },
            { label: 'B', color: '#dd6b20', fn: posRopeB },
          ]}
          markLines={[{ t: 8, label: '8' }]} />
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>(1) (1100－500)÷100＝6(分)。ロープウェイの速さは，(1100－500)÷(8－6)＝<b>300(ｍ/分)</b>。</p>
        <p>(2) ロープウェイＢが太郎君とすれちがったのは，8＋500÷300＝9と2/3(分後)。このあと太郎君は，500÷100＝5(分)でＰ駅に着くので，9と2/3＋5＝14と2/3分＝14分40秒。よって，<b>午前8時14分40秒</b>。</p>
      </div>
    </div>
  )
}
