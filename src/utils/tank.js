// 水そう問題共通のロジック：断面積が高さによって変わる容器に、一定の割合で水を入れたときの
// 「深さ(t)」を計算する。

// segments: 底から順に [{ height, area }, ...]（height=その区間の高さ, area=その区間の断面積）
// rate: 毎分（毎秒）あたりに入れる水の体積
// 戻り値: depthAt(t), totalTime, breakpoints:[{t, depth}]（区間の境目）
export function computeProfileDepth(segments, rate) {
  const breakpoints = [{ t: 0, depth: 0 }]
  let t = 0
  let depth = 0
  const ranges = []
  for (const seg of segments) {
    const dt = (seg.area * seg.height) / rate
    ranges.push({ t0: t, t1: t + dt, depth0: depth, depth1: depth + seg.height, rate: rate / seg.area })
    t += dt
    depth += seg.height
    breakpoints.push({ t, depth })
  }
  function depthAt(tt) {
    if (tt <= 0) return 0
    for (const r of ranges) {
      if (tt <= r.t1 || r === ranges[ranges.length - 1]) {
        return Math.min(depth, r.depth0 + r.rate * Math.max(0, tt - r.t0))
      }
    }
    return depth
  }
  return { depthAt, totalTime: t, breakpoints }
}

// 仕切りで区切られた複数の部屋を持つ容器。手前（Aに近い側）から順に水がたまり、
// 仕切りの高さを超えるとあふれて次の部屋に流れ込む。「Aの部分の水面の高さ」を計算する。
// widths: 各部屋の（正面から見た）幅の配列
// dividerHeights: 部屋の間の仕切りの高さ（widths.length - 1 個）
// totalHeight: 容器全体の高さ
// rate: 毎分（毎秒）あたりに入れる水の体積
// depthDim: 奥行き（前後の長さ）
export function computePartitionedDepth({ widths, dividerHeights, totalHeight, rate, depthDim }) {
  const breakpoints = [{ t: 0, depth: 0 }]
  // ranges: { t0, t1, depth0, depth1, rate, kind: 'rise' | 'plateau', mergedCount, fillingIndex }
  const ranges = []
  let t = 0
  let mergedWidth = widths[0]
  let depth = 0
  let mergedCount = 1

  for (let i = 0; i < dividerHeights.length; i++) {
    const wallH = dividerHeights[i]
    // 1) 合流済みの部屋が、次の仕切りの高さまで一緒に上昇
    const riseArea = mergedWidth * depthDim
    const riseDt = ((wallH - depth) * riseArea) / rate
    ranges.push({ t0: t, t1: t + riseDt, depth0: depth, depth1: wallH, rate: rate / riseArea, kind: 'rise', mergedCount })
    t += riseDt
    depth = wallH
    breakpoints.push({ t, depth })

    // 2) 次の部屋が仕切りの高さまで単独でたまる間、手前の水面はここで足踏み
    const nextArea = widths[i + 1] * depthDim
    const plateauDt = (wallH * nextArea) / rate
    ranges.push({ t0: t, t1: t + plateauDt, depth0: depth, depth1: depth, rate: rate / nextArea, kind: 'plateau', mergedCount, fillingIndex: i + 1, fillingWallH: wallH })
    t += plateauDt
    breakpoints.push({ t, depth })

    mergedWidth += widths[i + 1]
    mergedCount += 1
  }

  // 最後に、合流したすべての部屋がいっぱいになるまで一緒に上昇
  const finalArea = mergedWidth * depthDim
  const finalDt = ((totalHeight - depth) * finalArea) / rate
  ranges.push({ t0: t, t1: t + finalDt, depth0: depth, depth1: totalHeight, rate: rate / finalArea, kind: 'rise', mergedCount })
  t += finalDt
  depth = totalHeight
  breakpoints.push({ t, depth })

  function findRange(tt) {
    for (const r of ranges) {
      if (tt <= r.t1 || r === ranges[ranges.length - 1]) return r
    }
    return ranges[ranges.length - 1]
  }

  function depthAt(tt) {
    if (tt <= 0) return 0
    const r = findRange(tt)
    if (r.kind === 'plateau') return r.depth0
    return Math.min(totalHeight, r.depth0 + r.rate * Math.max(0, tt - r.t0))
  }

  // 各部屋（区画）の現在の水面の高さを配列で返す（未到達の部屋は0）
  function levelsAt(tt) {
    if (tt <= 0) return widths.map(() => 0)
    const r = findRange(tt)
    const shared = r.kind === 'plateau' ? r.depth0 : Math.min(totalHeight, r.depth0 + r.rate * Math.max(0, tt - r.t0))
    const levels = widths.map((_, i) => (i < r.mergedCount ? shared : 0))
    if (r.kind === 'plateau') {
      const localLevel = r.rate * Math.max(0, tt - r.t0)
      levels[r.fillingIndex] = Math.min(r.fillingWallH, localLevel)
    }
    return levels
  }

  return { depthAt, levelsAt, totalTime: t, breakpoints }
}
