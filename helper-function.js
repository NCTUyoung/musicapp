function secondsToTime(t) {
    return padZero(parseInt((t / (60)) % 60)) + ":" + 
           padZero(parseInt((t) % 60));
  }
function padZero(v) {
return (v < 10) ? "0" + v : v;
}
