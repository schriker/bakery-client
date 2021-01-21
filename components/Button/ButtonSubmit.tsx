import { ButtonPrimary } from '../Button/ButtonPrimary';

type ButtonSubmitPropsType = {
  children: React.ReactNode;
};

export default function ButtonSubmit({ children }: ButtonSubmitPropsType) {
  return (
    <ButtonPrimary style={{ marginTop: 10 }} type="submit">
      {children}
    </ButtonPrimary>
  );
}
