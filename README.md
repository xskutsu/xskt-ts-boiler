# xskt-ts-boiler
This is my typescript-project boilerplate! It's not perfect, but it's worked great for me.

### P.S.
I put some good thought into TODO.md while setting this up. Keep it open while going through this and messing with the project :)

## Prerequisites
This project expects a supported Node.js LTS and pnpm version installed.

Let's assume you have Node already...

Pnpm is the package manager of choice for this boilerplate. Pnpm is literally just npm but better. Same package registry, (almost) same API, and much faster. Look into how it works if you haven't already, it's really cool.

You can even install it with npm!
```bash
npm install -g pnpm@latest-10
```

## Filestructure (of what matters)
```
├─ source/          # TypeScript source files. This is where you'll write code.
├─ dist/            # Build outputs. These are the actual JS that runs.
├─ esbuild.cjs      # My custom esbuild configuration.
├─ package.json     # Project information.
├─ README.md        # What you are looking at right now. 
├─ TODO.md          # A very cool list to follow along with
└─ LICENSE          # The legality.
```

## Development Workflow
My IDE of choice is vscode, and that's what I configured this for. It's not a requirement, though.

1. Install dependencies
```bash
pnpm install
```

2. Start esbuild

Something cool about how I have this set up, as you make changes to the typescript files they automatically rebuild when a change is detected! How cool is that?
```bash
pnpm run watch
```

3. Write some code. ^.^

4. Run it and see if it works.
```bash
pnpm run start
```

For publishing a npm package, look into the ``pnpm publish`` command.

Note: If you are developing a library, you must run ``pnpm run build`` once you are ready to release a build. The watch command does not automatically external type definitions. This does not apply if you are say, making a game.

## Contributing
If you want to contribute back (fixes, better examples, improved build scripts), open a PR. Small, focused PRs are easiest to review.

## License
This repository is licensed under the UNLICENSE license. This means you are free to do whatever the heck you want with it!