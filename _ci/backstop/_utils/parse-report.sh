#!/bin/bash

DOMAIN=$1
DIR=$2
jq -c -r --arg REPORT_DOMAIN $DOMAIN --arg ENV_DIR $DIR '
  "<table><tr><th align=\"left\">Test</th><th>Viewport</th><th align=\"right\">Mismatch Amount</th></tr>",
  (.tests[] | select(.status | contains("fail")) |
    "<tr><td><a href=\"https://" + $REPORT_DOMAIN + "/backstop/html_report/gh-" + $ENV_DIR + "/index.html#test" + (.pair.testIndex|tostring) + "\" target=\"_blank\">" + .pair.label + "</a></td>",
    "<td align=\"center\">" + .pair.viewportLabel + "</td>",
    "<td align=\"right\">" + .pair.diff.misMatchPercentage + "</td></tr>"
  ),
  "</table>"
' ./bd/bitmaps_test/*/*/report.json
