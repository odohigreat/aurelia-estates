# Performance Evidence

## Scope and methodology

These are local Vite production-build measurements at `http://127.0.0.1:4173`, not live Vercel measurements or real-user monitoring. Lighthouse **12.8.2**, Chrome **154.0.8037.98** and Node **24.7.0** ran on the same local macOS workstation. Each route/device profile has three valid sequential runs, with a fresh Chrome profile, storage reset, headless mode and simulated throttling. External fonts/images remained enabled; remote timing can vary.

| Profile | Screen / DPR | Simulated RTT | Throughput | CPU slowdown |
|---|---|---:|---:|---:|
| Mobile | 412 × 823 / 1.75 | 150ms | 1,638.4 kbps | 4× |
| Desktop | 1350 × 940 / 1 | 40ms | 10,240 kbps | 1× |

Final reports were captured on 12 October 2026 UTC. Original baseline, stage-specific raw JSON/HTML reports, failure logs and SHA-256 manifests remain private. Final integrated verification rebuilt identical assets and matched the measured source fingerprint, so no additional measurements were needed. These three-run samples describe this workstation and methodology, not a guarantee for other networks/devices.

## Final medians

FCP, LCP and Speed Index are seconds; TBT is milliseconds; CLS is unitless. Each number is the median across three valid runs, calculated separately per metric.

| Route/profile | Score | FCP | LCP | TBT | CLS | Speed Index |
|---|---:|---:|---:|---:|---:|---:|
| Homepage mobile | 73 | 2.964 | 5.194 | 58.5 | 0.00000 | 4.444 |
| Homepage desktop | 90 | 0.754 | 1.929 | 0.0 | 0.00000 | 1.095 |
| Property mobile | 76 | 3.342 | 4.340 | 82.2 | 0.00000 | 4.658 |
| Property desktop | 94 | 0.752 | 1.508 | 0.0 | 0.00058 | 0.978 |
| Analytics mobile | 87 | 2.940 | 3.037 | 0.0 | 0.00000 | 4.154 |
| Analytics desktop | 97 | 0.770 | 1.160 | 0.0 | 0.00002 | 0.820 |

Final score ranges were homepage **72–73 mobile / 89–92 desktop**, property **74–79 / 93–94**, analytics **87–88 / 97–97**. Medians are rounded for display; raw numeric values remain in private evidence.

## Revision-aware improvements

The original baseline and final builds are different revisions of the uncommitted implementation; these fingerprints are source-file manifest hashes, not Git commit IDs:

- Original baseline: `f5dc09bc9be9705860dd1693b125fb583a8b3ee8c6f970da7a2e83dcb0a5974e`.
- Immediate pre-chunk-change build: `059ee9bbc3c9caa4f75fdbb87aee827f0cd649468b092e508b13e21a9658ccf9`.
- Final measured build: `3f8e3d22a389988a162983be1fe66f6034abf9713ecfd9aa711c46c531a2f44e`.

These identify the measurement-era source, including its then-current documentation. These fingerprints describe the measured builds. Subsequent interface-label revisions have not been remeasured; the reports do not establish performance scores for the current working tree.

| Original baseline → final | Mobile | Desktop |
|---|---|---|
| Homepage performance | 70 → 73 | 87 → 90 |
| Homepage LCP | 5.957 → 5.194s | 2.275 → 1.929s |
| Property performance | 53 → 76 | 68 → 94 |
| Property CLS | .60996 → 0 | .70957 → .00058 |
| Property LCP | 4.661 → 4.340s | 1.773 → 1.508s |
| Analytics performance | 84 → 87 | 97 → 97 |

The property layout fix seeded the existing shared query with already-bundled fixtures, removing the short loading-message-to-full-page displacement. Hero optimisation added responsive source selection and reserved geometry without replacing the photo. The final bundling change removed manual chunk grouping: recursive dependency capture had placed React inside the chart chunk and made chart code an eager homepage dependency.

## Comparable JavaScript loading evidence

The immediate pre-change and final builds were measured separately with all six profiles. Transfer counts include local JavaScript responses loaded during each cold route measurement and response overhead; they are compressed transfer bytes, not decoded bundle size.

| Route (both profiles) | Before transfer | Final transfer | Reduction |
|---|---:|---:|---:|
| Homepage | 272.7 kB | 148.2 kB | 45.7% |
| Property detail | 272.9 kB | 266.1 kB | 2.5% |
| Public analytics | 269.6 kB | 143.5 kB | 46.8% |

