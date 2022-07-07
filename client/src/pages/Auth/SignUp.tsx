import { 
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box, 
  Button, 
  CloseButton, 
  Flex, 
  FormControl,  
  Heading, 
  Image, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Stack, 
  Text 
} from '@chakra-ui/react'
import { AtSignIcon, LockIcon, SunIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import logo from '../../assets/logo.svg'

export function SignUp() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const signUp = (data: any) => {
    setErrorMessage('')
    if(data.name.trim().length === 0 ) {
      setErrorMessage('Informe seu nome.')
      return
    }
    if(data.email.trim().length === 0 ) {
      setErrorMessage('Informe seu email.')
      return
    }
    if(data.password) {
      if(data.password !== data.passwordConfirmed) {
        setErrorMessage('As senhas não são iguais')
        return
      }
    } else {
      setErrorMessage('Informa uma senha.')
      return
    }

    delete data['passwordConfirmed']
   
    fetch('http://localhost:3001/v1/sign-up', { 
      headers: {
        'Content-Type': 'Application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(async (res) => {
      const json = await res.json()
      if(res.ok) {
        navigate('/')
      } else {
        setErrorMessage(json.message)
      }
    }).catch(e => {
      setErrorMessage(e)
    })
  }
  
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
      <Heading>Faça seu Cadastro</Heading>

      {errorMessage.length > 0 ? ( 
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle mr={2}>Erro: </AlertTitle>
            <AlertDescription>
              {errorMessage}
            </AlertDescription>
            <CloseButton 
              position='absolute' 
              right='8px' 
              top='8px'
              onClick={() => setErrorMessage('')}
            />
          </Alert> 
        ): null}

      <Box minW={{base: '90%', md: '570px'}}>
        <form onSubmit={handleSubmit(signUp)}>
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
                  children={<SunIcon color='gray.200' />} />

                  <Input type='text' placeholder='Digite seu nome' {...register('name')} />
              </InputGroup>
            </FormControl>
            
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<AtSignIcon color='gray.200' />} />

                  <Input type='email' placeholder='Digite seu email' {...register('email')}  />
              </InputGroup>
            </FormControl>
           
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LockIcon color='gray.200' />} />

                  <Input type='password' placeholder='Digite sua senha' autoComplete="on"  {...register('password')} />
              </InputGroup>
            </FormControl>
            
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<LockIcon color='gray.200' />} />

                  <Input type='password' placeholder='Confirmar senha'  autoComplete="on"  {...register('passwordConfirmed')}/>
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
