import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      camelcaseKeys,
      snakecaseKeys,
    },
  };
});
