export default class PlayList {
  constructor(trackList) {
    this.trackList = trackList;
    this.current = undefined;

  }

  hasSong() {
    return !(this.current === undefined);
  }

  playNext() {
    if (!this.hasSong()) {
      this.current = this.trackList.length - 1;
    }
    this.current = (this.current + 1) % this.size();
    return this.trackList[this.current];
  }

  play(num) {
    this.current = num;
    return this.trackList[this.current];
  }

  playPrevious() {
    if (!this.hasSong()) {
      this.current = this.trackList.length - 1;
    }
    const prev = this.current - 1;
    this.current = prev < 0 ? this.size() - 1 : prev;
    return this.trackList[this.current];
  }

  getPlaylist() {
    return this.trackList;
  }

  size() {
    return this.trackList.length;
  }
}