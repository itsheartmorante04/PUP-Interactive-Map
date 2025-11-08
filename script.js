function openPanel(event) {
    console.log(event.target.alt);
}

// Find the nearest positioned container so tooltip absolute coords are relative to it
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


    area.addEventListener('mouseenter', () => {
        tooltip.classList.add('show');
    });

    area.addEventListener('mousemove', e => {
        const offset = 8; // small gap between cursor and tooltip

        // Use client coordinates and position tooltip relative to the map container
        const mapRect = mapContainer.getBoundingClientRect();
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        // coordinates relative to the container
        let left = e.clientX - mapRect.left + offset + mapContainer.scrollLeft;
        let top = e.clientY - mapRect.top + offset + mapContainer.scrollTop;

        // Keep tooltip inside the container horizontally
        if (left + tooltipWidth > mapRect.width) {
        left = e.clientX - mapRect.left - tooltipWidth - offset + mapContainer.scrollLeft;
        }

        if (left < 0) left = offset;

        // Keep tooltip inside the container vertically
        if (top + tooltipHeight > mapRect.height) {
        top = e.clientY - mapRect.top - tooltipHeight - offset + mapContainer.scrollTop;
        }

        if (top < 0) top = offset;

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    });

    area.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
    });
});

