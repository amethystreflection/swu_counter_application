const useGlitch = (e) => {
    if (e.target.classList.contains('glitched')) {
      let line = e.target.querySelector('.scan-line');
      e.target.classList.remove('glitched');
      e.target.removeChild(line);
    } else {
        e.target.classList.add('glitched');
        let ln = document.createElement('div');
        ln.classList.add('scan-line');
        ln.setAttribute('aria-hidden', 'true');
        e.target.appendChild(ln);
    }
  };

  export default useGlitch;

