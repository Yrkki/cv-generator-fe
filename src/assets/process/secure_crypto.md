# Use Basic Good Cryptographic Practices

The software does not use cryptographic mechanisms.

## Crypto Weaknesses

The default security mechanisms within the software produced by the project do not depend on cryptographic algorithms or modes with known serious weaknesses (e.g., the SHA-1 cryptographic hash algorithm or the CBC mode in SSH).

## Crypto Algorithm Agility

The project should support multiple cryptographic algorithms, so users can quickly switch if one is broken, should the need arise at a later stage. Common symmetric key algorithms include AES, Twofish, and Serpent. Common cryptographic hash algorithm alternatives include SHA-2 (including SHA-224, SHA-256, SHA-384 AND SHA-512) and SHA-3.

## Crypto Credential Agility

Currently the project never processes authentication credentials and private cryptographic keys.

The project must support storing authentication credentials (such as passwords and dynamic tokens) and private cryptographic keys in files that are separate from other information (such as configuration files, databases, and logs), and permit users to update and replace them without code recompilation, should the need arise at a later stage.

## Crypto Used Network

The software produced by the project supports secure protocols for all of its network communications, such as TLS1.2 or later (HTTPS). Insecure protocols such as HTTP, SSLv3 or earlier, and SSHv1 are disabled by default, and only enabled if the user specifically configures it.

## Crypto TLS12

The software produced by the project supports at least TLS version 1.3.

## Crypto Certificate Verification

The software produced by the project performs TLS certificate verification by default when using TLS, including on subresources.

## Crypto Verification Private

The software produced by the project performs certificate verification before sending HTTP headers with private information (such as secure cookies).

---

© 1984 – 2021 [Marinov](http://marinov.ml "Marinov"). All rights reserved
