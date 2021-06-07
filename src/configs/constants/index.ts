import development, { EevRecord } from './development'
import staging from './staging'
import production from './production'

export type Envs = {
  DEVELOPMENT: boolean
  STAGING: boolean
  PRODUCTION: boolean
}

const getCurrentEnv = (): Envs => {
  const env = process.env?.ENV
  const up = `${env}`.toUpperCase()
  const currentEnvs: Envs = {
    DEVELOPMENT: false,
    STAGING: false,
    PRODUCTION: false,
  }
  if (up === 'PRODUCTION')
    return {
      ...currentEnvs,
      PRODUCTION: true,
    }
  if (up === 'STAGING')
    return {
      ...currentEnvs,
      STAGING: true,
    }
  return {
    ...currentEnvs,
    DEVELOPMENT: true,
  }
}

export type CurrentConstants = EevRecord

const getCurrentConstants = (envs: Envs): EevRecord => {
  let constants = development
  if (envs.PRODUCTION) {
    Object.keys(development).forEach(key => {
      if (typeof production[key] !== 'undefined') {
        constants[key] = production[key]
      }
    })
    return constants
  }
  if (envs.STAGING) {
    Object.keys(development).forEach(key => {
      if (typeof staging[key] !== 'undefined') {
        constants[key] = staging[key]
      }
    })
    return constants
  }
  return development
}

export const CURRENT_ENV = getCurrentEnv()
const CONSTANTS = getCurrentConstants(CURRENT_ENV)
export default CONSTANTS
