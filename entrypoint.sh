#!/bin/bash
set -eu
cd /code && npm run typeorm:run-migrations 
exec "$@"
