import { Grid } from '@material-ui/core';
import React from 'react';
import { links } from '../../consts';
import { PaperMain } from '../Paper/PaperMain';
import UserPanelSideBarSection, {
  UserPanelSideBarSectionLink,
} from './UserPanelSidebarSection';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ViewQuiltOutlinedIcon from '@material-ui/icons/ViewQuiltOutlined';

const userAccountLinks: UserPanelSideBarSectionLink[] = [
  {
    title: 'Wiadomości',
    icon: <EmailOutlinedIcon fontSize="small" />,
    href: links.messages,
  },
  {
    title: 'Ustawienia',
    icon: <SettingsOutlinedIcon fontSize="small" />,
    href: links.userSettings,
  },
];

const userProductsLinks: UserPanelSideBarSectionLink[] = [
  {
    title: 'Dodaj produkt',
    icon: <AddCircleOutlineOutlinedIcon fontSize="small" />,
    href: links.newProduct,
  },
  {
    title: 'Moje produkty',
    icon: <DescriptionOutlinedIcon fontSize="small" />,
    href: links.myProducts,
  },
  {
    title: 'Składniki',
    icon: <ViewQuiltOutlinedIcon fontSize="small" />,
    href: links.ingredients,
  },
];

export default function UserPanelSideBar() {
  return (
    <Grid item xs={3}>
      <PaperMain
        elevation={6}
        square
        style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}
      >
        <UserPanelSideBarSection title="Sprzedaż" links={userProductsLinks} />
        <UserPanelSideBarSection title="Moje konto" links={userAccountLinks} />
      </PaperMain>
    </Grid>
  );
}
