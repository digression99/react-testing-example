import {useEffect, useState} from "react";
import {User} from "../types";
import {Box} from "@chakra-ui/react";
import Image from "next/image";

export const ApiRequest = () => {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    fetch('/api/user')
      .then(res => res.json())
      .then(user => {
        setUser(user)
        setLoading(false)
      })
  }, [])

  return (
    <Box>
      {loading && (<Box>Loading...</Box>)}
      {user && (
        <Box>
          username: {user.username}
          email: {user.email}
          profilePicture: <Image src={user.profileUrl} alt={'profile-pic'} width={100} height={100} />
        </Box>
      )}
    </Box>
  )
}
