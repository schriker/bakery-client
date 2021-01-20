import { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

type TabsPropsType = {
  title: string;
  labels: string[];
  children: React.ReactNode[];
};

interface TabPanelPropsType {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel({ children, value, index, ...other }: TabPanelPropsType) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const useStyledTab = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      opacity: 1,
      flex: '1 1 100%',
      maxWidth: 'initial',
      color: theme.palette.grey[600],
      textTransform: 'initial',
      '&:hover': {
        color: theme.palette.secondary[500],
        opacity: 1,
      },
      '&:focus': {
        color: theme.palette.secondary[500],
      },
    },
    selected: {
      color: theme.palette.secondary[500],
      fontWeight: 700,
    }
  })
);

const useStyledTabs = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
      backgroundColor: theme.palette.primary[800],
    },
    flexContainer: {
      justifyContent: 'center',
    },
  })
);

export function TabsMain({ labels, children, title }: TabsPropsType) {
  const tabClasses = useStyledTab();
  const tabsClasses = useStyledTabs();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        classes={tabsClasses}
        value={value}
        onChange={handleChange}
        aria-label={title}
      >
        {labels.map((label, index) => (
          <Tab
            classes={tabClasses}
            key={index}
            label={label}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {children.map((panel, index) => (
        <TabPanel key={index} value={value} index={index}>
          {panel}
        </TabPanel>
      ))}
    </>
  );
}
