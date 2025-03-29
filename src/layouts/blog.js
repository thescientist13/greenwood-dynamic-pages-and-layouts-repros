const html = `
<html>
  <head>
    <title>Blog Layout</title>
  </head>
  <body>
    <p>Blog Layout</p>
    <content-outlet></content-outlet>
  </body>
</html>
`;

export default class BlogPageLayout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = html;
  }
}