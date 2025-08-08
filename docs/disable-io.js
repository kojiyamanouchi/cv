(function(){
  try {
    // Patch IntersectionObserver so all elements are treated as visible.
    const IO = window.IntersectionObserver;
    window.IntersectionObserver = class {
      constructor(cb) { this._cb = cb; }
      observe(target) {
        // Immediately notify as intersecting
        this._cb && this._cb([{ isIntersecting: true, target }]);
      }
      unobserve() {}
      disconnect() {}
      takeRecords() { return []; }
    };

    // Suppress scroll-driven effects that hide/reposition content
    const origAddEventListener = window.addEventListener.bind(window);
    window.addEventListener = function(type, listener, options){
      if (type === 'scroll') { return; }
      return origAddEventListener(type, listener, options);
    };

    // Neutralize requestAnimationFrame-heavy animations
    const raf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (cb) => raf(() => cb(performance.now()));
  } catch (_) { /* no-op */ }
})();
