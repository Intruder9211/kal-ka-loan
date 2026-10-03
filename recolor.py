from PIL import Image
import numpy as np

img = Image.open('public/logo.png').convert('RGBA')
arr = np.array(img)

# We want to change the dark blue pixels to white.
# The dark blue is roughly RGB(5, 33, 80).
# The Viora green is roughly RGB(7, 153, 116).
# The blue infinity part is e.g. RGB(something, something, > 200).
# Let's target pixels where Blue is > 50 but not too bright, and Red is very low.
# Actually, it's easier to target lightness or distance to the dark blue color.

target_color = np.array([5, 33, 80])
# Calculate distance to the target dark blue color for all pixels
r = arr[:, :, 0].astype(float)
g = arr[:, :, 1].astype(float)
b = arr[:, :, 2].astype(float)
a = arr[:, :, 3].astype(float)

# We want to only affect pixels with significant opacity.
# The text "Money" is dark blue.
# Dark blue is characterized by R<50, G<80, B<120.
# The dark text also has some anti-aliasing (edges).

mask = (r < 50) & (g < 100) & (b < 150) & (a > 0)
# Make those pixels white, preserving alpha
arr[mask, 0] = 255
arr[mask, 1] = 255
arr[mask, 2] = 255

out_img = Image.fromarray(arr)
out_img.save('public/logo_white.png')
