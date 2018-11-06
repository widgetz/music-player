export default class PlayList {
  constructor(trackList) {
    console.log(trackList)
    this.trackList = trackList; // todo: consider using a map or give audio tracks an ID for play(num)
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

  getCurrent(){
    return this.current;
  }

  playPrevious() {
    if (!this.hasSong()) {
      this.current = this.trackList.length - 1;
    }
    const prev = this.current - 1;
    this.current = prev < 0 ? this.size() - 1 : prev;
    return this.trackList[this.current];
  }

  // todo: should return iterator
  getPlaylist() {
    return this.trackList;
  }

  size() {
    return this.trackList.length;
  }
}
