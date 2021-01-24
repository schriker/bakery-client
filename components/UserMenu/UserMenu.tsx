import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import { ButtonPrimary } from '../Button/ButtonPrimary';
import { ButtonText } from '../Button/ButtonText';
import Link from 'next/link';
import { links } from '../../consts';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import React, { useState } from 'react';
import { MenuMain, useMenuItemStyles } from '../Menu/MenuMain';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import { useRouter } from 'next/dist/client/router';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

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
        <Link href={links.login} passHref>
          <ButtonText
            startIcon={<PersonOutlineIcon />}
            style={{ marginRight: 15 }}
            size="large"
          >
            Moje konto
          </ButtonText>
        </Link>
      )}
      {data && (
        <MenuMain
          id="user-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => router.push(links.myAccount)}>
            <ListItemIcon>
              <BarChartOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText classes={classes} primary="Sprzedaż" />
          </MenuItem>
          <MenuItem onClick={() => router.push(links.messages)}>
            <ListItemIcon>
              <EmailOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText classes={classes} primary="Wiadomości" />
          </MenuItem>
          <MenuItem onClick={() => router.push(links.userSettings)}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText classes={classes} primary="Ustawienia" />
          </MenuItem>
          <MenuItem onClick={() => logout()}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText classes={classes} primary="Wyloguj" />
          </MenuItem>
        </MenuMain>
      )}
      <Link href={data ? links.newProduct : links.login} passHref>
        <ButtonPrimary size="large">Dodaj ogłoszenie</ButtonPrimary>
      </Link>
    </>
  );
}
