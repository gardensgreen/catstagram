window.addEventListener("DOMContentLoaded", async () => {
  try {
    let res = await fetch("/kitten/image");
    if (!res.ok) throw res;
    let data = await res.json();
    let img = document.querySelector(".cat-pic");
    img.src = data.src;
  } catch (error) {
    let data = await error.json();
    alert(data.message);
  }
});
