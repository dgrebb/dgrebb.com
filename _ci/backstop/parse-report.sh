#!/bin/bash

jq -c -r '"<table><tr><th>Test</th><th>Viewport</th><th>Mismatch Amount</th></tr>", (.tests[] | select(.status | contains("fail")) | "<tr><td>" + .pair.label + "</td>", "<td>" + .pair.viewportLabel + "</td>", "<td>" + .pair.diff.misMatchPercentage + "</td></tr>"), "</table>"' ./bd/bitmaps_test/*/*/report.json
