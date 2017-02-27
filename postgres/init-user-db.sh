#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER summpy;
    CREATE DATABASE summpy;
    GRANT ALL PRIVILEGES ON DATABASE summpy TO summpy;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" \
     -c "CREATE LANGUAGE plpythonu" summpy

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" \
     -f /tmp/summpy.sql summpy
