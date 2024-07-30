import { Box, Button, Link, List, ListItem } from '@mui/material'
import React from 'react'

const ArticleList = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: '30px',
        color: 'gray',
        width: '70%',
        marginX: 'auto',
        bgcolor: '#fff',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Button
          className='py-3 text-xl'
          sx={{
            width: 1/3,
            bgcolor: '#fd4749',
            color: 'white',
            transition: '.5s',
            '&:hover': {
              bgcolor: '#fd4749',
              opacity: '0.8'
            }
          }}
        >
          トップ
        </Button>
        <Button
          className='py-3 text-xl'
          sx={{
            width: 1/3,
            bgcolor: '#fb9201',
            color: 'white',
            transition: '.5s',
            '&:hover': {
              bgcolor: '#fb9201',
              opacity: '0.8'
            }
          }}
        >
          新着
        </Button>
        <Button
          className='py-3 text-xl'
          sx={{
            width: 1/3,
            bgcolor: '#03cc8b',
            color: 'white',
            transition: '.5s',
            '&:hover': {
              bgcolor: '#03cc8b',
              opacity: '0.8'
            }
          }}
        >
          ベスト
        </Button>
      </Box>

      <List
        component='nav'
        sx={{
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <ListItem
          sx={{
            ':not(:last-child)': {
              borderBottom: '1px solid gray',
            },
          }}
        >
          <Link
            href='https://arstechnica.com/gadgets/2017/11/microsoft-and-github-team-up-to-take-git-virtual-file-system-to-macos-linux'
            sx={{
              textDecoration: 'none',
              color: 'gray',
              width: '100%',
              height: '100%',
              paddingY: '20px',
            }}
          >
            Microsoft and GitHub team up to take Git virtual file system to macOS, Linux
          </Link>
        </ListItem>
      </List>
    </Box>
  )
}

export default ArticleList