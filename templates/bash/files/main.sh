#!/usr/bin/env bash

# ==============================================
# ghost-init.sh – CLI bootstrap script
# A Ghostie project
# ==============================================

# Load configuration
source "$(dirname "$0")/../config/config.cfg"

# Load helper functions
source "$(dirname "$0")/../lib/utils.sh"

# ======================
# Main function
# ======================
main() {
  log "Bootstrapping ${APP_NAME} v${APP_VERSION}..."
  log "Welcome to the skeleton. Everything else is up to you."

  # Validate environment
  if [[ "$DEBUG" == "true" ]]; then
    log "DEBUG mode enabled – every byte counts."
  fi

  # Main logic (base template)
  log "This script is just the shell. Your code goes here."
  log "${APP_NAME} finished. But this is only the beginning."
}

# Run only when executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
