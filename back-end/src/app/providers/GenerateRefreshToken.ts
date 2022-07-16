import dayjs from "dayjs"
import RefreshToken from "../Schemas/RefreshTokenSchema"


class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(3600, "second").unix()

    const generateRefreshToken = await RefreshToken.create({
      userId,
      expiresIn
    })

    return generateRefreshToken
  }
}

export { GenerateRefreshToken}