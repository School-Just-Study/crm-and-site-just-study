function CustomLogo() {
  return (
    <img src={'https://storage.yandexcloud.net/sitejuststudy/js-mini.png'} width={'100%'} height={40}
         style={{ objectFit: 'contain' }} />
  );
}

export const components = {
  Logo: CustomLogo,
};
