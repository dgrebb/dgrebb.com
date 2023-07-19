Welcome, dear visitor! We appreciate your presence here and would like to take a moment to acquaint you with our Privacy Policy. It's a document that sheds light on how we handle your personal information with utmost care when you use this website and its related services.

By accessing or using this website, you're happily agreeing to the terms laid out in this Privacy Policy. However, if you don't find these terms amusing or to your liking, we kindly request that you refrain from using this website or providing any personal information.

## Information We Collect

1. **Personal Information**: Rest assured, we don't collect personal details apart from browser and system information. We've gone to great lengths to remove any personally identifiable information from our Analytics and Error Logging tools (more on those below). This includes visitors' IP addresses and even the fancy-sounding `server_name`, which refers to your computer's network name.

   1. **[Plausible Analytics](https://plausible.io)** is our trusty sidekick for keeping track of pageviews and counting visitors. You might enjoy checking out the company's [delightful post about privacy policies](https://plausible.io/blog/privacy-policy-page#privacy-policy-examples), which inspired most of this document. For more specific details about Plausible's privacy practices, please see the [Third-Party Services](#third-party-services) section below.

   2. **[Sentry.io](https://www.sentry.io)** comes to our rescue when it comes to capturing errors on both the client (browser) and server (500s, 400s, and 300s). Sentry helps diagnose problems with this site by capturing browser and system information. It even allows us to "playback" user interactions on the site, which is quite handy for figuring out broken code or user experience blunders.

    Now, here's the thing: Sentry, by default, logs IP addresses. But fear not! We scrub this data before it reaches the sentry.io services and servers. The JavaScript responsible for this scrubbing is cleverly hidden away from evident view on main dgrebb.com pages. However, you can [view the source](https://www.wikihow.com/View-Source-Code) of our static [404 page](/404.html). In in the `<head>` (look for the `<script>` tag with `id="four-ohhhhh-four"`). Go ahead, take a peek:

    ```javascript
    beforeSend(event) {
      if (event.user) {
        delete event.user.ip;
      }
      if (event.server_name) {
        delete event.server_name;
      }
    }
    ```

    Despite our diligent data scrubbing efforts, please note that Sentry's servers will log the requesting IP address when a client (that's your browser) loads JavaScript from their servers. For more details about Sentry's privacy practices, please refer to the [Third-Party Services](#third-party-services) section.

2. **Usage Information**: We may also collect certain non-personally identifiable information ("Usage Information") automatically when you grace us with your presence at dgrebb.com. This includes your browser type, operating system, referring website, pages you visit, and the glorious timestamp of your visit.

## Use of Cookies

1. **No cookies here, and never will be!** If, by some freakish occurrence, you encounter a cookie on this site, please alert us immediately by sending an email to privacy [at] dgrebb.com. We shall take swift action!

### Cookies and Embedded Content (Videos)

1. We do our best to sandbox content embedded on this site. This is the best way we can help prevent third-parties adding unneeded cookies to your browser. _*However*_, if you do see cookies from other websites while browsing this one, there is nothing we can do (at this time).

## How We Use Your Information

1. **Personal Information**: Everything we collect remains anonymous and is anonymized before being sent to our dear friends, the third-party services like Plausible and Sentry. In simpler terms, we may know the type of browser and operating system you use to access dgrebb.com, but we're unable to trace those details back to a specific IP address, MAC address, email address, mailing address, or anything remotely identifying.

2. **Usage Information**: We merrily review Usage Information to analyze trends, administer the website, track users' movements, and gather anonymous geo-location information for aggregate use. This information helps us improve the website, monitor its performance, and enhance the overall user experience. We believe in giving our users an experience as smooth as freshly churned butter.

## Third-Party Services

1. **Plausible Analytics**: We rely on Plausible Analytics, a privacy-focused web analytics tool that collects and analyzes Usage Information. Plausible Analytics doesn't use cookies and doesn't collect any personally identifiable information. The information they gather is stored on their own servers, and it's all subject to their privacy policy. To learn more about Plausible Analytics' data practices, we encourage you to visit [their website](https://plausible.io) and dive into their [privacy policy](https://plausible.io/privacy).

2. **Sentry.io**: Ah, Sentry.io, our trusted ally in identifying and fixing errors while improving our website's performance. Sentry.io may collect certain technical information, including your IP address, browser details, and device information. The information they gather is stored on their servers, which they guard with great diligence. To learn more about Sentry.io's data practices, please visit [their website](https://sentry.io/) and cozy up with their [privacy policy](https://sentry.io/privacy/).

If you're feeling adventurous, you can find Sentry's entire collection of legal documents [on their site](https://sentry.io/legal/).

## Data Security

We take reasonable measures to protect the personal information we collect. However, let's be honest, no security measures are perfect or impenetrable. We can't promise you an impenetrable fortress, but we assure you that we're doing our best to keep your personal information safe and sound.

## Disclosure of Information

There may come a time when we need to disclose your Personal Information or Usage Information to third parties. This would only occur if required by law or when we firmly believe that such disclosure is necessary to protect our rights, comply with a judicial proceeding, court order, or legal process served upon us, or investigate suspected or actual fraudulent or illegal activities. We hope that day never comes, but it's good to be prepared.

## Children's Privacy

Please note that our website is not intended for children under the age of 13. We don't knowingly collect personal information from children under the age of 13. If you're a parent or guardian and believe that we may have inadvertently collected personal information from your child, please contact us at privacy [at] dgrebb.com. We'll promptly remove any such information, as we certainly don't want to get in trouble with the little ones.

## Changes to this Privacy Policy

We reserve the right to update or modify this Privacy Policy at any time. The most recent version will be posted on this page, with the effective date proudly displayed at the top. By continuing to use this website after any changes to the Privacy Policy, you're embracing the updated terms with open arms.

## Contact

If you have any questions, concerns, or requests regarding this Privacy Policy, don't hesitate to reach out to us at privacy [at] dgrebb.com. We're here to listen, assist, and make you smile.

By using this website, you acknowledge that you've read and understood this Privacy Policy, and you wholeheartedly consent to the collection, use, and disclosure of your information as described herein. Now go forth and explore the wonders of dgrebb.com!