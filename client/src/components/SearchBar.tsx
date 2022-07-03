import { SearchIcon } from "@chakra-ui/icons"
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"

export const SearchBar = () => {
  return (
    <Box
        backgroundColor='whiteAlpha.900'
        boxShadow='md'
        borderRadius='md'
        p='1rem'
      >
      <InputGroup>
        <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />}/>
        <Input type='text' placeholder='Pesquisar...' />
      </InputGroup>
    </Box>
  )
}
