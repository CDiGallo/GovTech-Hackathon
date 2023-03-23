
function initApplication() {
	console.log("hello");
}




document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    initApplication();
  }
};
