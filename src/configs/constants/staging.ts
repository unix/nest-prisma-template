import { AppConfigType } from './development'
import { registerAs } from '@nestjs/config'
import { APP_ENVS } from '@/configs/constants/envs'

export default registerAs<AppConfigType>(APP_ENVS.STAGING, () => ({}))
