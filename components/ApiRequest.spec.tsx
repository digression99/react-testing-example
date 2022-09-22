import {rest } from 'msw'
import { setupServer } from 'msw/node'
import { faker } from '@faker-js/faker'

import { render, screen } from '@testing-library/react'
import { ApiRequest } from "./ApiRequest";
import {User} from "../types";

faker.seed(500)

const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    const fakeUser: User = {
      username: 'test username',
      email: 'test email',
      profileUrl: faker.image.people()
    }

    return res(
      ctx.json(fakeUser)
    )
  })
)

describe('<ApiRequest />', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('renders correctly', () => {
    const { container } = render(<ApiRequest />)
    expect(container).toMatchSnapshot()
  })

  test('show the user component', async () => {
    render(<ApiRequest />)
    const usernameText = await screen.findByText(/test username/i)
    expect(usernameText).toBeInTheDocument()
  })
})