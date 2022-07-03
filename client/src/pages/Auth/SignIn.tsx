import {
  Box, Button, Flex, FormControl, FormHelperText, Heading, Image, Input, InputGroup, InputLeftElement, Stack, Text,
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form'

import logo from '../../assets/logo.svg';

export function SignIn() {
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()

  const login = () => {
    // verificar se os dados de email e senha foram digitados
    // requisição para o backend
    // em caso de sucesso, ir para a rota home
    localStorage.setItem('token', 'token')
    navigate('/home')
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
        <Heading>Login</Heading>

        <Box minW={{ base: '90%', md: '470px' }}>
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
