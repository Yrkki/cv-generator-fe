# Working Build System

No native binaries are being generated.

An [Angular](https://angular.io/ "Angular") *TypeScript* autonomous continuous integration build process is nevertheless enforced:

[![Travis build status](https://api.travis-ci.org/Yrkki/cv-generator-fe.svg?branch=master)](https://travis-ci.org/Yrkki/cv-generator-fe "Travis build status")
[![AppVeyor build status](https://ci.appveyor.com/api/projects/status/8jco03v5wvojnqu0?svg=true)](https://ci.appveyor.com/project/Yrkki/cv-generator-fe "AppVeyor build status")
[![CircleCI build status](https://img.shields.io/circleci/build/github/Yrkki/cv-generator-fe?logo=circleci&token=cecd81eb8377394888c00e076646a0801cd07712)](https://app.circleci.com/pipelines/github/Yrkki/cv-generator-fe "CircleCI build status")
[![CircleCI build status (old xp)](https://circleci.com/gh/Yrkki/cv-generator-fe.svg?style=svg)](https://circleci.com/gh/Yrkki/cv-generator-fe "CircleCI build status (old xp)")

## Preserve Debug

The [Angular](https://angular.io/ "Angular") build and installation system preserves debugging information if they are requested in the relevant flags.

## Non Recursive

The [Angular](https://angular.io/ "Angular") build system for the software produced by the project does not recursively build subdirectories. There are no cross-dependencies in the subdirectories. All building blocks like moduules, components, services, etc. are structured in a linear manner.

The project build system's internal dependency information is accurately listed in the *package.json* *Node.js®* file.

## Repeatable

The project produces a reproducible build result. Repeating the process of generating information from source files results in exactly the same bit-for-bit result.

---

© 1984 – 2021 [Marinov](http://marinov.ml "Marinov"). All rights reserved.
