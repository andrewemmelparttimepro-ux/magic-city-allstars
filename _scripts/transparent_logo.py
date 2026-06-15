#!/usr/bin/env python3
"""
Make the white background of mca-logo.png transparent, using flood-fill
from the corners so any white *inside* the star (if any) stays opaque.
Edge anti-aliasing is preserved by computing alpha from luminance distance.
"""
from PIL import Image
from collections import deque
import sys, os

SRC = sys.argv[1] if len(sys.argv) > 1 else 'assets/mca-logo.png'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'assets/mca-logo.png'

img = Image.open(SRC).convert('RGBA')
w, h = img.size
px = img.load()

# Threshold: a pixel counts as "background-white" if all channels > 235
# Soft band [200..255] gets a soft alpha to keep anti-aliased edges clean.
HARD = 235
SOFT = 200

# 1) Flood-fill from corners to mark connected near-white regions as background.
visited = bytearray(w * h)
def idx(x, y): return y * w + x

q = deque()
for sx, sy in [(0, 0), (w-1, 0), (0, h-1), (w-1, h-1)]:
    r, g, b, _ = px[sx, sy]
    if r >= HARD and g >= HARD and b >= HARD:
        q.append((sx, sy))
        visited[idx(sx, sy)] = 1

while q:
    x, y = q.popleft()
    for nx, ny in ((x+1, y), (x-1, y), (x, y+1), (x, y-1)):
        if 0 <= nx < w and 0 <= ny < h and not visited[idx(nx, ny)]:
            r, g, b, _ = px[nx, ny]
            if r >= HARD and g >= HARD and b >= HARD:
                visited[idx(nx, ny)] = 1
                q.append((nx, ny))

# 2) For visited pixels, set alpha = 0. For their immediate neighbors that
#    are in the soft band, ramp alpha down so edges blend smoothly.
out = img.copy()
opx = out.load()

# First pass: hard transparency for flood-filled background.
for y in range(h):
    for x in range(w):
        if visited[idx(x, y)]:
            r, g, b, _ = px[x, y]
            opx[x, y] = (r, g, b, 0)

# Second pass: soften edges. For any non-visited pixel adjacent to a visited
# pixel, if it's in the soft band, scale alpha by how white it is.
for y in range(h):
    for x in range(w):
        if visited[idx(x, y)]:
            continue
        # Check if any 4-neighbor is visited (background)
        adjacent_bg = False
        for nx, ny in ((x+1, y), (x-1, y), (x, y+1), (x, y-1)):
            if 0 <= nx < w and 0 <= ny < h and visited[idx(nx, ny)]:
                adjacent_bg = True
                break
        if not adjacent_bg:
            continue
        r, g, b, a = px[x, y]
        m = min(r, g, b)
        if m >= SOFT:
            # Map [SOFT..HARD] to alpha [0..255]
            alpha = int(255 * (HARD - m) / (HARD - SOFT))
            alpha = max(0, min(255, alpha))
            opx[x, y] = (r, g, b, alpha)

out.save(OUT, 'PNG', optimize=True)
print(f'wrote {OUT} ({os.path.getsize(OUT)} bytes)')
