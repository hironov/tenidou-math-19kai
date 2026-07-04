import { useState } from 'react'

const B_POS = 600
const C_POS = 1800
const D_POS = 3600
const B_PERIOD = 6
const B_GREEN = 3
const C_PERIOD = 4
const C_GREEN = 2
const T_MAX = 16

function waitAtSignal(arrival, period, green) {
  const cycle = ((arrival % period) + period) % period
  if (cycle < green) return arrival
  return arrival + (period - cycle)
}

function computeTrip(speed) {
  const tBArrive = B_POS / speed
  const tBDepart = waitAtSignal(tBArrive, B_PERIOD, B_GREEN)
  const tCArrive = tBDepart + (C_POS - B_POS) / speed
  const tCDepart = waitAtSignal(tCArrive, C_PERIOD, C_GREEN)
  const tDArrive = tCDepart + (D_POS - C_POS) / speed
  return { tBArrive, tBDepart, tCArrive, tCDepart, tDArrive }
}

function posAt(speed, trip, t) {
  const { tBArrive, tBDepart, tCArrive, tCDepart } = trip
  if (t <= tBArrive) return speed * t
  if (t <= tBDepart) return B_POS
  if (t <= tCArrive) return B_POS + speed * (t - tBDepart)
  if (t <= tCDepart) return C_POS
  return Math.min(D_POS, C_POS + speed * (t - tCDepart))
}

function redBands(period, green, tMax) {
  const bands = []
  let t = green
  while (t < tMax) {
    bands.push([t, Math.min(tMax, t + (period - green))])
    t += period
  }
  return bands
}

const WIDTH = 640
const HEIGHT = 400
const PAD = { l: 56, r: 20, t: 16, b: 30 }
const W = WIDTH - PAD.l - PAD.r
const H = HEIGHT - PAD.t - PAD.b
const sx = (t) => PAD.l + (t / T_MAX) * W
const sy = (pos) => PAD.t + H - (pos / D_POS) * H

export default function AdvancedB2() {
  const [speed, setSpeed] = useState(250)
  const trip = computeTrip(speed)
  const N = 200
  const pathPts = []
  for (let i = 0; i <= N; i++) {
    const tt = (T_MAX * i) / N
    pathPts.push([tt, posAt(speed, trip, tt)])
  }
  const pathD = pathPts.map(([tt, pp], i) => `${i === 0 ? 'M' : 'L'} ${sx(tt).toFixed(1)} ${sy(pp).toFixed(1)}`).join(' ')

  const bBands = redBands(B_PERIOD, B_GREEN, T_MAX)
  const cBands = redBands(C_PERIOD, C_GREEN, T_MAX)

  return (
    <div className="problem">
      <h2>応用問題B-2　信号にとまらず進める速さ</h2>
      <div className="statement">
        <p className="setup">
          Ｐさんが Ａ から Ｄ まで一定の速さで移動します。Ａ，Ｂ，Ｃ，Ｄ はこの順に一直線上にあり，Ｂ，Ｃ，Ｄ はそれぞれＡから600m，1800m，3600mはなれた位置にあります。
          ＢとＣにはそれぞれ信号があり，Ｂの信号は3分ごとに赤と青が変わり，Ｃの信号は2分ごとに赤と青が変わります。Ｐさんは，信号が赤の場合はその地点に止まらなくてはならず，
          青になるとそれまでと同じ速さで進みます。ＰさんがＡを出発したとき，Ｂ，Ｃともに信号はちょうど青に変わりました。Ｐさんの速さは分速150m以上分速450m以下です。
        </p>
        <ol className="question-list">
          <li>Ｐさんの速さが分速250mだとすると，Ｄに着くのはＡを出発してから何分何秒後ですか。</li>
          <li>Ｐさんがまったく信号で止まらずにＡからＤまで進める速さの範囲を求めなさい。</li>
        </ol>
      </div>

      <div className="readout">
        <p>速さ：分速 <b>{speed}</b> m　（赤い帯＝信号が赤の時間帯）</p>
        <p>
          Ｂ到着：{trip.tBArrive.toFixed(2)}分{trip.tBDepart > trip.tBArrive ? `（赤信号のため${trip.tBDepart.toFixed(2)}分まで待機）` : '（青信号で通過）'}
        </p>
        <p>
          Ｃ到着：{trip.tCArrive.toFixed(2)}分{trip.tCDepart > trip.tCArrive ? `（赤信号のため${trip.tCDepart.toFixed(2)}分まで待機）` : '（青信号で通過）'}
        </p>
        <p>Ｄ到着：<b>{trip.tDArrive.toFixed(2)}</b> 分後（{Math.floor(trip.tDArrive)}分{Math.round((trip.tDArrive % 1) * 60)}秒後）</p>
      </div>

      <div className="jump-row">
        {[200, 225, 250, 300, 450].map((v) => (
          <button key={v} className={`jump-btn${speed === v ? ' active' : ''}`} onClick={() => setSpeed(v)}>分速{v}m</button>
        ))}
      </div>
      <input type="range" min={150} max={450} step={5} value={speed} onChange={(e) => setSpeed(parseInt(e.target.value, 10))} style={{ width: '100%', marginTop: 8 }} />

      <div className="graph-block">
        <h3>ダイヤグラム（赤信号帯つき）</h3>
        <svg width={WIDTH} height={HEIGHT} className="value-graph">
          <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + H} stroke="#888" />
          <line x1={PAD.l} y1={PAD.t + H} x2={PAD.l + W} y2={PAD.t + H} stroke="#888" />
          {bBands.map(([t0, t1], i) => (
            <line key={`b${i}`} x1={sx(t0)} y1={sy(B_POS)} x2={sx(t1)} y2={sy(B_POS)} stroke="#e53e3e" strokeWidth="5" />
          ))}
          {cBands.map(([t0, t1], i) => (
            <line key={`c${i}`} x1={sx(t0)} y1={sy(C_POS)} x2={sx(t1)} y2={sy(C_POS)} stroke="#e53e3e" strokeWidth="5" />
          ))}
          <path d={pathD} fill="none" stroke="#3182ce" strokeWidth="2.5" />
          <text x={4} y={sy(B_POS) - 6} fontSize="10">B(600)</text>
          <text x={4} y={sy(C_POS) - 6} fontSize="10">C(1800)</text>
          <text x={4} y={sy(D_POS) + 10} fontSize="10">D(3600)</text>
          <text x={PAD.l + W} y={PAD.t + H + 16} fontSize="10" textAnchor="end">(分)</text>
        </svg>
      </div>

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) Ｂ 600÷250＝2.4(分後) ⇒ 青なので通過。Ｃ 1800÷250＝7.2(分後) ⇒ 赤なので8分まで待機。したがって，Ｄに着くのは，
          8＋(3600－1800)÷250＝15.2(分後) ⇒ <b>15分12秒後</b>
        </p>
        <p>
          (2) 赤信号にかからないように直線を引いて速さを考えると，速さは遅い順に，① 1800÷9＝200(m/分)　② 1800÷8＝225(m/分)　③ 1800÷6＝300(m/分)　④ 1800÷4＝450(m/分)
          となるので，赤信号で止まらずに通過できるのは，分速200m以上分速225m以下，または分速300mより速く分速450m以下のときです。
          したがって，ア＝<b>200</b>，イ＝<b>225</b>
        </p>
      </div>
    </div>
  )
}
