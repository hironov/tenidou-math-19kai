// 数列・数表の問題で使う共通の数学関数。

export function triangular(n) {
  return (n * (n + 1)) / 2
}

export function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b)
  while (b) { [a, b] = [b, a % b] }
  return a || 1
}

export function combination(n, k) {
  if (k < 0 || k > n) return 0
  k = Math.min(k, n - k)
  let result = 1
  for (let i = 0; i < k; i++) result = (result * (n - i)) / (i + 1)
  return Math.round(result)
}

// 例題4のらせん型数表（1列目が平方数）。r=行, c=列（1始まり）
export function spiralSquareValue(r, c) {
  const k = Math.max(r, c)
  if (c === k) return (k - 1) * (k - 1) + r
  return (k - 1) * (k - 1) + k + (k - c)
}

// 応用A-3のらせん型数表（奇数段は1行目に平方数、偶数段は1列目に平方数）
export function spiralSquareAltValue(r, c) {
  const k = Math.max(r, c)
  const prev = (k - 1) * (k - 1)
  const oddRing = k % 2 === 1
  if (oddRing) {
    if (r === k) return prev + c
    return prev + k + (k - r)
  }
  if (c === k) return prev + r
  return prev + k + (k - c)
}

// 例題5の三角らせん数表（1列目が三角数）。r=行, c=列（1始まり）
export function triangleSpiralValue(r, c) {
  const g = r + c - 1
  return triangular(g - 1) + r
}

// 応用B-1のフラクション三角形（ライプニッツの調和三角形）。row=段(1始まり), pos=左から(1始まり)
export function harmonicTriangleValue(row, pos) {
  return { num: 1, den: row * combination(row - 1, pos - 1) }
}

export function reduceFraction(num, den) {
  const g = gcd(num, den)
  return { num: num / g, den: den / g }
}

// 応用A-2の三角形配置（△と▽が交互）。row段目には2row-1個の三角形が並ぶ。
// pos(1始まり、左から数えた位置)が奇数なら△、偶数なら▽。
// △はrow段目の中で(row-1)^2+1から順に、▽は△のあとに続く。
export function triangleArrangementValue(row, pos) {
  const prevMax = (row - 1) * (row - 1)
  if (pos % 2 === 1) return prevMax + (pos + 1) / 2
  return prevMax + row + pos / 2
}
export function triangleArrangementIsUp(pos) {
  return pos % 2 === 1
}
