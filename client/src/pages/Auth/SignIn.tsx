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
  FormHelperText, 
  Heading, 
  Image, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Stack, 
  Text,
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form'

import logo from '../../assets/logo.svg';
import { useState } from 'react';

export function SignIn() {
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const login = (data: any) => {
    // verificar se os dados de email e senha foram digitados
    // requisição para o backend
    // em caso de sucesso, ir para a rota home
    setErrorMessage('')
    fetch('http://localhost:3001/v1/sign-in', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    }).then(async (res) => {
      const json = await res.json()
      if(res.ok) {
        localStorage.setItem('token', json.token)
        navigate('/home')
      } else {
        console.log("Erro", json.message)
        setErrorMessage(json.message)
      }
    }).catch((e) => {
      console.log("Exception", e)
      setErrorMessage(e)
    })
  }
  
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.100"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        
        <Image src={logo} alt="Logo" boxSize="80px" objectFit="contain" />
        <Heading>Faça seu login na plataforma</Heading>

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

        <Box minW={{ base: '90%', md: '570px' }}>
          <form onSubmit={handleSubmit(login)}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
              borderRadius="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<AtSignIcon color="gray.200" />}
                  />

                  <Input type="email" placeholder="Digite seu email" {...register('email')} />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<LockIcon color="gray.200" />}
                  />

                  <Input type="password" placeholder="Digite sua senha" autoComplete="on" {...register('password')} />
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link to="/">Esqueceu a senha ?</Link>
                </FormHelperText>
              </FormControl>
              <Button type="submit" variant="solid" colorScheme="twitter">Entrar</Button>
            </Stack>
          </form>
        </Box>
        <Box>
          Não é um membro?
          {' '}
          <Link to="/signup">
            {' '}
            <Text color="blue.700" as="span">Inscreva-se agora</Text>
          </Link>
        </Box>

       
      </Stack>
    </Flex>
  );
}
