import { Alert, AlertIcon, Avatar, Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { Client } from '../pages/Dashboard/Home'

interface BoxClientsProps {
  clients: Client[]
  onEditing: (client: Client) => void
}

export const BoxClients = (props: BoxClientsProps) => {

  return (
    <Box backgroundColor='whiteAlpha.900' boxShadow='md' borderRadius='md' p='1rem'>
      {props.clients.length > 0 ?  <Table>
        <Thead>
          <Tr>
            <Th>Avatar</Th>
            <Th width='90%'>Nome</Th>
            <Th textAlign='end'>Ação</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.clients.map((item, index) => (
            <Tr key={index}>
              <Td><Avatar bg='green'/></Td>
              <Td>{item.name}</Td>
              <Td textAlign='end'>
                <Button type='button' variant='outline' colorScheme='twitter' onClick={() => props.onEditing(item)}>Editar</Button>
              </Td>
            </Tr>

          ))}
        </Tbody>
      </Table> : <Alert status='info'><AlertIcon />Não existem itens para exibir</Alert>
      }
    </Box>
  )
}
