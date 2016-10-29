![trollolo](/images/troll.gif?raw=true)

# Trollolo

A simple trolling interface for websites. Loads targeted site in headless browser and executes messages on input fields.

## Installation

    Clone repo
    npm i -g

### How do I use dis?
    Usage:
        $ trollolo [command] [--flags]

    Commands:
        -t <string> Website url to troll (full url)
        -c <string> Path to troll messages. An array. Default (./trollolo)
        -s <string> site element selector
        -w <integer> time to wait before executing next call
        -i <integer> Type interval. Default(100ms)
    Flags:
        --debug or -d Debug toggle. Allows you to see commands being executed in a browser window.
