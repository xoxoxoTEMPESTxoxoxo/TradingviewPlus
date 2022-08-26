// Disable default TV hotkeys
document.addEventListener("keypress", event => event.stopPropagation(), true);

// Shift key down ( for timeframe scrolling )
let leftShiftDown = false;

// Handle shift down event
const handleKeyDown = (e, a) => {
  switch (e.key) {
    case "Shift": // Toggle shift var
      leftShiftDown = a;
    break;
    case "Tab":   // Scroll line styles
      // Click line stile button
      if (a) {
        document.querySelector('[data-name="style"]').click()
        // Line style scrolling
        const styleButtons = [].slice.call(document.querySelector('[data-name="menu-inner"]').children[0].children[0].children).filter(e => e.children.length > 1);
        const activeIndex = styleButtons.findIndex(e => e.className.includes(' active-'))
        styleButtons[activeIndex != 2 ? activeIndex+1 : 0].click();
      }
    break;
    case "r": // Replay mode toggle
      if (a) {
        document.getElementById('header-toolbar-replay').click();
      }
    break;
    case "a":
    break;
  }
}


// Allow scrolling of timeframes with leftshift and scroll wheel
document.addEventListener('keydown', e => handleKeyDown(e, true))
document.addEventListener('keyup', e => handleKeyDown(e, false))
document.addEventListener('wheel', e => {
  if (!leftShiftDown) return;
  const timeframeButtons = [].slice.call(document.querySelector('[id="header-toolbar-intervals"]').children)
  const currentTimeframe = timeframeButtons.filter(e => e.className.includes('isActive'))[0].innerText;
  const direction = e.deltaY < 0 ? 'up' : 'down';
  const currentTimeframeIndex = timeframeButtons.map(e => e.className.includes('isActive')).indexOf(true);
  const newTimeframeIndex = currentTimeframeIndex + (e.deltaY < 0 ? -1 : 1);
  if (newTimeframeIndex > -1 && newTimeframeIndex < timeframeButtons.length-1) {
    timeframeButtons[newTimeframeIndex].click();
  } 
})

