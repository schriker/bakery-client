import { ButtonPrimary } from '../Button/ButtonPrimary';
import { CircularProgress } from '@material-ui/core';

type ButtonSubmitPropsType = {
  loading: boolean;
  children: React.ReactNode;
};

export default function ButtonSubmit({
  loading,
  children,
}: ButtonSubmitPropsType) {
  return (
    <ButtonPrimary style={{ marginTop: 10 }} type="submit">
      {loading && (
        <CircularProgress
          style={{ color: 'white', marginRight: 8 }}
          size={15}
        />
      )}
      {children}
    </ButtonPrimary>
  );
}
