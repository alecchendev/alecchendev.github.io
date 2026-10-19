    // Injected into fit() only in the experimental output. Keep its scale
    // variable in the original closure so dragging uses the same coordinates.
    canvas.style.left = '0';
    canvas.style.top = '0';
    if (matchMedia('(min-width: 1001px) and (min-height: 600px)').matches) {
      const width = viewport.clientWidth, height = viewport.clientHeight;
      scale = Math.min(1, (width - 16) / W, (height - 16) / H);
      canvas.style.transform = `scale(${scale})`;
      canvas.style.margin = '0';
      canvas.style.left = `${(width - W * scale) / 2}px`;
      canvas.style.top = `${(height - H * scale) / 2}px`;
      viewport.style.minHeight = '0';
      return;
    }
