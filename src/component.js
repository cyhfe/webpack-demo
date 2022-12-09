export default (text = "Hello world") => {
  const element = document.createElement("div");
  element.className = "rounded bg-red-100 border max-w-md m-4 p-4";
  element.innerHTML = text;
  element.onclick = () => {
    import('./lazy').then(lazy => {
      console.log(lazy.default)
    }).catch(err => console.log(err))
  }
  return element;
};