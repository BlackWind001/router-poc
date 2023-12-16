type PathViewPair = {
  [key: string]: React.ReactNode
}

class Router {
  pages : PathViewPair;

  constructor () {
    this.pages = {};

    if (!history) {
      throw 'History object is not present. Cannot continue further.'
    }
  }

  register (pagePath: string, view: React.ReactNode) {

    // https://eslint.org/docs/latest/rules/no-prototype-builtins
    if (Object.prototype.hasOwnProperty.call(this.pages, pagePath)) {
      return;
    }

    this.pages[pagePath] = view;
  }

  goTo (path: string) {
    try {
      // Internal redirection
      if (path in this.pages) {
        history.pushState({}, '', path);
        return;
      }

      // External redirection
      const externalURL = new URL(path);
      window.location.assign(externalURL);
    }
    catch (err) {
      console.error(err);
    }
  }

}

export default new Router();
