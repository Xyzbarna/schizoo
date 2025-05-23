import { 
  computed,
  nextTick,
  onBeforeMount, 
  onBeforeUpdate,
  onBeforeUnmount, 
  onMounted,
  onUpdated,
  onUnmounted,
  ref, 
  reactive, 
  watch,
} from 'vue'

// genereate css classes based on props:
// classBl = block class, 
// clssEl = element class  (optional)
// isActive = boolean
// style = string (optional)
const cssClssGen = (
  clssBl, clssEl = null, 
  isActive = false, style = null) => {
  if (clssEl) clssBl += `__${clssEl}`

  return { 
    [`${clssBl}--active`]: isActive,
    [`${clssBl}--${style}`]: style,
    [`${clssBl}--${style}-active`]: style && isActive,
  }
}



const trimObj = (obj) => {
  let trimmed = {}
  let toArr = Object.entries(obj)

  toArr.forEach(([key, val]) => {
    if (
      val !== undefined && 
      val !== null && 
      val !== '' &&
      !(Array.isArray(val) && val.length === 0)
    ) {
      if (typeof val === 'object') {
        const nested = trimObj(val)
        trimmed[key] = nested
      } else {
        trimmed[key] = val
      }
    }
  })
  return trimmed
}

const makeDivisibleBy = (number, multipleOf = 48) => {
  return (Math.ceil(number / multipleOf) * multipleOf)
}

const pixelsToBlockUnits = (number, multipleOf = 48) => {
  if (number % multipleOf === 0) return number / multipleOf
  return Math.ceil(number / multipleOf)
}

// colors to
const color = {
  main: { hex: '#66C88F', rgb: '102, 200, 143' },
  alert: { hex: '#CF1D5D', rgb: '207, 29, 93' },
  warning: { hex: '#BCA21A', rgb: '188, 162, 26' },
  firstAction: { hex: '#3177B8', rgb: '49, 119, 184' },
  darkest: { hex: '#16161D', rgb: '22, 22, 29' },
  lightest: { hex: '#FFF', rgb: '255, 255, 255' },
  schizoo: { hex: '#80D080', rgb: '128, 208, 128' }
}

const toHex = (col) => {
  switch (col) {
    case 'main': return color.main.hex
    case 'alert': return color.alert.hex
    case 'warning': return color.warning.hex
    case '1st-action': return color.firstAction.hex
    case 'darkest': return color.darkest.hex
    case 'lightest': return color.lightest.hex
    case 'schizoo': return color.schizoo.hex
    default: return color.main.hex
  }
}

const toRgb = (col) => {
  switch (col) {
    case 'main': return color.main.rgb
    case 'alert': return color.alert.rgb
    case 'warning': return color.warning.rgb
    case '1st-action': return color.firstAction.rgb
    case 'darkest': return color.darkest.rgb
    case 'lightest': return color.lightest.rgb
    case 'schizoo': return color.schizoo.rgb
    default: return color.main.rgb
  }
}

// convert px to blocks (48px), from a ref
const widthToBlocks = (ref) => {
  return Math.ceil(ref.getBoundingClientRect().width / 48)
}

// takes a ref and returns a string with the width standarized to multiples of 48px
const standarizeWidthFromRef = (ref) => {
  let remainder = 0
  let newWidth = 'auto'

  if (ref) {
    remainder = ref.offsetWidth % 48

    if (remainder) {
      newWidth = `${ref.offsetWidth + 48 - remainder}px`
    } else {
      newWidth = `${ref.offsetWidth}px`
    }
  }

  return newWidth
}

// takes a ref and returns a string with the height standarized to multiples of 48px
const standarizedHeightFromRef = (ref) => {
  let remainder = 0
  let height = 'auto'

  if (ref) {
    remainder = ref.offsetHeight % 48

    if (remainder) {
      height = `${ref.offsetHeight + 48 - remainder}px`
    } else {
      height = `${ref.offsetHeight}px`
    }
  }

  return height
}

const generateSlug = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export { 
  trimObj,
  // 2 arguments: number, multipleOf
  // returns the number rounded down to the nearest multipleOf
  pixelsToBlockUnits,
  // genereate css classes based on props:
  // classBl = block class, clssEl = element class (optional)
  cssClssGen,
  // pass 2 arguments: number, multipleOf
  makeDivisibleBy,

  toHex, 
  toRgb,
  generateSlug,
  // convert px to blocks (48px), from a ref
  widthToBlocks,
  // takes a ref and returns a string with 
  // the width standarized to multiples of 48px
  standarizeWidthFromRef,
  standarizedHeightFromRef
}