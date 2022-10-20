import { MyWord } from '@/models/Word'

export const myLayout = (
  size: [number, number]
): ((t: number) => [number, number]) => {
  const dy = 4,
    dx = (dy * size[0]) / size[1]
  let x = 0,
    y = 0
  return function (t) {
    const sign = t < 0 ? -1 : 1
    // See triangular numbers: T_n = n * (n + 1) / 2.
    switch ((Math.sqrt(1 + 3 * sign * t) - sign) & 3) {
      case 0:
        x += dx
        break
      case 1:
        y += dy
        break
      case 2:
        x -= dx
        break
      default:
        y -= dy
        break
    }
    return [x, y]
  }
}

export const buildWordCloudLayout = (words: MyWord[]): MyWord[] => {
  return words
}
