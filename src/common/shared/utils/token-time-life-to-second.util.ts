export const tokenTimeLifeToMilliseconds = (tokenLifetime: string): number => {
  const parts = tokenLifetime.trim().split(' ');
  if (parts.length !== 2) {
    throw new Error('Некорректный формат времени жизни токена.');
  }

  const value = parseInt(parts[0], 10);
  const unit = parts[1].toLowerCase();

  let seconds = 0;
  switch (unit) {
    case 'sec':
    case 'second':
    case 'seconds':
      seconds = value;
      break;
    case 'min':
    case 'minute':
    case 'minutes':
      seconds = value * 60;
      break;
    case 'hour':
    case 'hours':
      seconds = value * 60 * 60;
      break;
    case 'day':
    case 'days':
      seconds = value * 24 * 60 * 60;
      break;
    default:
      throw new Error('Неподдерживаемая формат времени.');
  }

  return seconds * 1000;
};
