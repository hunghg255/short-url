import ToastjsTiny from 'toastjs-tiny';

export const toast = {
  success: (text: string) => {
    return new ToastjsTiny({ text });
  },
  error: (text: string) => {
    return new ToastjsTiny({ text, type: 'error' });
  },
};

export const makeId = (length: number) => {
  let id = '';

  // Generate 10 random characters (A-Z, a-z, 0-9) using a loop
  for (let i = 0; i < length; i++) {
    // Generate a random number between 0 and 61
    const randomNumber = Math.floor(Math.random() * 62);

    // Convert the random number to a character (A-Z, a-z, 0-9) using the charCodeAt method
    id += String.fromCharCode(
      randomNumber < 26
        ? 65 + randomNumber // A-Z
        : randomNumber < 52
        ? 97 + randomNumber - 26 // a-z
        : 48 + randomNumber - 52 // 0-9
    );
  }

  // Return the ID
  return id;
};
