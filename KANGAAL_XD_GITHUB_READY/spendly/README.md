# KANGAAL XD — Paise Aaye, Kahan Gaye?

A React + Vite personal finance tracker with two visual themes:

- **Barbie / Pink Glass:** deep blush background, translucent glass panels, Barbie doll artwork, and individual transparent sticker cut-outs placed around the page (not the original sticker sheet as one flattened image).
- **Doomsday / Green Reactor:** black and emerald-green glass theme with the supplied Doomsday artwork.

## Run locally (Windows PowerShell)

1. Extract the ZIP.
2. Open the inner **`spendly`** folder — the one containing `package.json`.
3. In VS Code, open Terminal and run:

```powershell
npm install
npm run dev
```

4. Open the `Local` URL printed by Vite (normally `http://127.0.0.1:5173`).

If PowerShell is already in the extracted outer folder, run:

```powershell
cd .\spendly
npm install
npm run dev
```

## Build check

```powershell
npm run build
```

## Notes

- Transactions, goals, and theme preference are stored in browser `localStorage`.
- Use the theme switch in the top bar to move between Barbie and Doomsday.
- If an older broken build was open, stop its terminal with `Ctrl+C`, extract this ZIP into a new folder, and run the commands above from the inner `spendly` directory.

Doomsday theme artwork update:
- The supplied hooded Doom image is used as a transparent cut-out for the bottom-right assistant and chatbot character.
- The supplied Avengers: Doomsday wordmark is centered as a subtle background brand mark.
- The supplied Doomsday sticker sheet is separated into individual decorative tile assets in `public/brand/doom-stickers/` and placed around the background individually.
- Barbie theme assets and layout are unchanged.
