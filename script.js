  const treePattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
  ];

const tree = document.getElementById('tree');
const red = document.getElementById('red');
const green = document.getElementById('green');
const blue = document.getElementById('blue');
const colorPreview = document.getElementById('colorPreview');
const tooltip = document.getElementById('tooltip');
const toggleRGB = document.getElementById('toggleRGB');

const rgbDisplay = document.createElement('div');
rgbDisplay.id = 'rgbValue';
document.getElementById('controls').appendChild(rgbDisplay);

// Generate the tree grid
/*treePattern.forEach(row => {
  row.forEach(cell => {
    const div = document.createElement('div');
    div.className = 'cell';
    if (cell === 1) div.style.backgroundColor = '#eee';
    tree.appendChild(div);
  });
});
*/

// Update color preview box
function updateColor() {
  const rgb = `rgb(${red.value}, ${green.value}, ${blue.value})`;
  colorPreview.style.backgroundColor = rgb;
  document.getElementById('test').innerText = `RGB: ${rgb}`;
  return rgb;
}


[red, green, blue].forEach(input => input.addEventListener('input', updateColor));

// Handle coloring cells
tree.addEventListener('click', e => {
  if (e.target.classList.contains('cell')) {
    e.target.style.backgroundColor = updateColor();
  }
});

// Toggle RGB Inspection
tree.addEventListener('mousemove', e => {
  if (toggleRGB.checked && e.target.classList.contains('cell')) {
    const color = window.getComputedStyle(e.target).backgroundColor;
    tooltip.style.display = 'block';
    tooltip.style.top = `${e.pageY + 10}px`;
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.innerText = color;
  }
});

tree.addEventListener('mouseout', () => {
  tooltip.style.display = 'none';
});

// Save the grid only
document.getElementById('saveButton').addEventListener('click', () => {
  html2canvas(tree).then(canvas => {
    const link = document.createElement('a');
    link.download = 'christmas_tree.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});
