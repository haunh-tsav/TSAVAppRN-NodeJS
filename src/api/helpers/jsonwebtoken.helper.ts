import appConfig from '@/config/app.config'
import 'dotenv/config'
import jwt, { JwtPayload, VerifyCallback, VerifyOptions } from 'jsonwebtoken'

type SecretType = 'accessToken' | 'refreshToken'

export type ExpiresType = 'minutes' | 'hour' | 'day' | 'year'

export interface JwtConfig {
  secret: string
  expiresIn: number
  expiresType: ExpiresType
}

export const jwtConfig: { accessToken: JwtConfig; refreshToken: JwtConfig } = {
  accessToken: {
    secret: appConfig.security.jwt_secret,
    expiresIn: 1,
    expiresType: 'minutes'
  },
  refreshToken: {
    secret: appConfig.security.jwt_secret,
    expiresIn: 2,
    expiresType: 'minutes'
  }
}

const getExpiresIn = (jwtConfig: JwtConfig): string => {
  const expiresIn = jwtConfig.expiresIn
  switch (jwtConfig.expiresType) {
    case 'day':
      return `${expiresIn}d`
    case 'minutes':
      return `${expiresIn}m`
    case 'hour':
      return `${expiresIn}h`
    default:
      return `${expiresIn}y`
  }
}

export const generateToken = (payload: string | object | Buffer, secretType: SecretType): string => {
  // const token = jwt.sign(
  //   payload,
  //   secretType === 'access_token' ? jwtConfig.accessToken.secret : jwtConfig.refreshToken.secret,
  //   {
  //     expiresIn:
  //       secretType === 'access_token' ? getExpiresIn(jwtConfig.accessToken) : getExpiresIn(jwtConfig.refreshToken),
  //     algorithm: 'HS512'
  //   }
  // )
  const token = jwt.sign(
    payload,
    secretType === 'accessToken' ? jwtConfig.accessToken.secret : jwtConfig.refreshToken.secret
  )
  return token
}

/**
 *
 * Verify token (accessToken + refreshToken)
 * @param token string
 * @param secretType SecretType
 * @param callback VerifyCallback<JwtPayload | string> (optional)
 */
export const verifyToken = (token: string, secretType: SecretType, callback?: VerifyCallback<JwtPayload | string>) => {
  jwt.verify(
    token,
    secretType === 'accessToken' ? jwtConfig.accessToken.secret : jwtConfig.refreshToken.secret,
    callback
  )
}

export const decodeToken = (token: string): null | JwtPayload | string => {
  return jwt.decode(token)
}
