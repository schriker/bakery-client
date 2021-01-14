import { Box, Tooltip } from '@material-ui/core';
import styles from './HomeMapSVG.module.css';
import { voivodeships } from '../../consts';

type HomeMapSVGPropsType = {
  voivodeship: string | null;
  setVoivodeship: (voivodeship: string) => void;
};

export default function HomeMapSVG({
  voivodeship,
  setVoivodeship,
}: HomeMapSVGPropsType) {
  return (
    <Box display="flex" justifyContent="center">
      <svg
        className={styles.map}
        width="594"
        height="553"
        viewBox="0 0 594 553"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {voivodeships.map((v, index) => (
          <Tooltip title={v.name} placement="top" key={index}>
            <path
              onClick={() =>
                setVoivodeship(voivodeship === v.name ? null : v.name)
              }
              className={voivodeship === v.name ? styles.active : null}
              d={v.d}
              fill="#66BB6A"
            />
          </Tooltip>
        ))}
      </svg>
    </Box>
  );
}
