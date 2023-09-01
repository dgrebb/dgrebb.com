#!/bin/bash

ROOT=$1
OUTPUT="$1/index.html"
DATE=$(TZ=America/New_York date +%y.%m.%d)
TIME=$(TZ=America/New_York date +%H:%M:%S)

echo "
<!DOCTYPE html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
    <title>Lighthouse Reports</title>
    <head>
        <title>
            Lighthouse Reports
        </title>
        <style>
            body {
                background-color: rgb(33	33	33);
                color: rgb(216, 255, 224);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                font-family: Helvetica;
                margin: 0;
                padding: 0;
            }
            nav {
                width: 100%;
                height: 32px;
                background-color: black;
                display: flex;
                border-bottom: 1px solid rgb(66, 66, 66);
                padding: 0 8px;
                box-sizing: border-box;
            }
            nav a {
                color: white;
                opacity: 0.77;
                font-size: 12px;
                margin: 0 8px;
                display: inline-block;
                vertical-align: middle;
                text-decoration: none;
                align-self: center;
                transition-property: opacity;
                transition-duration: 333ms;
            }
            nav a:hover {
                opacity: 1;
            }
            nav svg {
                height: 24px;
                align-self: center;
            }
            main {
                flex-grow: 1;
                margin: 0;
                padding: 0;
                width: 50%;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            main h1 {
                margin-bottom: 1rem;
            }
            main h2 {
                font-weight: lighter;
                margin: 0 0 0.5rem 0;
            }
            main ul {
                display: flex;
                width: 100%;
                margin: 0;
                padding: 0;
                list-style-type: none;
                flex-wrap: wrap;
                justify-content: center;
            }
            main li {
                margin: 0 0.33rem;
            }
            main a {
                color: rgb(144, 229, 144);
                text-decoration: none;
                margin: 0.5rem 0;
                padding: 1rem 2rem;
                background-color: rgb(8, 63, 8);
                border: thin solid rgb(0, 102, 0);
                transition-property: background-color, color;
                transition-duration: 333ms;
                display: inline-block;
                text-transform: capitalize;
                display: flex;
            }
            main a[href*='mobile'] {
                background-color: darkblue;
                border-color: blue;
            }
            main a[href*='mobile']:hover,
            main a[href*='mobile']:focus {
                background-color: blue;
                border-color: cornflowerblue;
            }
            main a:hover,
            main a:focus {
                color: rgb(221, 255, 221);
                background-color: rgb(10, 69, 10);
            }
            main a span {
                max-width: 33ch;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: inline-block;
            }
        </style>
    </head>
<body>
<nav>
  <svg
    class=\"lh-topbar__logo\"
    role=\"img\"
    title=\"Lighthouse logo\"
    fill=\"none\"
    xmlns=\"http://www.w3.org/2000/svg\"
    viewBox=\"0 0 48 48\"
  >
    <path d=\"m14 7 10-7 10 7v10h5v7h-5l5 24H9l5-24H9v-7h5V7Z\" fill=\"#F63\"
    ></path>
    <path
      d=\"M31.561 24H14l-1.689 8.105L31.561 24ZM18.983 48H9l1.022-4.907L35.723 32.27l1.663 7.98L18.983 48Z\"
      fill=\"#FFA385\"
    ></path> <path fill=\"#FF3\" d=\"M20.5 10h7v7h-7z\"></path>
  </svg>
  <a href=\"/\">Reports Home</a>
</nav>
" >$OUTPUT

echo "Dropping anchor and stepping ashore with these files in tow."
echo "<main>" >>$OUTPUT
echo "<h1>Lighthouse Runs</h1>" >>$OUTPUT
echo "<h2>$DATE - $TIME ET</h2>" >>$OUTPUT
echo "<ul class=\"test-list\">" >>$OUTPUT
for file in $(find $ROOT -iname "*.html" -maxdepth 1 -mindepth 1 -type f ! -name "index.html" -exec basename {} \; | sort -n); do

    echo $file
    output="${file%report.html}"
    title=$(echo "$output" | sed -E 's/_|-/ /g; s/\b\w/\U&/g; s/ / - /')
    echo $title
    echo "<li>" >>$OUTPUT
    echo "<a href=\"/lighthouse/$file\"><span>${title}</span></a>" >>$OUTPUT
    echo "</li>" >>$OUTPUT

done
echo "</ul>" >>$OUTPUT
echo "</main>" >>$OUTPUT
echo "</body></html>" >>$OUTPUT