Chrome's unthrottled homepage waterfall separately confirmed decoded JavaScript **903.3 → 455.4 kB** and **8 → 10** requests; two additional small shared modules replaced the coarse grouping. The approximately 388 kB decoded / 110 kB transferred former chart file is no longer requested on homepage startup. Charts still load on routes that use them. Public analytics is HTML/CSS, not Recharts.

## Trade-offs and remaining limits

This is not an across-the-board timing improvement. In the immediate pre-chunk-change → final comparison:

- Homepage mobile FCP improved **3.226 → 2.964s**, but LCP was essentially unchanged/slightly higher: **5.165 → 5.194s**. Desktop score median improved 89 → 90; its ranges overlap.
- Property mobile LCP improved **4.785 → 4.340s**, while FCP regressed **3.183 → 3.342s**, TBT **26.5 → 82.2ms**, and Speed Index **4.253 → 4.658s**. Desktop Speed Index rose **.922 → .978s**; score median stayed 94.
- Analytics mobile Speed Index regressed **3.170 → 4.154s**, despite lower FCP/LCP. Desktop score stayed 97; LCP changed **1.151 → 1.160s**.

Mobile homepage LCP remains above five seconds. External font CSS is a measured render blocker, hero discovery depends on React rendering, and network/animation timing contributes variability. No further optimisation is claimed or implemented in this documentation stage.

Two pre-change attempts were replaced because one lost its Chrome connection and one was explicitly incomplete. Their original logs/report remain private. Two other complete reports had CLI cleanup timeouts but no Lighthouse errors/warnings and were retained. No valid slower run was discarded to improve a result. Earlier invalid desktop-profile attempts are retained separately and were excluded from valid desktop medians.

## Curated genuine reports

Only three final mobile HTML reports are proposed for inclusion, approximately 1.28 MB combined. They were checked for personal filesystem paths, account/email identifiers and likely secret patterns, and copied byte-for-byte without altering the embedded Lighthouse result. They contain local test URLs, resource URLs, measurement timestamps and tool/browser metadata. Lighthouse's pre-existing report filmstrip remains part of the genuine report; no new screenshots or videos were made for this evidence package.

| Report | Original run | Individual score | Capture time (UTC) |
|---|---|---:|---|
| [homepage-mobile.report.html](lighthouse/homepage-mobile.report.html) | home-mobile-2 | 73 | 2026-10-12T21:18:20.320Z |
| [property-mobile.report.html](lighthouse/property-mobile.report.html) | property-mobile-3 | 76 | 2026-10-12T21:19:56.488Z |
| [analytics-mobile.report.html](lighthouse/analytics-mobile.report.html) | analytics-mobile-2 | 87 | 2026-10-12T21:21:04.007Z |

Each selected report's score equals its route's three-run median score, but its individual timing values need not equal metric medians. One HTML report cannot reproduce a three-run median or prove a desktop result. All underlying three-run JSON/HTML sets and integrity manifests are retained privately; desktop results above are summaries of those private sets. Additional reports can be reviewed privately if required.

SHA-256 of the unmodified selected HTML files:

```text
c98a0ae138417efecceb3a11971c8eb406a88222b809fc9582c6eb301513e5ac  homepage-mobile.report.html
aa645514603347fccd5e60a0dcf08b339764d54b16b170509274415535bdc33e  property-mobile.report.html
0d62722288900da078a53b734547be4af5fd5ecf7dcca1358755d99199da2301  analytics-mobile.report.html
```

[Code Evidence Guide](CODE_EVIDENCE.md) · [Project README](../../README.md)

## Current Supabase integration checkpoint

The historical results above remain unchanged. They describe the earlier fixture-based application, not the current Supabase-enabled build. The former query-seeding fix is historical; current published-property reads use explicit loading geometry and never seed fixtures as database results.

A new local checkpoint used the existing isolated Lighthouse 12.8.2, Chrome 154.0.8037.98 and Node 24.7.0 at `http://127.0.0.1:4174`, with the same mobile/desktop simulated-throttling profiles. Screenshot trace categories, full-page screenshot collection, filmstrip and final-screenshot audits were disabled to respect the no-screenshots restriction. Consequently **Speed Index and standard performance scores are unavailable** (`NO_SCREENSHOTS`); these runs are timing checks, not complete Lighthouse performance passes.

One complete final timing result per route/profile is shown below. These are single-run values, not medians or ranges. FCP/LCP are seconds, TBT milliseconds and CLS unitless.

