import { Box } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <header>
      <Box
        className='h-24'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '30px',
          color: 'gray',
          width: '100%',
          bgcolor: '#fff',
          height: '100px',
          position: 'fixed',
          top: '0',
          zIndex: '1'
        }}
      >
        News Site
      </Box>
    </header>
  )
}

export default Header