/* Page-local enhancement. Definitions are embedded at build time; no remote API. */
(() => {
  const terms = JSON.parse(document.querySelector('#term-data').textContent);
  const card = document.querySelector('#term-card');
  const closeButton = card.querySelector('.card-close');
  const smallScreen = matchMedia('(max-width: 700px)');
  const hasHover = matchMedia('(hover: hover) and (pointer: fine)');
  let active = null;
  let pinned = false;
  let origin = null;
  let openTimer;
  let closeTimer;
  let ignoreFocus = false;
  let lastPointerDown = null;
  let previousOverflow = null;

  function clearTimers() { clearTimeout(openTimer); clearTimeout(closeTimer); }
  function positionCard() {
    if (!active || !card.open || smallScreen.matches) return;
    const rect = active.getBoundingClientRect();
    const width = card.offsetWidth;
    const height = card.offsetHeight;
    const gap = 9;
    const below = innerHeight - rect.bottom - gap - 12;
    const above = rect.top - gap - 12;
    const top = below >= height || below >= above ? rect.bottom + gap : rect.top - height - gap;
    card.style.left = `${Math.max(12, Math.min(rect.left, innerWidth - width - 12))}px`;
    card.style.top = `${Math.max(12, Math.min(top, innerHeight - height - 12))}px`;
  }
  function close(restoreFocus = false) {
    clearTimers();
    const trigger = active;
    if (active) active.setAttribute('aria-expanded', 'false');
    active = null;
    pinned = false;
    origin = null;
    if (card.open) {
      // Native dialog restores the previously focused element. Do not reopen it.
      ignoreFocus = true;
      card.close();
      ignoreFocus = false;
    }
    if (previousOverflow !== null) {
      document.documentElement.style.overflow = previousOverflow;
      previousOverflow = null;
    }
    if (restoreFocus && trigger) {
      ignoreFocus = true;
      trigger.focus({preventScroll: true});
      ignoreFocus = false;
    }
  }
  function open(trigger, keepOpen, reason) {
    clearTimers();
    if (active === trigger && card.open) {
      if (keepOpen) { pinned = true; closeButton.focus({preventScroll: true}); }
      return;
    }
    // Keep an open dialog in place: closing/reopening resets its surface,
    // focus, and (on mobile) backdrop even when only the term has changed.
    if (active) active.setAttribute('aria-expanded', 'false');
    const term = terms[trigger.dataset.gridTerm];
    active = trigger;
    pinned = keepOpen;
    origin = reason;
    document.querySelector('#term-name').textContent = term.name;
    document.querySelector('#term-definition').textContent = term.definition;
    // These SVGs are already in the page. Replacing the entire diagram is
    // synchronous, so there is no image request/decode or stale bitmap frame.
    document.querySelector('#term-art').replaceChildren(
      document.querySelector(`#diagram-${term.id}`).content.cloneNode(true)
    );
    document.querySelector('#term-caption').textContent = term.caption;
    document.querySelector('#term-more').href = trigger.href;
    trigger.setAttribute('aria-expanded', 'true');
    card.scrollTop = 0;
    // show() also focuses by default. Hover/focus previews must keep focus in the article.
    const focused = document.activeElement;
    if (smallScreen.matches) {
      if (!card.open) {
        previousOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        card.showModal();
      }
    } else {
      if (!card.open) card.show();
      positionCard();
      if (keepOpen) closeButton.focus({preventScroll: true});
      else if (focused instanceof HTMLElement) {
        ignoreFocus = true;
        const previousTabindex = focused.getAttribute('tabindex');
        if (focused === document.body) focused.setAttribute('tabindex', '-1');
        focused.focus({preventScroll: true});
        if (focused === document.body) {
          if (previousTabindex === null) focused.removeAttribute('tabindex');
          else focused.setAttribute('tabindex', previousTabindex);
        }
        ignoreFocus = false;
      }
    }
  }
  function scheduleClose() {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (pinned || card.matches(':hover') || active?.matches(':hover')) return;
      if (origin === 'focus' && (active === document.activeElement || card.contains(document.activeElement))) return;
      close();
    }, 180);
  }

  for (const link of document.querySelectorAll('a[data-grid-term]')) {
    if (!terms[link.dataset.gridTerm] || typeof card.showModal !== 'function') continue;
    link.classList.add('grid-term');
    link.setAttribute('aria-haspopup', 'dialog');
    link.setAttribute('aria-controls', card.id);
    link.setAttribute('aria-expanded', 'false');
    link.addEventListener('pointerenter', () => {
      clearTimers();
      if (hasHover.matches && !smallScreen.matches && !pinned) openTimer = setTimeout(() => open(link, false, 'pointer'), 220);
    });
    link.addEventListener('pointerleave', scheduleClose);
    link.addEventListener('focus', () => {
      if (!ignoreFocus && !pinned && !smallScreen.matches && link.matches(':focus-visible')) open(link, false, 'focus');
    });
    link.addEventListener('blur', scheduleClose);
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (active === link && pinned) close(true);
      else open(link, true, 'click');
    });
  }
  card.addEventListener('pointerenter', () => clearTimeout(closeTimer));
  card.addEventListener('pointerleave', scheduleClose);
  card.addEventListener('focusout', scheduleClose);
  card.addEventListener('cancel', event => { event.preventDefault(); close(true); });
  closeButton.addEventListener('click', () => close(true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && card.open) { event.preventDefault(); close(pinned); }
  });
  document.addEventListener('pointerdown', event => { lastPointerDown = event.target; });
  document.addEventListener('click', event => {
    if (!card.open || event.target.closest('.grid-term')) return;
    const rect = card.getBoundingClientRect();
    const isBackdrop = event.target === card && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
    if (isBackdrop && lastPointerDown === card) close(true);
    else if (!card.contains(event.target)) close(false);
  });
  addEventListener('scroll', () => {
    if (card.open && !smallScreen.matches) {
      if (pinned) positionCard();
      else close();
    }
  }, {passive: true});
  addEventListener('resize', positionCard);
  smallScreen.addEventListener('change', () => close(pinned));
})();
