import { Box, Button, Flex, FormControl,  Heading, Image, Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react'
import { AtSignIcon, LockIcon } from '@chakra-ui/icons'

import { Link } from "react-router-dom"
import logo from '../../assets/logo.svg'

export function SignUp() {
  return (
    <Flex
    flexDirection='column'
    width='100wh'
    height='100vh'
    backgroundColor='gray.100'
    justifyContent='center'
    alignItems='center'
  >
    <Stack 
      flexDir='column'
      mb='2'
      justifyContent='center'
      alignItems='center'
    >
      <Image src={logo} alt='Logo' boxSize='80px' objectFit='contain' />
      <Heading>Cadastre-se</Heading>

      <Box minW={{base: '90%', md: '470px'}}>
        <form>
          <Stack 
            spacing={4}
            p='1rem'
            backgroundColor='whiteAlpha.900'
            boxShadow='md'
            borderRadius='md'
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<AtSignIcon color='gray.200' />} />

                  <Input type='email' placeholder='Digite seu email'  />
              </InputGroup>
            </FormControl>
           
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LockIcon color='gray.200' />} />

                  <Input type='password' placeholder='Digite sua senha' autoComplete="on" />
              </InputGroup>
            </FormControl>
            
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LockIcon color='gray.200' />} />

                  <Input type='password' placeholder='Confirmar senha'  autoComplete="on"/>
              </InputGroup>
            </FormControl>

            <Button type='submit' variant='solid' colorScheme='twitter'>Criar uma conta</Button>
         
          </Stack>
        </form>
      </Box>
      <Box>
      já é um membro? <Link to='/'> <Text color='blue.700' as="span">Entrar</Text></Link>
        </Box>
    </Stack>
  </Flex>
  )
}
