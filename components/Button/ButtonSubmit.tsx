import { ButtonPrimary } from '../Button/ButtonPrimary';

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
      {children}
    </ButtonPrimary>
  );
}
