#!/bin/sh
set -e


exec google-chrome-stable \
	--enable-automation \
	--disable-background-networking \
	--no-default-browser-check \
	--no-first-run \
	--disable-popup-blocking \
	--disable-default-apps \
	--disable-translate \
	--disable-extensions \
	--no-sandbox \
	--headless \
	--window-size=2880,1800 \
	--proxy-server='direct://' \
	--proxy-bypass-list='*' \
	--disable-gpu \
	--remote-debugging-port=9222 \
	--remote-debugging-address=0.0.0.0 \
;
