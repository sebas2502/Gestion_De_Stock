export const reproducirSonido = () => {
  const audio = new Audio("/src/utils/notif_ok.wav");
  audio.volume = 0.5;
  audio.play().catch(() => {});
};