| Route/profile | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|
| Homepage mobile | 3.212 | 5.863 | 26.5 | 0.00000 |
| Homepage desktop | 0.975 | 1.798 | 0.0 | 0.00001 |
| Property mobile | 3.178 | 5.293 | 220.0 | 0.00000 |
| Property desktop | 1.098 | 1.588 | 0.0 | 0.00004 |
| Analytics mobile | 3.311 | 3.386 | 2.0 | 0.00000 |
| Analytics desktop | 1.058 | 1.576 | 0.0 | 0.00004 |

Runtime source fingerprint (SHA-256 of the sorted source-file hash manifest): `13b710a41eb68c810fb0a82eb07e75729f86addf3f0a1c481b5c84048c1f02e9`. This hashes `src` and the entry/build/package/deployment configuration; it is not a commit ID. Raw JSON/HTML, exact configurations, source manifest, preliminary attempts, failure logs and integrity hashes remain in private release-QA evidence. Existing curated reports were not replaced.

Initial desktop configuration attempts failed; that tooling configuration was corrected. One preliminary desktop attempt timed out. Final property/analytics attempts also encountered timeout/incomplete/no-paint results; they were retained and explicitly excluded from the table, then retried. Only final reports without runtime errors or incomplete-run warnings supply these values. Their expected screenshot-dependent audit errors remain disclosed. No failing attempt was silently converted to a passing result.

Mobile homepage LCP remains above five seconds; mobile property LCP is also above five seconds, with 220ms TBT in the retained single run. CLS was near zero in all six final timing checks. External images/fonts, initial JavaScript and property-chart execution remain candidates for a focused follow-up. Single runs do not establish a performance improvement or a stable median. Production CDN, callback/hosting behaviour and real-user performance remain unverified.

Measured final mobile diagnostics support a focused performance follow-up: homepage responsive-image audit estimated 256KiB of avoidable transfer; render-blocking audits estimated approximately 1.29s on homepage and 1.57s on analytics. These are Lighthouse estimates, not guaranteed savings. Local JavaScript transfers were about 226.6kB on homepage, 328.2kB on property detail and 200.8kB on analytics. Homepage and public analytics requested no CartesianChart/AreaChart chunks; property details requested both. The property main-thread-work audit reported about 3.1s and script boot-up about 1.7s. No additional image, font or bundling optimisation was applied during this checkpoint.

A subsequent dependency-security review updated Router/PostCSS and compatible transitive packages. Tests and production build passed; no Lighthouse remeasurement was performed for that dependency revision. The timings and source fingerprint above remain evidence of the preceding measured build.

## Final QA image-delivery checkpoint

A focused correction aligns hero `sizes` with its 600/640/620px minimum-height layout and serves responsive centre-cropped Unsplash listing-card variants. Existing CDN crop preferences and non-Unsplash URLs are preserved. Photo selection, image geometry, eager hero priority, lazy card loading, routes, data and financial formulas are unchanged.

Existing isolated Lighthouse 12.8.2 / Chrome 154.0.8037.98 / Node 24.7.0 measured the production preview at port 4174. One final sample per route/profile follows; these are not medians. Screenshot collection remains disabled, so Speed Index and standard performance scores remain unavailable. All six final samples have no page-load runtime errors or warnings, but retain the expected screenshot-dependent audit errors.

| Route/profile | FCP (s) | LCP (s) | TBT (ms) | CLS |
|---|---:|---:|---:|---:|
| Homepage mobile | 2.460 | 5.285 | 301.5 | 0.00000 |
| Homepage desktop | 0.875 | 2.065 | 0.0 | 0.00017 |
| Property mobile | 3.274 | 5.941 | 179.5 | 0.01656 |
| Property desktop | 1.002 | 2.076 | 0.0 | 0.00004 |
| Analytics mobile | 2.275 | 2.580 | 37.0 | 0.00000 |
| Analytics desktop | 0.920 | 1.653 | 0.0 | 0.00004 |

Measured runtime source fingerprint: `8d44e4eebf9a8111de1dbfabbfaba252ef9a7292b791041c404e83448e364855`. Genuine reports, configurations, source manifest and integrity hashes are retained privately in the final-QA evidence set. Existing curated reports were preserved.

An initial post-fix sample transferred 312.4kB of homepage images versus 482.8kB in the earlier pre-fix sample. Estimated avoidable image bytes fell from 261.9kB to 34.4kB. These comparisons use different revisions and single samples; they support reduced over-delivery, not a stable LCP or overall performance-score improvement. Mobile LCP and startup blocking remain follow-up concerns. No font, SDK, chart-chunk or architecture rewrite was made.
