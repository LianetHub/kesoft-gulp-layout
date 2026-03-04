export const footerYear = () => {
  const currentYear = new Date().getFullYear();
  const footer = document.querySelector(".footer__copy");
  footer.textContent = `Кесофт © ${currentYear}`;
};
