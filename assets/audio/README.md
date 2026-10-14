# Lo-fi track

Put your background track here, e.g. `lofi-loop.mp3`, then set the path in `index.html`:

```html
<div class="lofi" data-lofi data-src="assets/audio/lofi-loop.mp3" hidden>
```

- Only use a track whose licence covers use on a website (keep a copy of the licence).
- Instrumental, about 1–3 minutes, with an ending that loops cleanly into the start.
- MP3 at 96–128 kbps keeps it around 1–3 MB. It only downloads after a visitor turns lo-fi mode on.
- While `data-src` is empty, a lo-fi loop is generated in the browser instead.
