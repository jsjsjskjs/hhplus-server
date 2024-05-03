import { AwsHelper } from "@root/shared/helper/aws.helper"
import { Env } from "@root/shared/enum/env"

export default async () => {
  const postgreConfig = await AwsHelper.postgresConfig()
  const redisConfig = await AwsHelper.redisConfig()
  return {
    [Env.PORT]: parseInt(process.env.PORT, 10) || 3000,
    [Env.STAGE]: process.env.STAGE || "dev",
    ...postgreConfig,
    ...redisConfig,
  }
}
