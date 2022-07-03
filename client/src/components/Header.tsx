import { Button, Container, Flex, Image, Stack, Text } from '@chakra-ui/react'

import logo from '../assets/logo.svg'

interface HeaderProps {
  onLogout: () => void
}

export const Header = (props: HeaderProps) => {
  return (
    <Flex backgroundColor='whiteAlpha.900' boxShadow='md'>
      <Container maxW='container.lg'>
        <Stack flexDir='row' alignItems='center' mt={2} mb={2}>
          <Image src={logo} alt='Logo' boxSize='40px' objectFit='contain' marginRight={2} />
            <Text fontSize='xl' fontWeight='500'>Area de Cadastro</Text>
          <Stack style={{marginLeft: 'auto'}}>
            <Button variant='link' onClick={() => props.onLogout()}>Sair</Button>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  )
}
