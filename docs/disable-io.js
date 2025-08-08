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
  } catch (_) { /* no-op */ }
})();

