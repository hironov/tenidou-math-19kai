import { useState } from 'react'
import { triangular } from '../utils/sequence'
import { NControl } from '../components/NControl'
import { SequenceStrip } from '../components/SequenceStrip'

export default function Basic1() {
  // (1) 2,6,10,14,... 等差数列(差4)
  const [n1, setN1] = useState(25)
  const v1 = 2 + 4 * (n1 - 1)
  const sum1 = ((2 + v1) * n1) / 2

  // (2) 3,4,6,9,13,18,... 階差数列
  const [n2, setN2] = useState(20)
  const v2 = 3 + triangular(n2 - 1)

  // (3) 1,3,5,7,... 奇数
  const [n3, setN3] = useState(20)
  const v3 = 2 * n3 - 1
  const sum3 = n3 * n3

  // (4) 1,2,3|2,3,4|3,4,5|... 3個ずつの組
  const [g4, setG4] = useState(8)
  const group4 = [g4, g4 + 1, g4 + 2]

  // (5) 分数の並び 1/1,1/2,2/2,1/3,2/3,3/3,...
  const [n5, setN5] = useState(33)
  function fractionAt(n) {
    let group = 1
    let remain = n
    while (remain > group) { remain -= group; group++ }
    return { num: remain, den: group }
  }
  const f5 = fractionAt(n5)

  return (
    <div className="problem">
      <h2>基本問題1</h2>
      <p className="statement">次の問いに答えなさい。</p>

      <h3>(1) 等差数列</h3>
      <div className="statement">
        <p className="setup" style={{ fontWeight: 'bold' }}>2，6，10，14，18，22，……</p>
        <ol className="question-list">
          <li>左から25番目の数はいくつですか。</li>
          <li>左から順に25番目の数まで加えると，その和はいくつになりますか。</li>
        </ol>
      </div>
      <SequenceStrip values={Array.from({ length: 10 }, (_, i) => 2 + 4 * i)} highlightIndex={n1 <= 10 ? n1 - 1 : -1} />
      <NControl n={n1} setN={setN1} min={1} max={40} label={`番目：${v1}（25番目までの和：${sum1}）`} jumps={[{ label: '25番目', n: 25 }]} />
      <div className="explain">
        <p>① 4ずつ増える等差数列です。2＋4×(25－1)＝<b>98</b>。② (2＋98)×25÷2＝<b>1250</b>。</p>
      </div>

      <h3>(2) 階差数列</h3>
      <div className="statement">
        <p className="setup" style={{ fontWeight: 'bold' }}>3，4，6，9，13，18，……</p>
        <ol className="question-list"><li>左から20番目の数はいくつですか。</li></ol>
      </div>
      <SequenceStrip values={Array.from({ length: 10 }, (_, i) => 3 + triangular(i))} highlightIndex={n2 <= 10 ? n2 - 1 : -1} showDiff />
      <NControl n={n2} setN={setN2} min={1} max={30} label={`番目：${v2}`} jumps={[{ label: '20番目', n: 20 }]} />
      <div className="explain">
        <p>差が1，2，3，……と増える階差数列です。20番目までに間は19個あるので，3＋(1＋19)×19÷2＝<b>193</b>。</p>
      </div>

      <h3>(3) 奇数の列</h3>
      <div className="statement">
        <p className="setup" style={{ fontWeight: 'bold' }}>1，3，5，7，9，11，……</p>
        <ol className="question-list">
          <li>左から順に20番目の数まで加えると，その和はいくつになりますか。</li>
          <li>左から順に何番目の数まで加えると，その和が1600になりますか。</li>
        </ol>
      </div>
      <SequenceStrip values={Array.from({ length: 10 }, (_, i) => 2 * (i + 1) - 1)} highlightIndex={n3 <= 10 ? n3 - 1 : -1} />
      <NControl n={n3} setN={setN3} min={1} max={45} label={`番目：${v3}（和：${sum3}）`}
        jumps={[{ label: '① 20番目', n: 20 }, { label: '② 和が1600 → 40番目', n: 40 }]} />
      <div className="explain">
        <p>① 20番目の数は1＋2×19＝39なので，(1＋39)×20÷2＝<b>400</b>。② 和は1，4，9，16，……と平方数になります。1600＝40×40より，<b>40番目</b>まで。</p>
      </div>

      <h3>(4) 3個ずつの組</h3>
      <div className="statement">
        <p className="setup" style={{ fontWeight: 'bold' }}>1，2，3｜2，3，4｜3，4，5｜4，5，6……　（1組　2組　3組　4組）</p>
        <ol className="question-list">
          <li>8組の真ん中の数はいくつですか。</li>
          <li>15がはじめてあらわれるのは，左から何番目ですか。</li>
        </ol>
      </div>
      <NControl n={g4} setN={setG4} min={1} max={16} label={`${g4}組：${group4.join('，')}`} jumps={[{ label: '8組', n: 8 }]} />
      <div className="explain">
        <p>① 各組の先頭の数は組の数と同じです。8組は8，9，10なので，真ん中は<b>9</b>。② 15がはじめてあらわれるのは13組の最後尾（13，14，15）なので，3×13＝<b>39(番目)</b>。</p>
      </div>

      <h3>(5) 分数の並び</h3>
      <div className="statement">
        <p className="setup" style={{ fontWeight: 'bold' }}>1/1，1/2，2/2，1/3，2/3，3/3，1/4，2/4，3/4，4/4，1/5，2/5，……</p>
        <ol className="question-list">
          <li>3/6は左から何番目にありますか。</li>
          <li>左から33番目の分数を求めなさい。</li>
        </ol>
      </div>
      <NControl n={n5} setN={setN5} min={1} max={60} label={`${n5}番目：${f5.num}/${f5.den}`}
        jumps={[{ label: '① 3/6 → 18番目', n: 18 }, { label: '② 33番目', n: 33 }]} />
      <div className="explain">
        <p>① 3/6は6組の3番目です。1＋2＋3＋4＋5＋3＝<b>18(番目)</b>。② 33＝1＋2＋…＋7＋5より，8組の5番目なので，<b>5/8</b>。</p>
      </div>
    </div>
  )
}
