const esbuild = require("esbuild");
const args = process.argv.slice(2);
const isWatch = args.includes("--watch");

const commonOptions = {
	entryPoints: ["./source/index.ts"],
	bundle: true,
	sourcemap: true,
	logLevel: "info"
};

// These are the files it will build. I made this really simple to add more
const presets = [
	{ // CJS, or commonjs, is your classic javascript for Node.js pre-es6 so require and stuff
		format: "cjs",
		outfile: "dist/index.cjs.js",
		platform: "node"
	},
	{ // ESM, or ECMASCRIPT, is the goto middleground. You get all the newest features and import/export syntax (es6) stuff.
		format: "esm",
		outfile: "dist/index.esm.js",
		platform: "neutral",
	},
	{ // IIFE bundle, or browser bundle, puts everything into one file and compresses it, ready for delivery.
		minify: true,
		format: "iife",
		outfile: "dist/index.global.js",
		// This is the namespace. Think about how jquery has $ or lodash has _.
		// If you export Entity, then you would write window.SampleModule.Entity to access it.
		globalName: "SampleModule",
		platform: "browser"
	}
];

for (const preset of presets) {
	const options = { ...commonOptions, ...preset };
	(async () => {
		const ctx = await esbuild.context(options);
		if (isWatch) {
			await ctx.watch();
			console.log(`Watching to outfile: ${options.outfile}`);
		} else {
			await ctx.rebuild();
			await ctx.dispose();
			console.log(`Built outfile: ${options.outfile}`);
		}
	})();
}