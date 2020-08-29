#!/usr/bin/env bash

# Disable the Datadog Agent based on dyno type
# if [ "$DYNOTYPE" == "run" ]; then
  DISABLE_DATADOG_AGENT="true"
# fi

# # Set app version based on HEROKU_SLUG_COMMIT
# if [ -n "$HEROKU_SLUG_COMMIT" ]; then
#   DD_VERSION=$HEROKU_SLUG_COMMIT
# fi
