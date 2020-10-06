const getCatPic = async () => {
    try {
        let img = document.querySelector(".cat-pic");
        document.querySelector(".loader").innerHTML = "<p>Loading..</p>";
        img.src = "";

        let res = await fetch("/kitten/image");
        if (!res.ok) throw res;
        let data = await res.json();

        img.src = data.src;
        document.querySelector(".loader").innerHTML = "";
    } catch (error) {
        let data = await error.json();
        alert(data.message);
    }
};

let button = document.querySelector("#new-pic");

window.addEventListener("DOMContentLoaded", getCatPic);
button.addEventListener("click", getCatPic);
