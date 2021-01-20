import { createStyles, makeStyles, Theme } from '@material-ui/core';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';

const useListStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      listStyle: 'none',
      padding: 0,
      '& li': {
        display: 'flex',
        marginBottom: 10,
      },
      '& svg': {
        fill: theme.palette.secondary[500],
        marginRight: theme.spacing(1),
      },
    },
  })
);

export default function SidePanelList({ list }: { list: string[] }) {
  const classes = useListStyles();

  return (
    <ul className={classes.root}>
      {list.map((item, index) => (
        <li key={index}>
          <CheckCircleOutlineRoundedIcon fontSize="small" />
          {item}
        </li>
      ))}
    </ul>
  );
}
