const html = `<html>
  <head>
    <title>Page Layout</title>
  </head>
  <body>
    <p>Page Layout</p>
    <content-outlet></content-outlet>
  </body>
</html>
`;

export default class PageLayout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html;
  }
}