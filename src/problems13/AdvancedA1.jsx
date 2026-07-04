import { useAnimatedTime } from '../hooks/useAnimatedTime'
import { TimeSlider } from '../components/TimeSlider'

const DRIVE_T = 120
const REST_T = 20
const CYCLE = DRIVE_T + REST_T
const T_MAX = 640 // 10時間40分

function buildBlocks() {
  const blocks = []
  let t = 0
  for (let i = 0; i < 4; i++) {
    blocks.push({ t0: t, t1: t + DRIVE_T, type: 'drive' })
    t += DRIVE_T
    blocks.push({ t0: t, t1: t + REST_T, type: 'rest' })
    t += REST_T
  }
  blocks.push({ t0: t, t1: T_MAX, type: 'drive' })
  return blocks
}
const BLOCKS = buildBlocks()

function stateAt(t) {
  const b = BLOCKS.find((x) => t >= x.t0 && t <= x.t1) ?? BLOCKS[BLOCKS.length - 1]
  return b.type
}

function driveMinutesUpTo(t) {
  let sum = 0
  for (const b of BLOCKS) {
    if (b.type !== 'drive') continue
    sum += Math.max(0, Math.min(t, b.t1) - b.t0)
  }
  return sum
}

export default function AdvancedA1() {
  const { t, setT, playing, setPlaying, rate, setRate } = useAnimatedTime(T_MAX, { initialRate: 20 })
  const driveMin = driveMinutesUpTo(t)

  return (
    <div className="problem">
      <h2>応用問題A-1　渋滞区間をふくむ運転</h2>
      <div className="statement">
        <p className="setup">
          Ａ地点からＢ地点までは680kmあります。Ａ地点からＢ地点まで車で向かうのに，2時間走るごとに20分の休けいをとりながら進んだところ，全部で10時間40分かかりました。途中，渋滞している区間があり，その区間はゆっくり走りましたが，渋滞していないところは時速90kmで走りました。また，渋滞している区間を走るのにかかった時間は，その間にとった休けい時間をのぞいて2時間30分でした。
        </p>
        <ol className="question-list">
          <li>渋滞している区間は何kmでしたか。</li>
        </ol>
      </div>

      <div className="stage">
        <svg width={560} height={70} className="tank-view">
          {BLOCKS.map((b, i) => {
            const scale = 560 / T_MAX
            return <rect key={i} x={b.t0 * scale} y={20} width={(b.t1 - b.t0) * scale} height={30}
              fill={b.type === 'drive' ? '#63b3ed' : '#e2e8f0'} stroke="#4a5568" />
          })}
          <line x1={t * (560 / T_MAX)} y1={10} x2={t * (560 / T_MAX)} y2={60} stroke="#e53e3e" strokeWidth="2" />
        </svg>
      </div>
      <div className="readout">
        <p>経過時間：<b>{Math.floor(t / 60)}</b> 時間 <b>{Math.round(t % 60)}</b> 分後　（現在：{stateAt(t) === 'drive' ? '走行中' : '休けい中'}）</p>
        <p>走行時間の合計：<b>{Math.floor(driveMin / 60)}</b> 時間 <b>{Math.round(driveMin % 60)}</b> 分</p>
      </div>
      <TimeSlider t={t} setT={setT} tMax={T_MAX} playing={playing} setPlaying={setPlaying} rate={rate} setRate={setRate} rateOptions={[1, 20, 60]}
        jumps={[{ label: '9時間20分後（走行時間の合計）', t: 9 * 60 + 20 }, { label: '10時間40分後（Bに到着）', t: 640 }]} />

      <div className="explain">
        <h3>解説</h3>
        <p>
          2時間走るごとに20分の休けいをとるので，120＋20＝140(分周期)と考えます。全行程10時間40分＝640分 より，640÷140＝4(組)あまり80(分)。
          より，車で走っていた時間は，2時間×4＋80分＝9(時間)20(分)（10時間40分－20分×4 も可）となります。
        </p>
        <p>
          このことから時速90kmで走っていた時間は，9時間20分－2時間30分＝6(時間)50(分)。
          時速90kmで走った渋滞していない区間の道のりは，90×6と50/60＝90×41/6＝615(km)。
          したがって，渋滞している区間は，680－615＝<b>65(km)</b>
        </p>
      </div>
    </div>
  )
}
