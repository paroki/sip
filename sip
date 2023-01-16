#!/usr/bin/env bash

UNAMEOUT="$(uname -s)"

# Verify operating system is supported...
case "${UNAMEOUT}" in
    Linux*)             MACHINE=linux;;
    Darwin*)            MACHINE=mac;;
    *)                  MACHINE="UNKNOWN"
esac

if [ "$MACHINE" == "UNKNOWN" ]; then
    echo "Unsupported operating system [$(uname -s)]. Laravel Sail supports macOS, Linux, and Windows (WSL2)." >&2

    exit 1
fi

# Determine if stdout is a terminal...
if test -t 1; then
    # Determine if colors are supported...
    ncolors=$(tput colors)

    if test -n "$ncolors" && test "$ncolors" -ge 8; then
        BOLD="$(tput bold)"
        YELLOW="$(tput setaf 3)"
        GREEN="$(tput setaf 2)"
        NC="$(tput sgr0)"
    fi
fi

# Determine if stdout is a terminal...
if test -t 1; then
    # Determine if colors are supported...
    ncolors=$(tput colors)

    if test -n "$ncolors" && test "$ncolors" -ge 8; then
        BOLD="$(tput bold)"
        YELLOW="$(tput setaf 3)"
        GREEN="$(tput setaf 2)"
        NC="$(tput sgr0)"
    fi
fi

# Function that prints the available commands...
function display_help {
    echo "Sistim Informasi Paroki"
    echo
    echo "${YELLOW}Usage:${NC}" >&2
    echo "  sip COMMAND [options] [arguments]"
    echo
    echo "Unknown commands are passed to the docker-compose binary."
    echo
    echo "${YELLOW}docker-compose Commands:${NC}"
    echo "  ${GREEN}sip up${NC}        Start the application"
    echo "  ${GREEN}sip up -d${NC}     Start the application in the background"
    echo "  ${GREEN}sip stop${NC}      Stop the application"
    echo "  ${GREEN}sip restart${NC}   Restart the application"
    echo "  ${GREEN}sip ps${NC}        Display the status of all containers"
    echo
    echo "${YELLOW}Runs api console application:${NC}"
    echo "  ${GREEN}sip api ...${NC}          Run an Artisan command"
    echo "  ${GREEN}sip api queue:work${NC}"
    echo
    echo "${YELLOW}PHP Commands:${NC}"
    echo "  ${GREEN}sip php ...${NC}   Run a snippet of PHP code"
    echo "  ${GREEN}sip php -v${NC}"
    echo
    echo "${YELLOW}Composer Commands:${NC}"
    echo "  ${GREEN}sip composer ...${NC}                       Run a Composer command"
    echo "  ${GREEN}sip composer require maker${NC}"
    echo
    echo "${YELLOW}Node Commands:${NC}"
    echo "  ${GREEN}sip node ...${NC}         Run a Node command"
    echo "  ${GREEN}sip node --version${NC}"
    echo
    echo "${YELLOW}PNPM Commands:${NC}"
    echo "  ${GREEN}sip pnpm ...${NC}        Run a Yarn command"
    echo "  ${GREEN}sip pnpm add${NC}"
    echo
    echo "${YELLOW}Running Tests:${NC}"
    echo "  ${GREEN}sip test${NC}          Run the PHPUnit tests via the Artisan test command"
    echo "  ${GREEN}sip phpunit ...${NC}   Run PHPUnit"
    echo
    echo "${YELLOW}Container CLI:${NC}"
    echo "  ${GREEN}sip shell${NC}        Start a shell session within the application container"
    echo "  ${GREEN}sip bash${NC}         Alias for 'sip shell'"
    echo "  ${GREEN}sip root-shell${NC}   Start a root shell session within the application container"
    echo "  ${GREEN}sip root-bash${NC}    Alias for 'sip root-shell'"
    echo
    echo "${YELLOW}Binaries:${NC}"
    echo "  ${GREEN}sip bin ...${NC}   Run Composer binary scripts from the vendor/bin directory"

    exit 1
}

# Proxy the "help" command...
if [ $# -gt 0 ]; then
    if [ "$1" == "help" ] || [ "$1" == "-h" ] || [ "$1" == "-help" ] || [ "$1" == "--help" ]; then
        display_help
    fi
else
    display_help
fi

# Source the ".env" file so Laravel's environment variables are available...
if [ ! -z "$APP_ENV" ] && [ -f ./.env.$APP_ENV ]; then
  source ./.env.$APP_ENV;
elif [ -f ./.env ]; then
  source ./.env;
fi

# Define Docker Compose command prefix...
docker compose &> /dev/null

if [ $? == 0 ]; then
    DOCKER_COMPOSE=(docker compose)
else
    DOCKER_COMPOSE=(docker-compose)
fi

# Function that outputs Sail is not running...
function sail_is_not_running {
    echo "${BOLD}Sail is not running.${NC}" >&2
    echo "" >&2
    echo "${BOLD}You may Sail using the following commands:${NC} './sip up' or './sip up -d'" >&2

    exit 1
}

export APP_PORT=${APP_PORT:-80}
export APP_SERVICE=${APP_SERVICE:-"api"}

EXEC="yes"
# Determine if Sail is currently up...
if "${DOCKER_COMPOSE[@]}" ps "$APP_SERVICE" 2>&1 | grep 'Exit\|exited'; then
    echo "${BOLD}Shutting down old Sail processes...${NC}" >&2

    "${DOCKER_COMPOSE[@]}" down > /dev/null 2>&1

    EXEC="no"
elif [ -z "$("${DOCKER_COMPOSE[@]}" ps -q)" ]; then
    EXEC="no"
fi

ARGS=()

# Proxy PHP commands to the "php" binary on the application container...
if [ "$1" == "php" ]; then
    shift 1
    if [ "$EXEC" == "yes" ]; then
        ARGS+=(exec)
        [ ! -t 0 ] && ARGS+=(-T)
        ARGS+=("$APP_SERVICE" "php" "$@")
    else
        sail_is_not_running
    fi

elif [ "$1" == "pnpm" ]; then
    shift 1
    if [ "$EXEC" == "yes" ]; then
        ARGS+=(exec)
        [ ! -t 0 ] && ARGS+=(-T)
        ARGS+=("pwa" "pnpm" "$@")
    else
        sail_is_not_running
    fi

# Runs docker compose command as default
else
    ARGS+=("$@")
fi

# echo "${ARGS[@]}"
"${DOCKER_COMPOSE[@]}" "${ARGS[@]}"
