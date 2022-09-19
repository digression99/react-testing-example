import { Box } from '@chakra-ui/react'
import {PropsWithChildren} from "react";
import {Navigation} from "../Navigation";

type Props = PropsWithChildren

export const PageLayout = ({ children }: Props) => {
  return (
    <Box>
      <Navigation />
      {children}
    </Box>
  )
}