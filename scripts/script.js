const intruderFileNames = [
  "circle_bottom.png",
  "gun.png",
  "circle_border_top.png",
  "circle_white_top.png"
];

const intruderSprites = intruderFileNames.map((file_name) => {
  let img = new Image();
  img.src = `images/intruder/${file_name}`
  return img;
});

const canvas = document.getElementById("pfp-preview");
const ctx = canvas.getContext("2d");

const buffer = document.createElement('canvas');
buffer.width = canvas.width;
buffer.height = canvas.height;
const btx = buffer.getContext('2d');

const colorInput = document.getElementById("intruder-color-input");

function drawTintedTop(tintColor)
{
  // Inspired by https://stackoverflow.com/a/44558286

  const top_img = intruderSprites.at(-1)

  // Reset canvas
  btx.globalCompositeOperation = 'source-over';
  btx.clearRect(0, 0, buffer.width, buffer.height)

  btx.drawImage(top_img, 0, 0);
  
  btx.fillStyle = tintColor;
  btx.globalCompositeOperation = 'multiply';
  btx.fillRect(0, 0, buffer.width, buffer.height);

  btx.globalCompositeOperation = 'destination-in';
  btx.drawImage(top_img, 0, 0);
  
  
  ctx.drawImage(buffer, 0, 0);
}

function drawPfp(tintColor)
{
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < intruderSprites.length - 1; i++)
  {
  ctx.drawImage(intruderSprites[i], 0, 0);
  }

  drawTintedTop(tintColor);
}

function readColor() {
  return colorInput.value;
}

function downloadCanvasAsPng() {
  // https://www.xjavascript.com/blog/downloading-canvas-element-to-an-image/#3-method-1-using-canvastodataurl

  const dataURL = canvas.toDataURL("image/png");

  // Create a temp download link that will be clicked automatically
  const link = document.createElement("a");
  
  link.href = dataURL;
  link.download = readColor().substring(1);
  
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link); // Cleanup
}