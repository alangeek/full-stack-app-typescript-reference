import { 
    Button, 
    Container, 
    Flex, 
    Input, 
    InputGroup, 
    InputLeftElement, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Stack, 
    Text, 
    useDisclosure 
} from "@chakra-ui/react"
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AtSignIcon, InfoOutlineIcon, PhoneIcon } from "@chakra-ui/icons"

import { Header } from "../../components/Header"
import { SearchBar } from "../../components/SearchBar"
import { BoxClients } from "../../components/BoxClients"

import { Customer } from "../../models/customer.model"



export const Home = () => {
  const ModalAddClient = useDisclosure()
  const ModalLogout = useDisclosure()
  const { register, handleSubmit, setValue } = useForm()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [editCustomer, setEditCustomer] = useState<Customer | null>()
  const navigate = useNavigate()
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    fetch('http://localhost:3001/v1/users/me', { 
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      method: 'GET'
    }).then(async (res) => {
      const json = await res.json()
      if(res.ok) {
        setUser(json.user)
      } else {
        console.log('Error', json.message)
        doLogout()
      }
    }).catch(e => console.log(e))
    updateList()
  },[])

  const updateList = () => {
    fetch('http://localhost:3001/v1/customers', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      method: 'GET'
    }).then(async (res) => {
      const json = await res.json()
      if(res.ok) {
        setCustomers(json.customers)
      } else {
        console.log('Error', json.message)
      }
    }).catch(e => console.log(e))
  }
 
  const save = (data: any) => {
    ModalAddClient.onClose()
    const method = editCustomer && editCustomer.id > 0 ? 'PUT' : 'POST'
    if(method === 'PUT') {
      data.id = editCustomer?.id
    }
    fetch('http://localhost:3001/v1/customers', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      method: method,
      body: JSON.stringify(data)
    }).then(async (res) => {
      const json = await res.json()
      if(res.ok) {
        setValue('name','')
        setValue('email','')
        setValue('phone','')
        updateList()
      } else {
        console.log('Error', json.message)
      }
    }).catch(e => console.log(e))

  }

  const edit = (customer: Customer) => {
    setEditCustomer(customer)
    setValue('name', customer.name)
    setValue('email', customer.email)
    setValue('phone', customer.phone)
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
        <Text>{user?.name || '-'} ({user?.email || '-'})</Text>
        <SearchBar />
        <Flex justifyContent='flex-end'>
          <Button type='button' variant='solid' colorScheme='twitter' onClick={ModalAddClient.onOpen}>
            Adicionar novo cliente
          </Button>
        </Flex>
        
        <BoxClients customers={customers} onEditing={edit} />
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
