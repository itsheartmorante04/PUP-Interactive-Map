const zoom = 0.8; 
document.body.style.zoom = (zoom * 100) + "%";

const mapContainer = document.querySelector('.map-container');

document.querySelectorAll('area').forEach(area => {
  const tooltipId = area.dataset.tooltip;
  if (!tooltipId) return;
  const tooltip = document.getElementById(tooltipId);

  const coords = area.getAttribute('coords');
  const shape = area.getAttribute('shape');

  let coordsElem = tooltip.querySelector('.coords-info');
  if (!coordsElem) {
    coordsElem = document.createElement('p');
    coordsElem.classList.add('coords-info');
    tooltip.appendChild(coordsElem);
  }

  coordsElem.textContent = `Shape: ${shape} | Coords: ${coords}`;

  area.onmouseover = () => {
    tooltip.classList.add('show');
  };

  area.addEventListener('mousemove', e => {
    const offset = 15;

    const mapRect = mapContainer.getBoundingClientRect();
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    const mouseX = (e.clientX - mapRect.left) / zoom;
    const mouseY = (e.clientY - mapRect.top) / zoom;

    let left = mouseX + offset + mapContainer.scrollLeft;
    let top = mouseY + offset + mapContainer.scrollTop;

    if (left + tooltipWidth > mapRect.width / zoom)
      left = mouseX - tooltipWidth - offset + mapContainer.scrollLeft;

    if (left < 0) left = offset;

    if (top + tooltipHeight > mapRect.height / zoom)
      top = mouseY - tooltipHeight - offset + mapContainer.scrollTop;

    if (top < 0) top = offset;

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  });

  area.onmouseleave = () => {
    tooltip.classList.remove('show');
  };
});
