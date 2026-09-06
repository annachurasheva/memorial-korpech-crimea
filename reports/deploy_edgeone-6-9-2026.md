===install===
16:40:28.079 
16:40:28.080 Running "edgeone makers ci"
16:40:30.390 
16:40:30.401 
16:40:30.411 
16:40:30.555 
16:40:30.555 Switching node version
16:40:31.236 Now, we're on node version v24.5.0 (npm 11.5.1)
16:40:35.121 [CI][dp1c3jlyhazu] ✓ Setting up environment completed in 7.37s
16:40:35.241 
16:40:35.242 Running "edgeone makers build"
16:40:37.555 [builder] InstallCommand: pnpm install
16:40:37.555 [builder] Using shell: sh with args: -c pnpm install
16:40:40.503 Lockfile is up to date, resolution step is skipped
16:40:40.568 Progress: resolved 1, reused 0, downloaded 0, added 0
16:40:40.721 Packages: +896
16:40:41.571 Progress: resolved 896, reused 0, downloaded 238, added 236
16:40:42.569 Progress: resolved 896, reused 0, downloaded 415, added 415
16:40:43.569 Progress: resolved 896, reused 0, downloaded 729, added 728
16:40:44.571 Progress: resolved 896, reused 0, downloaded 895, added 895
16:40:45.396 Progress: resolved 896, reused 0, downloaded 896, added 896, done
16:40:45.877 .../esbuild@0.27.7/node_modules/esbuild postinstall$ node install.js
16:40:45.878 .../node_modules/simple-git-hooks postinstall$ node ./postinstall.js
16:40:45.880 .../sharp@0.34.5/node_modules/sharp install$ node install/check.js || npm run build
16:40:47.184 .../esbuild@0.27.7/node_modules/esbuild postinstall: Done
16:40:47.609 .../node_modules/simple-git-hooks postinstall: [INFO] Successfully set the pre-commit with command: pnpm lint-staged
16:40:47.631 .../sharp@0.34.5/node_modules/sharp install: Done
16:40:49.236 .../node_modules/simple-git-hooks postinstall: Done
16:40:49.330 dependencies:
16:40:49.330 + @astrojs/mdx 5.0.3
16:40:49.331 + @astrojs/partytown 2.1.6
16:40:49.331 + @astrojs/sitemap 3.7.2
16:40:49.331 + @waline/client 3.13.0
16:40:49.331 + astro 6.1.5
16:40:49.331 + astro-compress 2.4.1
16:40:49.331 + astro-og-canvas 0.11.0
16:40:49.331 + canvaskit-wasm 0.41.1
16:40:49.331 + feed 5.2.0
16:40:49.331 + katex 0.16.45
16:40:49.331 + lite-youtube-embed 0.3.4
16:40:49.331 + markdown-it 14.1.1
16:40:49.331 + mdast-util-to-string 4.0.0
16:40:49.331 + mermaid 11.14.0
16:40:49.331 + node-html-parser 7.1.0
16:40:49.331 + reading-time 1.5.0
16:40:49.331 + rehype-katex 7.0.1
16:40:49.332 + rehype-mermaid 3.0.0
16:40:49.332 + rehype-slug 6.0.0
16:40:49.332 + remark-directive 4.0.0
16:40:49.332 + remark-math 6.0.0
16:40:49.332 + sanitize-html 2.17.2
16:40:49.332 + sharp 0.34.5
16:40:49.332 + twikoo 1.7.7
16:40:49.332 + unist-util-visit 5.1.0
16:40:49.332 devDependencies:
16:40:49.332 + @antfu/eslint-config 8.1.1
16:40:49.332 + @astrojs/check 0.9.8
16:40:49.332 + @types/markdown-it 14.1.2
16:40:49.332 + @types/node 25.6.0
16:40:49.332 + @types/sanitize-html 2.16.1
16:40:49.332 + @unocss/astro 66.6.8
16:40:49.332 + @unocss/eslint-plugin 66.6.8
16:40:49.332 + @unocss/preset-attributify 66.6.8
16:40:49.332 + @unocss/reset 66.6.8
16:40:49.333 + astro-eslint-parser 1.4.0
16:40:49.333 + autocorrect-node 2.14.0
16:40:49.333 + eslint 10.2.0
16:40:49.333 + eslint-plugin-astro 1.7.0
16:40:49.333 + fast-glob 3.3.3
16:40:49.333 + lint-staged 16.4.0
16:40:49.333 + playwright 1.59.1
16:40:49.333 + simple-git-hooks 2.13.1
16:40:49.333 + tsx 4.21.0
16:40:49.333 + typescript 6.0.2
16:40:49.333 + unocss 66.6.8
16:40:49.333 + unocss-preset-theme 0.14.1
16:40:49.366 Done in 9.3s using pnpm v10.33.0
16:40:49.468 [CI][dp1c3jlyhazu] ✓ Install dependencies completed in 11.91s
===build===
16:40:49.468 > Start validating the configuration file:
16:40:49.471 End validating!
16:40:49.471 getTefConfigMeta time 4
16:40:49.475 [plugins] Loaded internal plugin
16:40:49.476 resolvePlugins time 4ms
16:40:49.476 🔍 [Logger Plugin] Pre-build hook triggered
16:40:49.477 📂 Working directory: /dev/shm/repo/memorial-korpech-crimea-dp1c3jlyhazu
16:40:49.478 decideBuilders time 1ms
16:40:49.480 [StaticAssetsBuilder] Start to execute...
16:40:49.481 [StaticAssetsBuilder] DescribeFramework time: 2ms
16:40:49.482 [StaticAssetsBuilder] BuildScript: pnpm build
16:40:49.484 [builder] Using shell: sh with args: -c pnpm build
16:40:51.077 > astro-blog-donor@1.0.0 build /dev/shm/repo/memorial-korpech-crimea-dp1c3jlyhazu
16:40:51.078 > astro check && astro build && pnpm apply-lqip
16:40:54.586 21:40:54 [content] Syncing content
16:40:54.699 21:40:54 [content] Synced content
16:40:54.700 21:40:54 [types] Generated 973ms
16:40:54.708 21:40:54 [check] Getting diagnostics for Astro files in /dev/shm/repo/memorial-korpech-crimea-dp1c3jlyhazu...
16:41:00.069 Result (59 files): 
16:41:00.070 - 0 errors
16:41:00.070 - 0 warnings
16:41:00.070 - 0 hints
16:41:00.070 
16:41:02.663 21:41:02 [content] Syncing content
16:41:02.674 21:41:02 [content] Synced content
16:41:02.675 21:41:02 [types] Generated 542ms
16:41:02.676 21:41:02 [build] output: "static"
16:41:02.676 21:41:02 [build] mode: "static"
16:41:02.676 21:41:02 [build] directory: /dev/shm/repo/memorial-korpech-crimea-dp1c3jlyhazu/dist/
16:41:02.676 21:41:02 [build] Collecting build info...
16:41:02.676 21:41:02 [build] ✓ Completed in 844ms.
16:41:02.678 21:41:02 [build] Building static entrypoints...
16:41:05.119 21:41:05 [vite] ✓ built in 2.39s
16:41:20.831 21:41:20 [vite] ✓ built in 15.71s
16:41:20.841 21:41:20 [build] Rearranging server assets...
16:41:20.868  generating static routes 
16:41:20.962 21:41:20   ├─ /404.html (+16ms) 
16:41:20.963 21:41:20   ├─ /og/index.png/[astro-og-canvas] Loading ./public/fonts/NotoSansSC-Bold.otf
16:41:20.982 [astro-og-canvas] Loading ./public/fonts/NotoSansSC-Regular.otf
16:41:21.165 [astro-og-canvas] Loaded 1 font families:
16:41:21.165 Noto Sans SC
16:41:21.600  (+638ms) 
16:41:21.662 21:41:21   ├─ /og/donor-stub.png/ (+62ms) 
16:41:21.664 21:41:21   ├─ /robots.txt (+2ms) 
16:41:21.668 21:41:21   ├─ /about/index.html (+4ms) 
16:41:21.671 21:41:21   ├─ /en/about/index.html (+3ms) 
16:41:21.673 21:41:21   ├─ /es/about/index.html (+3ms) 
16:41:21.676 21:41:21   ├─ /ja/about/index.html (+2ms) 
16:41:21.678 21:41:21   ├─ /zh/about/index.html (+2ms) 
16:41:21.680 21:41:21   ├─ /zh-tw/about/index.html (+2ms) 
16:41:21.690 21:41:21   ├─ /atom.xml/ (+10ms) 
16:41:21.691 21:41:21   ├─ /en/atom.xml/ (+1ms) 
16:41:21.692 21:41:21   ├─ /es/atom.xml/ (+1ms) 
16:41:21.693 21:41:21   ├─ /ja/atom.xml/ (+1ms) 
16:41:21.694 21:41:21   ├─ /zh/atom.xml/ (+1ms) 
16:41:21.695 21:41:21   ├─ /zh-tw/atom.xml/ (+1ms) 
16:41:21.698 21:41:21   ├─ /posts/donor-stub/index.html (+3ms) 
16:41:21.703 21:41:21   ├─ /rss.xml/ (+2ms) 
16:41:21.703 21:41:21   ├─ /en/rss.xml/ (+1ms) 
16:41:21.703 21:41:21   ├─ /es/rss.xml/ (+1ms) 
16:41:21.704 21:41:21   ├─ /ja/rss.xml/ (+1ms) 
16:41:21.705 21:41:21   ├─ /zh/rss.xml/ (+1ms) 
16:41:21.705 21:41:21   ├─ /zh-tw/rss.xml/ (+1ms) 
16:41:21.709 21:41:21   ├─ /tags/donor/index.html (+3ms) 
16:41:21.711 21:41:21   ├─ /tags/index.html (+2ms) 
16:41:21.712 21:41:21   ├─ /en/tags/index.html (+1ms) 
16:41:21.714 21:41:21   ├─ /es/tags/index.html (+1ms) 
16:41:21.715 21:41:21   ├─ /ja/tags/index.html (+1ms) 
16:41:21.716 21:41:21   ├─ /zh/tags/index.html (+1ms) 
16:41:21.718 21:41:21   ├─ /zh-tw/tags/index.html (+1ms) 
16:41:21.720 21:41:21   ├─ /index.html (+2ms) 
16:41:21.721 21:41:21   ├─ /en/index.html (+1ms) 
16:41:21.723 21:41:21   ├─ /es/index.html (+1ms) 
16:41:21.724 21:41:21   ├─ /ja/index.html (+1ms) 
16:41:21.725 21:41:21   ├─ /zh/index.html (+1ms) 
16:41:21.727 21:41:21   ├─ /zh-tw/index.html (+1ms) 
16:41:21.727 21:41:21 ✓ Completed in 884ms.
16:41:21.727 
16:41:21.729 21:41:21 [build] ✓ Completed in 19.05s.
16:41:21.740 21:41:21 [@astrojs/sitemap] `sitemap-index.xml` created at `dist`
16:41:21.862 (-50 Bytes)	0.14% reduction in //dist/_astro/twikoo.CRMuMhRA.css
16:41:21.862 (-1.34 KB)	19.43% reduction in //dist/giscus/theme-dark.css
16:41:21.862 (-66 Bytes)	0.23% reduction in //dist/_astro/katex.min.HM2DiD67.css
16:41:21.862 (-1.34 KB)	19.15% reduction in //dist/giscus/theme-light.css
16:41:21.862 (-51 Bytes)	0.23% reduction in //dist/_astro/waline.DGqMuvjt.css
16:41:21.863 (-503 Bytes)	0.40% reduction in //dist/_astro/Layout.6kZfTtuX.css
16:41:21.863 ✓ Successfully compressed a total of 6 CSS files for 3.34 KB.
16:41:23.496 (-2.95 KB)	11.28% reduction in //dist/index.html
16:41:23.497 (-2.41 KB)	10.21% reduction in //dist/about/index.html
16:41:23.497 (-2.36 KB)	11.51% reduction in //dist/ja/index.html
16:41:23.497 (-2.37 KB)	11.31% reduction in //dist/404.html
16:41:23.498 (-2.36 KB)	11.51% reduction in //dist/en/index.html
16:41:23.498 (-2.37 KB)	11.28% reduction in //dist/tags/index.html
16:41:23.498 (-2.36 KB)	11.51% reduction in //dist/zh/index.html
16:41:23.498 (-2.36 KB)	11.50% reduction in //dist/es/index.html
16:41:23.498 (-2.37 KB)	11.50% reduction in //dist/en/about/index.html
16:41:23.498 (-2.36 KB)	11.49% reduction in //dist/zh-tw/index.html
16:41:23.498 (-2.37 KB)	11.50% reduction in //dist/es/about/index.html
16:41:23.498 (-2.36 KB)	11.46% reduction in //dist/es/tags/index.html
16:41:23.498 (-2.36 KB)	11.47% reduction in //dist/en/tags/index.html
16:41:23.498 (-2.37 KB)	11.50% reduction in //dist/ja/about/index.html
16:41:23.498 (-3.24 KB)	11.49% reduction in //dist/posts/donor-stub/index.html
16:41:23.499 (-2.96 KB)	11.17% reduction in //dist/tags/donor/index.html
16:41:23.499 (-2.36 KB)	11.47% reduction in //dist/ja/tags/index.html
16:41:23.499 (-2.37 KB)	11.50% reduction in //dist/zh/about/index.html
16:41:23.499 (-2.37 KB)	11.48% reduction in //dist/zh-tw/about/index.html
16:41:23.499 (-2.36 KB)	11.45% reduction in //dist/zh-tw/tags/index.html
16:41:23.499 (-2.36 KB)	11.47% reduction in //dist/zh/tags/index.html
16:41:23.499 ✓ Successfully compressed a total of 21 HTML files for 51.76 KB.
16:41:29.971 21:41:29 [build] Waiting for integration "astro-compress", hook "astro:build:done"...
16:41:35.572 (-65 Bytes)	0.77% reduction in //dist/_astro/_baseUniq.BSBLx-YN.js
16:41:35.573 (-21 Bytes)	0.61% reduction in //dist/_astro/arc.DrPLtXib.js
16:41:35.573 (-1 Bytes)	0.44% reduction in //dist/_astro/chunk-4BX2VUAB.CubtBRpT.js
16:41:35.573 (-1.5 KB)	2.18% reduction in //dist/_astro/blockDiagram-DXYQGD6D.L6oi0c3i.js
16:41:35.573 (-813 Bytes)	1.16% reduction in //dist/_astro/c4Diagram-AHTNJAMY.GwkezlZG.js
16:41:35.574 (-498 Bytes)	1.05% reduction in //dist/_astro/chunk-4TB4RGXK.r6YYE0VR.js
16:41:35.574 (-1 Bytes)	0.87% reduction in //dist/_astro/channel.CIh17pcu.js
16:41:35.574 (-1 Bytes)	0.20% reduction in //dist/_astro/chunk-EDXVE4YY.DPJ-x4r2.js
16:41:35.574 (-1 Bytes)	0.34% reduction in //dist/_astro/classDiagram-6PBFFD2Q.BS4wBnMJ.js
16:41:35.574 (-1 Bytes)	0.51% reduction in //dist/_astro/chunk-QZHKN3VN.BDW-yCMQ.js
16:41:35.574 (-1 Bytes)	0.05% reduction in //dist/_astro/chunk-YZCP3GAM.BWRzgo5n.js
16:41:35.575 (-1 Bytes)	0.34% reduction in //dist/_astro/classDiagram-v2-HSJHXN6E.BS4wBnMJ.js
16:41:35.575 (-7 Bytes)	2.98% reduction in //dist/_astro/chunk-55IACEB6.BskWCdC-.js
16:41:35.575 (-575 Bytes)	1.55% reduction in //dist/_astro/chunk-OYMX7WX6.Bh_jaNEZ.js
16:41:35.575 (-28 Bytes)	0.60% reduction in //dist/_astro/defaultLocale.DX6XiGOO.js
16:41:35.575 (-19 Bytes)	0.17% reduction in //dist/_astro/dagre-KV5264BT.DbYU7o7D.js
16:41:35.575 (-1 Bytes)	1.09% reduction in //dist/_astro/clone.DEFvPfvl.js
16:41:35.575 (-965 Bytes)	1.18% reduction in //dist/_astro/cose-bilkent-S5V4N54A.C6UZmt7P.js
16:41:35.575 (-112 Bytes)	0.71% reduction in //dist/_astro/diagram-G4DWMVQ6.C9cIboCV.js
16:41:35.576 (-619 Bytes)	2.31% reduction in //dist/_astro/erDiagram-SMLLAGMA.BEM3wOXv.js
16:41:35.576 (-18 Bytes)	0.19% reduction in //dist/_astro/graph.LOH7pLxN.js
16:41:35.576 (-1.03 KB)	1.75% reduction in //dist/_astro/flowDiagram-DWJPFMVM.C-TOUttO.js
16:41:35.576 (-24 Bytes)	1.05% reduction in //dist/_astro/index.D7gwdK6Y.js
16:41:35.576 (-7 Bytes)	4.76% reduction in //dist/_astro/init.Gi6I4Gst.js
16:41:35.577 (-79 Bytes)	0.45% reduction in //dist/_astro/ishikawaDiagram-UXIWVN3A.U9vSYxqK.js
16:41:35.577 (-490 Bytes)	2.42% reduction in //dist/_astro/kanban-definition-6JOO6SKY.BQmPspzt.js
16:41:35.577 (-71 Bytes)	0.30% reduction in //dist/_astro/journeyDiagram-VCZTEJTY.iJzM7KnK.js
16:41:35.577 (-491 Bytes)	0.71% reduction in //dist/_astro/ganttDiagram-T4ZO3ILL.CLrP31si.js
16:41:35.577 (-2.83 KB)	1.94% reduction in //dist/_astro/architectureDiagram-Q4EWVU46.CxsgOXDw.js
16:41:35.578 (-229 Bytes)	0.78% reduction in //dist/_astro/layout.BvCfcesD.js
16:41:35.578 (-25 Bytes)	0.44% reduction in //dist/_astro/linear.zkZWyWAc.js
16:41:35.578 (-1 Bytes)	0.03% reduction in //dist/_astro/lite-yt-embed.DRTAn-6M.js
16:41:35.578 (-16 Bytes)	2.69% reduction in //dist/_astro/min.dQcnc-py.js
16:41:35.578 (-1 Bytes)	2.50% reduction in //dist/_astro/page.DlJ3fynU.js
16:41:35.581 (-1 Bytes)	0.08% reduction in //dist/_astro/ordinal.BYWQX77i.js
16:41:35.582 (-34 Bytes)	0.65% reduction in //dist/_astro/pieDiagram-DEJITSTG.BJqi_gjj.js
16:41:35.582 (-273 Bytes)	0.88% reduction in //dist/_astro/requirementDiagram-MS252O5E.Cx33B1ea.js
16:41:35.582 (-173 Bytes)	0.78% reduction in //dist/_astro/sankeyDiagram-XADWPNL6.Bx6heFAr.js
16:41:35.582 (-411 Bytes)	1.22% reduction in //dist/_astro/quadrantDiagram-34T5L4WZ.DGJTDuHp.js
16:41:35.582 (-463 Bytes)	1.98% reduction in //dist/_astro/mindmap-definition-QFDTVHPH.D-6zClhd.js
16:41:35.582 (-23 Bytes)	0.22% reduction in //dist/_astro/stateDiagram-FHFEXIEX.D0l67BP-.js
16:41:35.582 (-1.44 KB)	1.27% reduction in //dist/_astro/sequenceDiagram-FGHM5R23.DFXVe_D6.js
16:41:35.582 (-1 Bytes)	0.34% reduction in //dist/_astro/stateDiagram-v2-QKLJ7IA2.CiVYGWV7.js
16:41:35.582 (-117 Bytes)	0.38% reduction in //dist/_astro/timeline-definition-GMOUNBTQ.Cp05IB8Z.js
16:41:35.582 (-7.83 KB)	1.82% reduction in //dist/_astro/cytoscape.esm.DkOyvmE4.js
16:41:35.583 (-468 Bytes)	0.18% reduction in //dist/_astro/katex.DHMw6HUq.js
16:41:35.583 (-69 Bytes)	0.29% reduction in //dist/_astro/wardleyDiagram-NUSXRM2D.D5_2Q9sF.js
16:41:35.583 (-364 Bytes)	0.90% reduction in //dist/_astro/xychartDiagram-5P7HB3ND.DGb-1UL-.js
16:41:35.583 (-329 Bytes)	0.79% reduction in //dist/_astro/vennDiagram-DHZGUBPP.SFbR7u2d.js
16:41:35.583 (-1.27 KB)	0.68% reduction in //dist/_astro/waline.CYSBCvn_.js
16:41:35.583 (-46 Bytes)	0.52% reduction in //dist/~partytown/partytown-media.js
16:41:35.583 (-49 Bytes)	0.11% reduction in //dist/~partytown/partytown-sw.js
16:41:35.583 (-95 Bytes)	0.23% reduction in //dist/~partytown/partytown-atomics.js
16:41:35.583 (-882 Bytes)	28.45% reduction in //dist/~partytown/partytown.js
16:41:35.583 (-4.91 KB)	1.02% reduction in //dist/_astro/wardley-RL74JXVD.C164j_W1.js
16:41:35.583 (-3.01 KB)	0.52% reduction in //dist/_astro/twikoo.nocss.BB7vitaB.js
16:41:35.583 (-1.98 KB)	0.34% reduction in //dist/_astro/mermaid.core.CFYjPDOT.js
16:41:35.583 ✓ Successfully compressed a total of 57 JavaScript files for 34.58 KB.
16:41:35.589 21:41:35 [build] 21 page(s) built in 33.76s
16:41:35.590 21:41:35 [build] Complete!
16:41:36.260 > astro-blog-donor@1.0.0 apply-lqip /dev/shm/repo/memorial-korpech-crimea-dp1c3jlyhazu
16:41:36.261 > tsx scripts/apply-lqip.ts
16:41:38.143 🔍 Starting LQIP processing...
16:41:38.161 ✨ No images found to process
16:41:38.275 [StaticAssetsBuilder] ✓ Build project completed in 48.79s
16:41:38.277 [StaticAssetsBuilder] BuildResultInfos: OutputDir:dist, Source:/dev/shm/repo/memorial-korpech-crimea-dp1c3jlyhazu/dist, Target:/dev/shm/repo/memorial-korpech-crimea-dp1c3jlyhazu/.edgeone/assets
16:41:38.310 [StaticAssetsBuilder] MoveProjectToAssets time: 35ms
16:41:38.313 build time 48834ms
16:41:38.313 ✨ [Logger Plugin] Build completed
16:41:38.313 ⏱️  Build finished.
16:41:38.314 onBuild time 0ms
16:41:38.314 onPostBuild time 0ms
16:41:38.314 postBuildHook time 0ms
16:41:38.314 Build completed
16:41:42.440 
16:41:42.441 > Start validating the configuration file:
16:41:42.443 none error in configuration file
16:41:42.443 End validating!
16:41:42.443 
16:41:42.444 [cli] No server-handler detected, generating routes.json for pure project...
16:41:42.446 [cli] ✅ Generated routes.json for pure project
16:41:42.447 [injectHooks] bundlePath: /dev/shm/repo/memorial-korpech-crimea-dp1c3jlyhazu/.edgeone/edge-functions/index.js
16:41:42.447 [injectHooks] bundle file not found, skip
16:41:42.863 [CI][dp1c3jlyhazu] ✓ CLI Building completed in 67.64s
