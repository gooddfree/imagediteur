const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let image = new Image();
let filters = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  grayscale: 0,
  invert: 0
};

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
});

image.onload = () => {
  canvas.width = image.width;
  canvas.height = image.height;
  applyFilters();
};

function applyFilters() {
  ctx.filter = `
    brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
    saturate(${filters.saturate}%)
    grayscale(${filters.grayscale}%)
    invert(${filters.invert}%)
  `;
  ctx.drawImage(image, 0, 0);
}

["brightness", "contrast", "saturate", "grayscale", "invert"].forEach((id) => {
  document.getElementById(id).addEventListener("input", (e) => {
    filters[id] = e.target.value;
    applyFilters();
  });
});

document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();
  link.click();
});
