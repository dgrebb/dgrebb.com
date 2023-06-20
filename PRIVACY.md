## Effective Date: _June 20, 2023_

Thank you for visiting my website. This Privacy Policy explains how I collect, use, and protect your personal information when you use this website and any related services. By accessing or using this website, you agree to the terms of this Privacy Policy. If you do not agree with the terms outlined in this Privacy Policy, please do not use this website or provide any personal information.

## Information I Collect

1. **Personal Information**: Apart from browser and system information, no personal details are collected. I've taken great care in scrubbing all personally-identifiable information from both the Analytics and Error Logging tools used (details below). This includes visitors' IP addresses, which are of no use to me, nor do I condone the collection of.

    1. **Plausible Analytics** is used for pageview and visitor count tracking. See [their delightful post about privacy policies](https://plausible.io/blog/privacy-policy-page#privacy-policy-examples).

    2. **Sentry.io** is used to capture errors on both the client (browser), and server (500s, 400s, and 300s). Sentry allows capturing browser and system information, which can be used to diagnose problems with this site. Sentry also allows a "playback" of user interaction on the site, aiding in further triage of broken code or user experience.

        Sentry, by default, logs IP addresses. I scrub this data before it is delivered to the sentry.io services and servers. The JavaScript performing this scrub is minified away from evident view on main dgrebb.com pages, but can be seen at the bottom of the static [404 page](/404):

        ```javascript
        beforeSend(event) {
            if (event.user) {
                delete event.user.ip
            }
        }
        ```

2. **Usage Information**: I may also collect certain non-personally identifiable information ("Usage Information") automatically when you visit dgrebb.com. This may include your browser type, operating system, referring website, pages you visit, and the date and time of your visit.

## Use of Cookies

1. **I do not and will never use cookies**. Please contact privacy [at] dgrebb.com should you ever encounter a cookie on this site.

## How I Use Your Information

1. **Personal Information**: Nothing collected is identifiable, and anonymized before sent to third-party services like Plausible and Sentry. In simple terms, I may know the type of browser and operating system used to access dgrebb.com, but am unable to associate those details back to a specific IP address, email address, mailing address, etc.

2. **Usage Information**: I may use Usage Information to analyze trends, administer the website, track users' movements, and gather demographic information for aggregate use. This information helps me improve the website, monitor its performance, and enhance the overall user experience.

## Third-Party Services

1. **Plausible Analytics**: I use Plausible Analytics, a privacy-focused web analytics tool, to collect and analyze Usage Information. Plausible Analytics does not use cookies and does not collect any personally identifiable information. The information collected by Plausible Analytics is stored on servers controlled by Plausible Analytics and is subject to their privacy policy. To learn more about Plausible Analytics' data practices, please visit [their website](https://plausible.io) and review their [privacy policy](https://plausible.io/privacy).

2. **Sentry.io**: We use Sentry.io to help us identify and fix errors and improve the performance of our website. Sentry.io may collect certain technical information, including your IP address and information about your browser and device. The information collected by Sentry.io is stored on servers controlled by Sentry.io and is subject to their privacy policy. To learn more about Sentry.io's data practices, please visit [their website](https://sentry.io/) and review their [privacy policy](https://sentry.io/privacy/).

    Sentry's entire collection of legal documents can be [found on their site](https://sentry.io/legal/).

## Data Security

I take reasonable measures to protect the personal information we collect. However, please be aware that no security measures are perfect or impenetrable, and I cannot guarantee the security of your personal information.

## Disclosure of Information

I may disclose your Personal Information or Usage Information to third parties if required by law or when I believe that disclosure is necessary to protect my rights, comply with a judicial proceeding, court order, or legal process served on myself, or investigate suspected or actual fraudulent or illegal activities.

## Children's Privacy

My website is not intended for children under the age of 13. I do not knowingly collect personal information from children under the age of 13. If you are a parent or guardian and believe that I may have inadvertently collected personal information from your child, please contact me at privacy [at] dgrebb.com to request deletion of the information.

## Changes to this Privacy Policy

I reserve the right to update or modify this Privacy Policy at any time. The most recent version of the Privacy Policy will be posted on this page, with the effective date indicated at the top. Your continued use of this website after any changes to this Privacy Policy constitutes your acceptance of the updated terms.

## Contact

If you have any questions, concerns, or requests regarding this Privacy Policy, please contact me at privacy [at] dgrebb.com.

By using this website, you acknowledge that you have read and understand this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.