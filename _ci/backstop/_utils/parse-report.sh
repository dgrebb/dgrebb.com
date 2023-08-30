#!/bin/bash

jq -c -r '"<table><tr><th align=\"left\">Test</th><th>Viewport</th><th>Mismatch Amount</th></tr>", (.tests[] | select(.status | contains("fail")) | "<tr><td><a href=\"" + .pair.url + "\" target=\"_blank\">" + .pair.label + "</a></td>", "<td>" + .pair.viewportLabel + "</td>", "<td>" + .pair.diff.misMatchPercentage + "</td></tr>"), "</table>"' ./bd/bitmaps_test/*/*/report.json
