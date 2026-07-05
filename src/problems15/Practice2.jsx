import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'
import { CircularTrackView } from '../components/CircularTrackView'

const LAP = 720
const T1 = 120 // 1周目：秒速6m
const T2 = 80 // 2周目：秒速9m
const T_MAX = T1 + T2

function dist(t) {
  if (t <= T1) return 6 * t
  return LAP + 9 * Math.min(t - T1, T2)
}

export default function Practice2() {
  const { t, setT, playing, setPlaying } = useAnimatedTime(T_MAX)
  const d = dist(t)
  const frac = (d % LAP) / LAP

  return (
    <div className="problem">
      <h2>練習問題2　旗の立つ円形コース</h2>
      <div className="statement">
        <p className="setup">
          1周の長さがわからない円形のコースに，8mごとに旗が立っています。Ａさんはこのコースを一定の速さで自転車で走ります。
        </p>
        <ol className="question-list">
          <li>ある区間で，旗と旗の間を測ったところ，12本分(96m)を16秒で通過しました。Ａさんの速さは秒速何mですか。</li>
          <li>Ａさんがこのコースを1周するのに120秒かかりました。このコースの旗は全部で何本ありますか。</li>
          <li>2周目に入ってからＡさんは速さを変え，24秒で216m進みました。2周目にかかった時間は何秒ですか。また，1周目と2周目をあわせた平均の速さは秒速何mですか。</li>
        </ol>
      </div>

      <CircularTrackView label={`1周${LAP}m`} points={[{ label: 'A', color: '#3182ce', frac }]} />
      <div className="readout"><p>経過時間：<b>{t.toFixed(1)}</b> 秒後　道のり：<b>{d.toFixed(0)}</b> m</p></div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying}
        jumps={[{ label: '120秒後（1周）', t: T1 }, { label: '200秒後（2周）', t: T_MAX }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>(1) 96÷16＝<b>6(m/秒)</b></p>
        <p>(2) 1周の長さは，6×120＝720(m)。旗の本数は，720÷8＝<b>90(本)</b></p>
        <p>(3) 2周目の速さは，216÷24＝9(m/秒)。2周目にかかった時間は，720÷9＝<b>80(秒)</b>。平均の速さは，(720×2)÷(120＋80)＝<b>7.2(m/秒)</b></p>
      </div>
    </div>
  )
}
