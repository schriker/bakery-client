export default function mapServerErrorMessage(message: string) {
  const errors = {
    "User dosen't exists.": 'Podany użytkownik nie istnieje.',
    'Wrong password.': 'Blędne hasło.',
    'User exists.': 'Podany uytkownik juz istnieje.',
  };

  return errors[message];
}
