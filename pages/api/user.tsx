import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'
import {User} from "../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    profileUrl: faker.image.people()
  }
  res.status(200).json(user)
}
