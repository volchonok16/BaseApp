export const generatePassword = (length: number): string => {
  const specialCharacters = '!"$%&\'()+,-./:;<=>?@[]^_{}|~`';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';

  const allCharacters =
    specialCharacters + uppercaseLetters + lowercaseLetters + digits;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }
  return password;
};
