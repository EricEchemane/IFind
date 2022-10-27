import { Paper } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import GridAutoColumn from 'components/GridAutoColumn';
import useUser from 'hooks/useUser';
import React from 'react';

export default function HomePage() {
  // const { error, user } = useUser({
  //   whenNotFoundRedirectTo: '/sign-in'
  // });

  // if (error) return <div>An Error occured in the request</div>;
  // if (!user) return <div>Loading...</div>;

  const notify = () => showNotification({
    title: "Hello",
    message: "wahts up"
  });

  return (
    <div>
      <h1> widthBasis of 300 </h1>
      <button onClick={notify}> Notify </button>
      {/* <p>Welcome, {user.name}</p> */}
      {/* <GridAutoColumn widthBasis={300} spacing="xl">
        <Paper withBorder shadow="md" p={2}> 1 </Paper>
        <Paper withBorder shadow="md" p={2}> 2 </Paper>
        <Paper withBorder shadow="md" p={2}> 3 </Paper>
        <Paper withBorder shadow="md" p={2}> 3 </Paper>
        <Paper withBorder shadow="md" p={2}> 3 </Paper>
        <Paper withBorder shadow="md" p={2}> 3 </Paper>
      </GridAutoColumn> */}
    </div>
  );
}