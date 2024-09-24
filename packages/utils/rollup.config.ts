import alias from "@rollup/plugin-alias"
import terser from "@rollup/plugin-terser"
import { dts } from "rollup-plugin-dts"
import typescript from "@rollup/plugin-typescript"
import fs from "fs"
import cleanup from "rollup-plugin-cleanup"
import nodePolyfills from "rollup-plugin-polyfill-node"

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"))
const banner = `/**
 * @module ${pkg.name}
 * @version ${pkg.version}
 * @file ${pkg.description}
 * @copyright Ethereum Foundation ${new Date().getFullYear()}
 * @license ${pkg.license}
 * @see [Github]{@link ${pkg.homepage}}
*/`

const name = pkg.name.substr(1).replace(/[-/]./g, (x: any) => x.toUpperCase()[1])

export default [
    {
        input: "src/index.ts",
        output: [
            { file: pkg.exports["."].node.require, format: "cjs", banner, exports: "auto" },
            { file: pkg.exports["."].node.default, format: "es", banner }
        ],
        external: [...Object.keys(pkg.dependencies), "crypto", "node:fs", "node:fs/promises", "node:path", "node:os"],
        plugins: [
            typescript({
                tsconfig: "./build.tsconfig.json"
            }),
            cleanup({ comments: "jsdoc" })
        ]
    },
    {
        input: "src/index.ts",
        output: [
            {
                file: pkg.exports["."].browser,
                format: "es",
                banner
            }
        ],
        external: Object.keys(pkg.dependencies),
        plugins: [
            alias({
                entries: [{ find: "./crypto/crypto.node", replacement: "./crypto/crypto.browser" }]
            }),
            typescript({
                tsconfig: "./build.tsconfig.json"
            }),
            cleanup({ comments: "jsdoc" })
        ]
    },
    {
        input: "src/index.ts",
        output: [
            {
                file: pkg.iife,
                name,
                format: "iife",
                banner
            },
            {
                file: pkg.unpkg,
                name,
                format: "iife",
                plugins: [terser({ output: { preamble: banner } })]
            }
        ],
        external: [],
        plugins: [
            alias({
                entries: [{ find: "./crypto/crypto.node", replacement: "./crypto/crypto.browser" }]
            }),
            typescript({
                tsconfig: "./build.tsconfig.json"
            }),
            nodePolyfills(),
            cleanup({ comments: "jsdoc" })
        ]
    },
    {
        input: "src/index.ts",
        output: [
            {
                dir: "./dist/lib.commonjs",
                format: "cjs",
                banner,
                preserveModules: true,
                entryFileNames: "[name].cjs"
            },
            { dir: "./dist/lib.esm", format: "es", banner, preserveModules: true }
        ],
        external: [...Object.keys(pkg.dependencies), "crypto", "node:fs", "node:fs/promises", "node:path", "node:os"],
        plugins: [typescript({ tsconfig: "./build.tsconfig.json" }), cleanup({ comments: "jsdoc" })]
    },
    {
        input: "src/index.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        plugins: [dts()]
    },
    {
        input: "src/error-handlers.ts",
        output: [{ file: "dist/error-handlers.d.ts", format: "es" }],
        plugins: [dts()]
    },
    {
        input: "src/type-checks.ts",
        output: [{ file: "dist/type-checks.d.ts", format: "es" }],
        plugins: [dts()]
    },
    {
        input: "src/conversions.ts",
        output: [{ file: "dist/conversions.d.ts", format: "es" }],
        plugins: [dts()]
    },
    {
        input: "src/proof-packing.ts",
        output: [{ file: "dist/proof-packing.d.ts", format: "es" }],
        plugins: [dts()]
    },
    {
        input: "src/scalar.ts",
        output: [{ file: "dist/scalar.d.ts", format: "es" }],
        plugins: [dts()]
    },
    {
        input: "src/f1-field.ts",
        output: [{ file: "dist/f1-field.d.ts", format: "es" }],
        plugins: [dts()]
    }
]
