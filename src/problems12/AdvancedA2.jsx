import { useState } from 'react'
import { ComboPicker } from '../components/ComboPicker'

const BOXES = [1, 2, 3, 4, 5].map((n) => ({ id: `b${n}`, label: `箱${n}` }))

export default function AdvancedA2() {
  const [caseKey, setCaseKey] = useState('3')
  const isCase3 = caseKey === '3'

  return (
    <div className="problem">
      <h2>応用問題A-2　箱とカードのマッチング</h2>
      <div className="statement">
        <p className="setup">1から5までの数字が1つずつかかれた5つの箱と，1から5までの数字が1つずつかかれた5枚のカードがあります。それぞれの箱にカードを1枚ずつ入れます。</p>
        <ol className="question-list">
          <li>入れられたカードの数字と同じ数字がかかれた箱がちょうど3つあるようなカードの入れ方は何通りありますか。</li>
          <li>入れられたカードの数字と同じ数字がかかれた箱がちょうど2つあるようなカードの入れ方は何通りありますか。</li>
        </ol>
      </div>

      <div className="jump-row">
        <button className={`jump-btn${isCase3 ? ' active' : ''}`} onClick={() => setCaseKey('3')}>(1) 一致する箱を3つ選ぶ</button>
        <button className={`jump-btn${!isCase3 ? ' active' : ''}`} onClick={() => setCaseKey('2')}>(2) 一致する箱を2つ選ぶ</button>
      </div>

      {isCase3 ? <ComboPicker key="c3" items={BOXES} pickCount={3} totalLabel="10通り" /> : <ComboPicker key="c2" items={BOXES} pickCount={2} totalLabel="10通り" />}

      <div className="explain">
        <h3>解説</h3>
        <p>
          (1) まず，1から5のうち，「同じ数字になる3つ」を選ぶ方法は，<sub>5</sub>C<sub>3</sub>＝5×4×3÷(3×2×1)＝10(通り)です。また，残った2つの箱に入るカードは，箱の数字とは異なる数字になります。
          たとえば，箱「1」「2」にカード1，2を入れる方法は「1」に2，「2」に1を入れる1通りしかありませんので，10×1＝<b>10(通り)</b>
        </p>
        <p>
          (2) 1から5のうち，「同じ数字になる2つ」を選ぶ方法は，<sub>5</sub>C<sub>2</sub>＝5×4÷(2×1)＝10(通り)です。また，残った3つの箱に入るカードは，箱の数字とは異なる数字になります。
          たとえば，箱「1」「2」「3」にカード1，2，3を入れる方法は，(2，3，1)(3，1，2)の2通りしかありません。これより，10×2＝<b>20(通り)</b>
        </p>
        <p>
          カードの数字と箱の数字がすべて異なるようなならべ方を「かく乱順列」または「完全順列」と言います。2数のかく乱順列…1通り，3数…2通り，4数…9通り，5数…44通り，6数…265通り。
        </p>
      </div>
    </div>
  )
}
