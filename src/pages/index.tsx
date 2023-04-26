import Head from 'next/head';
import React, { FC, useState } from 'react';

import { Container, Typography } from '@mui/material';

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Alfie challenge - Task Manager</title>
      </Head>
      <Container component="main" sx={{ height: '100vh' }}>
        <Typography variant="h3">Task Manager</Typography>
      </Container>
    </>
  );
};

export default Home;
