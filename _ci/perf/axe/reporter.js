import { createHtmlReport } from "axe-html-reporter";

(() => {
  // creates html report with the default name `accessibilityReport.html` file
  createHtmlReport({ results: "AxeResults" }); // full AxeResults object
  // creates html report with the default name `accessibilityReport.html` file and all supported AxeResults values
  createHtmlReport({ results: { violations: "Result[]" } }); // passing only violations from axe.run output
  // creates html report with the default name `accessibilityReport.html` file and adds url and projectKey
  createHtmlReport({
    results: "AxeResults",
    options: { projectKey: "JIRA_PROJECT_KEY" },
  });
  // creates html report with the name `exampleReport.html` in 'axe-reports' directory and adds projectKey to the header
  createHtmlReport({
    results: "AxeResults",
    options: {
      projectKey: "JIRA_PROJECT_KEY",
      outputDir: "axe-reports",
      reportFileName: "exampleReport.html",
    },
  });
  // creates html report with all optional parameters, saving the report into 'docs' directory with report file name 'index.html'
  const customSummary = `Test Case: Full page analysis
    <br>Steps:</br>
    <ol style="margin: 0">
    <li>Open https://dequeuniversity.com/demo/mars/</li>
    <li>Analyze full page with all rules enabled</li>
    </ol>`;
  createHtmlReport({
    results: "AxeResults",
    options: {
      projectKey: "DEQUE",
      customSummary,
      outputDir: "docs",
      reportFileName: "index.html",
    },
  });
})();
