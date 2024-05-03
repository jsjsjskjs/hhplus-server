import { STATIC_CONFIG } from "@root/shared/constant/static-config"
import { Env } from "@root/shared/enum/env"
import {
  GetParametersByPathCommand,
  GetParametersCommand,
  PutParameterCommand,
  SSMClient,
} from "@aws-sdk/client-ssm"
import { fromIni } from "@aws-sdk/credential-providers"

export class AwsHelper {
  static get config(): any {
    return {
      region: STATIC_CONFIG.AWS_DEFAULT_REGION,
      ...(STATIC_CONFIG.IS_LOCAL_ENV && {
        credentials: fromIni({ profile: STATIC_CONFIG.AWS_LOCAL_PROFILE }),
      }),
    }
  }

  static get client() {
    return new SSMClient(this.config)
  }
  static async postgresConfig() {
    const basePath = `/hhplus/${STATIC_CONFIG.STAGE}/db`
    return {
      [Env.DB_HOST]: await this.getParameter(`${basePath}/host`),
      [Env.DB_PORT]: await this.getParameter(`${basePath}/port`),
      [Env.DB_NAME]: await this.getParameter(`${basePath}/name`),
      [Env.DB_USER]: await this.getParameter(`${basePath}/user`),
      [Env.DB_PW]: await this.getParameter(`${basePath}/password`, true),
    }
  }

  static async redisConfig() {
    const basePath = `/hhplus/${STATIC_CONFIG.STAGE}/redis`
    return {
      [Env.REDIS_HOST]: await this.getParameter(`${basePath}/host`),
      [Env.REDIS_PORT]: await this.getParameter(`${basePath}/port`),
    }
  }

  static async getParameter(name: string, whitDecryption?: boolean) {
    const values = await this.getParameters([name], whitDecryption)
    return values[0]
  }

  static async getParameters(names: string[], whitDecryption?: boolean) {
    const command = new GetParametersCommand({
      Names: names,
      WithDecryption: !!whitDecryption,
    })
    const { Parameters } = await this.client.send(command)
    return names.map((name) => {
      const param = Parameters.find((param) => param.Name == name)
      return param ? param.Value : undefined
    })
  }
}
