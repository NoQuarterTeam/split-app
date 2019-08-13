import { Dimensions, ScaledSize, Platform } from "react-native"

export const snakeToCamel = (value: string) =>
  value.replace(/_(\w)/g, m => m[1].toUpperCase())

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const round = (value: number, places = 2) => {
  const exp = Math.pow(10, places)
  return Math.round(value * exp) / exp
}

export const sumBy = (arr: any, key: string, abs?: boolean) => {
  return arr.reduce((acc: any, item: any) => {
    if (abs) return Math.abs(item[key]) + acc
    return acc + +item[key]
  }, 0)
}

export const sleep = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), delay)
  })
}

export const decimalCount = (value: number) => {
  let number = value
  if (number % 1 !== 0) return number.toString().split(".")[1].length
  return 0
}

const distribute = (divider: number, numerator: number, precision = 2) => {
  const arr = []
  while (divider > 0) {
    const amount =
      Math.round((numerator / divider) * Math.pow(10, precision)) /
      Math.pow(10, precision)
    arr.push(amount)
    numerator -= amount
    divider--
  }
  return arr
}

export const splitTheBill = (people: number, amount: number) =>
  distribute(people, amount)

export function isIPhoneXSize(dim: ScaledSize) {
  return dim.height == 812 || dim.width == 812
}

export function isIPhoneXrSize(dim: ScaledSize) {
  return dim.height == 896 || dim.width == 896
}

export function isIphoneX() {
  const dim = Dimensions.get("window")
  return Platform.OS === "ios" && (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
}
