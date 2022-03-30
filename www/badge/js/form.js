const thenFile = document.getElementById("img-upload-then")
const nowFile = document.getElementById("img-upload-now");
const form = document.getElementsByTagName("form")[0];

nowFile.oninput = (evt) => {
  const [file] = nowFile.files;
  if (file) {
    if(file.type == "image/webp") {
      alert("Sad panda. Sorry, but you can't use an image in the WebP format.");
    }
    else if(file.size > 2000000) {
      // warning these are reversed
      alert("Your “How it’s going” image file size is a little too large! We accept up to 2MB.");
    } else {
      const preview = document.getElementById("img-preview-now");
      preview.src = URL.createObjectURL(file);
      preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    }
  }
}

thenFile.oninput = (evt) => {
  const [file] = thenFile.files;
  if (file) {
    if(file.type == "image/webp") {
      alert("Sad panda. Sorry, but you can't use an image in the WebP format.");
    }
    else if(file.size > 2000000) {
      // warning these are reversed
      alert("Your “How it started” image file size is a little too large! We accept up to 2MB.");
    } else {
      const preview = document.getElementById("img-preview-then");
      preview.src = URL.createObjectURL(file);
      preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    }
  }
}
  
form.onsubmit = (evt) => {
  const button = document.getElementById("submit");
  button.value = "Laminating...";
  button.classList.add("active");
}