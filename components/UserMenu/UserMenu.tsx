import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import { ButtonPrimary } from '../Button/ButtonPrimary';
import { ButtonText } from '../Button/ButtonText';
import Link from 'next/link';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import React, { useState } from 'react';
import { MenuMain, useMenuItemStyles } from '../Menu/MenuMain';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import { useRouter } from 'next/dist/client/router';

export default function UserMenu() {
  const { data } = useMeQuery();
  const router = useRouter();
  const [logout] = useLogoutMutation({
    update(cache, { data: { logout } }) {
      if (logout) {
        cache.modify({
          fields: {
            me(_, { DELETE }) {
              return DELETE;
            },
          },
        });
      }
    },
  });
  const classes = useMenuItemStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {data ? (
        <ButtonText
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={handleClick}
          startIcon={<PersonOutlineIcon />}
          style={{ marginRight: 15 }}
          size="large"
        >
          Moje konto
        </ButtonText>
      ) : (
        <Link href="/logowanie" passHref>
          <ButtonText
            startIcon={<PersonOutlineIcon />}
            style={{ marginRight: 15 }}
            size="large"
          >
            Moje konto
          </ButtonText>
        </Link>
      )}
      <MenuMain
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => router.push('/moje-konto')}>
          <ListItemIcon>
            <BarChartOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText classes={classes} primary="Sprzedaż" />
        </MenuItem>
        <MenuItem onClick={() => router.push('/wiadomosci')}>
          <ListItemIcon>
            <EmailOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText classes={classes} primary="Wiadomości" />
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <ExitToAppOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText classes={classes} primary="Wyloguj" />
        </MenuItem>
      </MenuMain>
      <Link href={data ? '/nowe-ogloszenie' : '/logowanie'} passHref>
        <ButtonPrimary size="large">Dodaj ogłoszenie</ButtonPrimary>
      </Link>
    </>
  );
}
