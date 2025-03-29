const html = `
<html>
  <head>
    <title>About Page</title>
  </head>
  <body>
    <h2>About Page</h2>
  </body>
</html>
`;


export default class AboutPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html;
  }
}