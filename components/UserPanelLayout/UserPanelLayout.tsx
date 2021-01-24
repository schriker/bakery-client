import { Grid } from '@material-ui/core';
import React from 'react';
import { PaperMain } from '../Paper/PaperMain';
import UserPanelSideBar from '../UserPanelSidebar.tsx/UserPanelSidebar';

export default function UserPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid container justify="center" spacing={3}>
      <UserPanelSideBar />
      <Grid item xs={9}>
        <PaperMain elevation={6} square>
          {children}
        </PaperMain>
      </Grid>
    </Grid>
  );
}
