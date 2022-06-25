function test() {
  console.log("TESTING WORKS!")
}
function toggleDarkmode() {
    if (document.getElementById('darkmode').checked == true) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    //console.log("Dark mode is now: "+(document.getElementById('darkmode').checked))
}
toggleDarkmode();