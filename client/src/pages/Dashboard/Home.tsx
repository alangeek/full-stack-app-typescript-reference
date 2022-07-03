import { Button, Container, Flex, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { useForm } from 'react-hook-form'

import { Header } from "../../components/Header"
import { SearchBar } from "../../components/SearchBar"
import { BoxClients } from "../../components/BoxClients"
import { AtSignIcon, InfoOutlineIcon, PhoneIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

let ids = 1

export type Client = {
  id: number;
  name: string
  email: string
  phone: string
}

export const Home = () => {
  const ModalAddClient = useDisclosure()
  const ModalLogout = useDisclosure()
  const { register, handleSubmit, setValue } = useForm()
  const [clients, setClients] = useState<Client[]>([])
  const [editClients, setEditClients] = useState<Client | null>()
  const navigate = useNavigate()
 
  const save = (data: any) => {
    ModalAddClient.onClose()
    let clientsCopy = [...clients]
    if (editClients) {
      clientsCopy = clientsCopy.filter(client => client.id !== editClients.id)
      data.id = editClients.id
    } else {
      data.id = ids
      ids++
    }
    console.log(data)
    clientsCopy.push(data)
    clientsCopy.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    setClients(clientsCopy)
    setValue('name','')
    setValue('email','')
    setValue('phone','')
  }

  const edit = (client: Client) => {
    setEditClients(client)
    setValue('name', client.name)
    setValue('email', client.email)
    setValue('phone', client.phone)
    ModalAddClient.onOpen()
  }

  const logout =  () => {
    ModalLogout.onOpen()
  }

  const doLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  
  return (
    <Flex
      flexDirection='column'
      width='100wv'
      height='100vh'
      backgroundColor='gray.200'
    >
      <Header  onLogout={logout}/>
     <Container maxW='container.lg'>
      <Stack mt={4}>
        
        <SearchBar />
        <Flex justifyContent='flex-end'>
          <Button type='button' variant='solid' colorScheme='twitter' onClick={ModalAddClient.onOpen}>
            Adicionar novo cliente
          </Button>
        </Flex>
        
        <BoxClients clients={clients} onEditing={edit} />
      </Stack> 
     </Container> 

     <Modal  isOpen={ModalAddClient.isOpen} onClose={ModalAddClient.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro</ModalHeader>
          <form onSubmit={handleSubmit(save)}>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={5}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<InfoOutlineIcon color='gray.200' />} />

                    <Input type='text' placeholder='Nome completo' {...register("name")} />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AtSignIcon color='gray.200' />} />

                    <Input type='email' placeholder='Endereço de email' {...register("email")} />
                </InputGroup>
                
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<PhoneIcon color='gray.200' />} />

                    <Input type='text' placeholder='Telefone de contato' {...register("phone")} />
                </InputGroup>

              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={ModalAddClient.onClose}>
                Cancelar
              </Button>
              <Button colorScheme='twitter' type='submit'>
                Salvar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
     </Modal>


     {/* MODAL LOGOUT */}
     <Modal  isOpen={ModalLogout.isOpen} onClose={ModalLogout.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tem certeza?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Você tem certeza que deseja sair?</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={ModalLogout.onClose}>
                Cancelar
              </Button>
              <Button colorScheme='twitter' type='button' onClick={doLogout}>
                Sair
              </Button>
            </ModalFooter>
        </ModalContent>
     </Modal>
    </Flex>
  )
}
