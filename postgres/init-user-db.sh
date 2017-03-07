#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER summpy WITH PASSWORD 'password';
    CREATE DATABASE summpy;
    \c summpy;
    CREATE TABLE record(
      ID SERIAL PRIMARY KEY,
      title TEXT,
      content TEXT
    );
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO summpy;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO summpy;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" \
     -c "CREATE LANGUAGE plpythonu" summpy

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" \
     -f /tmp/summpy.sql summpy
