    // Keep labels along their original arrows, but out of the tighter node rows.
    const labelWidth = Math.min(234, e.label.length * 6.35 + 21);
    const candidates = Array.from({length: 37}, (_, i) => .05 + i * .025)
      .sort((a, b) => Math.abs(a - t) - Math.abs(b - t));
    for (const candidate of candidates) {
      const v = 1 - candidate;
      const x = v*v*A.x + 2*v*candidate*cx + candidate*candidate*B.x;
      const y = v*v*A.y + 2*v*candidate*cy + candidate*candidate*B.y;
      const clear = NODES.every(n =>
        x + labelWidth/2 < n.x - 4 || x - labelWidth/2 > n.x + NW + 4 ||
        y - 2 < n.y - 4 || y - 23 > n.y + nodeButtons[n.id].offsetHeight + 4);
      if (clear) { t = candidate; break; }
    }
