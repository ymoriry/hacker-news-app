'use client'

import { Box, Button, CircularProgress, Link, List, ListItem, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { useEffect, useState } from 'react'
import { Opacity } from '@mui/icons-material';

type NewsItem = {
  id: number;
  title: string;
  url: string;
  time: number; // UNIXタイムスタンプ
  [key: string]: any;
};

const ArticleList = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [activeGenre, setActiveGenre] = useState<string>('top');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const buttonStyles = (genre: string) => ({
    width: '33%',
    paddingTop: activeGenre === genre ? '15px' : '12px',
    paddingBottom: activeGenre === genre ? '15px' : '12px',
    marginTop: activeGenre === genre ? '9px' : '15px',

    color: 'white',
    transition: '.2s',
    opacity: activeGenre === genre ? '0.9' : '0.6' 
  });

  const formatDate = (timestamp: number): string => {
    const date = new Date( timestamp * 1000 );
    return date.toLocaleDateString();
  }

  useEffect(() => {
    const fetchNews = async (): Promise<void> => {
      setIsLoading(true);
      try {
        // ニュースのIDを配列で取得（500件）
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/${activeGenre}stories.json`);
        const newsIDs = await res.json();
  
        // ニュースIDをもとに、詳細を取得するPromiseを配列で定義
        const newsDetailPromises: Promise<NewsItem>[] = newsIDs.slice(0, 10).map( async (id: number): Promise<NewsItem> => {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return await res.json();
        });
  
        // Promiseを並列処理
        const results = await Promise.allSettled(newsDetailPromises);
  
        // 詳細取得が成功したニュースを絞り込み、詳細を含むオブジェクトの配列を定義
        const newsResults = results
        .filter((result): result is PromiseFulfilledResult<NewsItem> => result.status === 'fulfilled')
        .map((result) => {
          const newsItem = result.value;
          return {
            ...newsItem,
            formattedTime: formatDate(newsItem.time)
          };
        });

        console.log(newsResults);
        
  
        setNewsList(newsResults);

      } catch (error) {
        console.log(error);   
      };
      setIsLoading(false);
    };
    fetchNews();
  }, [activeGenre]);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: '30px',
        color: 'gray',
        width: '90%',
        marginX: 'auto',
        bgcolor: '#fff',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          width: '100%',
        }}
      >
        <Button
          className='text-xl'
          onClick={() => setActiveGenre('top')}
          sx={{
            ...buttonStyles('top'),
            bgcolor: '#fd4749',
            '&:hover': {
              bgcolor: '#fd4749',
            }
          }}
        >
          TOP
        </Button>
        <Button
          className='text-xl'
          onClick={() => setActiveGenre('new')}
          sx={{
            ...buttonStyles('new'),
            bgcolor: '#fb9201',
            '&:hover': {
              bgcolor: '#fb9201',
            }
          }}
        >
          NEW
        </Button>
        <Button
          className='text-xl'
          onClick={() => setActiveGenre('best')}
          sx={{
            ...buttonStyles('best'),
            bgcolor: '#03cc8b',
            '&:hover': {
              bgcolor: '#03cc8b',
            }
          }}
        >
          BEST
        </Button>

      </Box>

      { isLoading ? (
        <CircularProgress
          color="inherit"
          sx={{
            marginTop: '50px'
          }}
        />
      ) : (
        <List
          component='nav'
          sx={{
            justifyContent: 'center',
            width: '100%',
            marginTop: '20px'
          }}
        >
          {newsList.map((newsItem) => (
            <ListItem
              key={newsItem.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                fontSize: '24px',
                ':not(:last-child)': {
                  borderBottom: '1px solid #ddd',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '24px'
                }}
              >
                {newsItem.formattedTime}
              </Typography>
              <Link
                href={newsItem.url}
                sx={{
                  textDecoration: 'none',
                  color: 'gray',
                  width: '100%',
                  height: '100%',
                  paddingY: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                }}
              >
                {newsItem.title}
                <ArrowForwardIcon
                  sx={{
                    color: '#30a0e9'
                  }}
                />
              </Link>
            </ListItem>
          ))}
        </List>
      ) }
    </Box>
  )
}

export default ArticleList