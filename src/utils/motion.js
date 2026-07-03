// 図形の辺上を動く点の位置や面積を計算するための共通ロジック。

export function distanceBetween(p1, p2) {
  return Math.hypot(p2.x - p1.x, p2.y - p1.y)
}

// vertices で表される折れ線（辺のリスト）上を、出発点から dist だけ進んだ点を返す。
// loop=true の場合、道のりを一周（往復）した後は先頭に戻って繰り返す。
// vertices に往復の道（例: [A, D, A]）を渡せば、そのまま往復運動になる。
export function pointAtDistance(vertices, dist, loop) {
  const segLens = []
  let total = 0
  for (let i = 0; i < vertices.length - 1; i++) {
    const len = distanceBetween(vertices[i], vertices[i + 1])
    segLens.push(len)
    total += len
  }
  if (total === 0) return { ...vertices[0] }

  let d = dist
  if (loop) {
    d = ((dist % total) + total) % total
  } else {
    d = Math.max(0, Math.min(dist, total))
  }

  let acc = 0
  for (let i = 0; i < segLens.length; i++) {
    const segLen = segLens[i]
    if (d <= acc + segLen || i === segLens.length - 1) {
      const local = segLen === 0 ? 0 : Math.max(0, Math.min(1, (d - acc) / segLen))
      const p1 = vertices[i]
      const p2 = vertices[i + 1]
      return {
        x: p1.x + (p2.x - p1.x) * local,
        y: p1.y + (p2.y - p1.y) * local,
      }
    }
    acc += segLen
  }
  return { ...vertices[vertices.length - 1] }
}

// シューレースの公式による多角形の面積（点の並び順は問わない）。
export function polygonArea(points) {
  let sum = 0
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i]
    const p2 = points[(i + 1) % points.length]
    sum += p1.x * p2.y - p2.x * p1.y
  }
  return Math.abs(sum) / 2
}

// pointAtDistance と同じだが、今どの辺（vertices[i]〜vertices[i+1]）の上にいるかも返す。
export function pointAtDistanceOnSegment(vertices, dist, loop) {
  const segLens = []
  let total = 0
  for (let i = 0; i < vertices.length - 1; i++) {
    const len = distanceBetween(vertices[i], vertices[i + 1])
    segLens.push(len)
    total += len
  }
  if (total === 0) return { x: vertices[0].x, y: vertices[0].y, segment: 0 }

  let d = dist
  if (loop) {
    d = ((dist % total) + total) % total
  } else {
    d = Math.max(0, Math.min(dist, total))
  }

  let acc = 0
  for (let i = 0; i < segLens.length; i++) {
    const segLen = segLens[i]
    if (d <= acc + segLen || i === segLens.length - 1) {
      const local = segLen === 0 ? 0 : Math.max(0, Math.min(1, (d - acc) / segLen))
      const p1 = vertices[i]
      const p2 = vertices[i + 1]
      return {
        x: p1.x + (p2.x - p1.x) * local,
        y: p1.y + (p2.y - p1.y) * local,
        segment: i,
      }
    }
    acc += segLen
  }
  const last = vertices[vertices.length - 1]
  return { x: last.x, y: last.y, segment: segLens.length - 1 }
}

// 多角形（頂点ループ corners、辺の数=corners.length）を、境界上の2点 p（辺pSeg上）と
// q（辺qSeg上）を結ぶ直線で2つに分けたとき、p→(間の頂点)→qとたどる側の多角形を返す。
// もう一方の面積は「全体の面積 - この面積」で求められる。
export function boundaryPolygon(corners, pSeg, pPoint, qSeg, qPoint) {
  const n = corners.length
  const poly = [pPoint]
  let i = pSeg
  let guard = 0
  while (i !== qSeg && guard <= n) {
    i = (i + 1) % n
    poly.push(corners[i])
    guard++
  }
  poly.push(qPoint)
  return poly
}

// 度数法の角度（数学の慣習：0度=+x方向、反時計回りが正）から円周上の点を求める。
export function pointOnCircle(center, radius, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: center.x + radius * Math.cos(rad), y: center.y + radius * Math.sin(rad) }
}

// 3点 A,B,C から角B（頂点Bにおける角ABC）の大きさを度数法で返す。
export function angleAt(vertex, p1, p2) {
  const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y }
  const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y }
  const dot = v1.x * v2.x + v1.y * v2.y
  const mag = Math.hypot(v1.x, v1.y) * Math.hypot(v2.x, v2.y)
  if (mag === 0) return 0
  const cos = Math.max(-1, Math.min(1, dot / mag))
  return (Math.acos(cos) * 180) / Math.PI
}
