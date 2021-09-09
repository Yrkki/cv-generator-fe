# Other Security Issues

## Input Validation

The software checks all inputs from potentially untrusted sources to ensure they are valid, and rejects invalid inputs, if there are any restrictions on the data at all.

Note that comparing input against a list of "bad formats" (aka a *denylist*) is normally not enough, because attackers can often work around a denylist. In particular, numbers are converted into internal formats and then checked if they are between their minimum and maximum (inclusive), and text strings are checked to ensure that they are valid text patterns (e.g., valid UTF-8, length, syntax, etc.). Some data may need to be "anything at all" (e.g., a file uploader), but these would typically be rare.

## Hardening

Hardening mechanisms be used in the software produced by the project so that software defects are less likely to result in security vulnerabilities.

Hardening mechanisms may include HTTP headers like Content Security Policy (CSP), compiler flags to mitigate attacks (such as buffer overflow stack protectors), or compiler flags to eliminate undefined behavior. For our purposes least privilege is not considered a hardening mechanism (least privilege is important, but separate).

## Assurance Case

### Threat model

The project and software produced make sure the best SIEM practices are applied to both the development lifecycle and the deployments involved, including regular, ongoing, autonomous, but monitored, updates of these practices.

The proposed architecture is tiered into at least eight distinct tiers, DMZ to maintenance, backup and archival backends, assuring robustness in planning subsequent DR strategies. *See* [Architecture](https://github.com/Yrkki/cv-generator-fe/blob/master/src/assets/process/documentation_architecture.md "Architecture") documentation.

### Trust Boundaries

* DMZ / Frontend / User
  * UX
* Internal / Restricted
  * Branding
  * Application server
  * IaC and provisioning
  * Data connector
* Backend / Restricted
  * Data warehouse
  * Logging
* Backup / Restricted
  * Archival

### Secure Design Principles Applied

The project implements secure design principles.

*See* the [Secure Development Knowledge](https://github.com/Yrkki/cv-generator-fe/blob/master/src/assets/process/secure_design.md "Secure Development Knowledge") document.

### Common Implementation Security Weaknesses Countered

The common implementation security weaknesses and vulnerabilities are recorded and managed as needed. *See* the [Use Basic Good Cryptographic Practices](https://github.com/Yrkki/cv-generator-fe/blob/master/src/assets/process/secure_crypto.md "Use Basic Good Cryptographic Practices") and [Vulnerability Report Credit](https://github.com/Yrkki/cv-generator-fe/blob/master/src/assets/process/vulnerability_response_process.md "Vulnerability Report Credit") documents.

---

© 1984 – 2021 [Marinov](http://marinov.ml "Marinov"). All rights reserved
