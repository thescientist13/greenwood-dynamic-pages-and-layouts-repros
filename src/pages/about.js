export default class AboutPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h2>About Page</h2>`;
  }
}