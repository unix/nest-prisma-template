import { registerAs } from '@nestjs/config'
import { AppConfigType } from './development'
import { APP_ENVS } from './envs'

export default registerAs<AppConfigType>(APP_ENVS.PRODUCTION, () => ({}))
