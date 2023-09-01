#!/bin/bash

manifest="[
  {
    "url": "https://treo.sh/",
    "isRepresentativeRun": true,
    "htmlPath": "/Users/lighthouse-ci-action/.lighthouseci/treo_sh-_-2020_07_05_20_37_18.report.html",
    "jsonPath": "/Users/lighthouse-ci-action/.lighthouseci/treo_sh-_-2020_07_05_20_37_18.report.json",
    "summary": { "performance": 0.99, "accessibility": 0.98, "best-practices": 1, "seo": 0.96, "pwa": 0.71 }
  }
]"

echo $manifest

cat $manifest | jq -c -r '"<table><tr><th align=\"left\">Test</th><th align=\"center\">Performance</th><th align=\"center\">Accessibility</th><th align=\"center\">Best Practices</th><th align=\"center\">SEO</th><th align=\"right\">PWA</th></tr>", ([] | "<tr><td>" + .url + "</td>", "<td align=\"center\">" + .summary.performance + "</td>", "<td align=\"center\">" + .summary.accessibility + "</td>", "<td align=\"center\">" + .summary."best-practices" + "</td>", "<td align=\"center\">" + .summary.seo + "</td>", "<td align=\"right\">" + .summary.pwa + "</td></tr>"), "</table>"'
