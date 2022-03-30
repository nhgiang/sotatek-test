export class Activity {
  private _activities: {
    [key: string]: boolean
  } = {};

  is(key: string): boolean {
    return this._activities[key] || false;
  }

  stop(key: string) {
    this._activities[key] = false;
  }

  start(key: string) {
    this._activities[key] = true;
  }

  stopAll() {
    Object.keys(this._activities).forEach(key => {
      this._activities[key] = false;
    });
  }
}
