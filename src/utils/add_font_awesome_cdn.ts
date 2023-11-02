export const addFontCdn = () => {
  const fontAwesomeCdn = document.createElement("link");
  fontAwesomeCdn.rel = "stylesheet";
  fontAwesomeCdn.href = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css`;
  document.body.appendChild(fontAwesomeCdn);
};
