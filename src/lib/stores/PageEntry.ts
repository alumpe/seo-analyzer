export class PageEntry extends URL {
  constructor(url: string) {
    super(url);
  }

  get pathAsArray() {
    // trim slashes from the beginning and end of the path
    return this.pathname.split("/").filter((e) => e);
  }

  get uniqueKey() {
    // trim slashes from the beginning and end of the path
    return this.hostname + this.pathname;
  }
}
