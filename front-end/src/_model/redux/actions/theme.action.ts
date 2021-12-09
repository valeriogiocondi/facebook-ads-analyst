export const storeThemeAction = (payload: string) => {
  
  return {
    type: 'STORE_THEME',
    payload: { value: payload }
  }
};