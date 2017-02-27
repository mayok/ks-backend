--
-- getenv
--
CREATE OR REPLACE FUNCTION getenv(OUT text, OUT text)
  RETURNS SETOF record
AS $$
   import os
   for e in os.environ:
#       plpy.notice(str(e) + ": " + os.environ[e])
       yield(e, os.environ[e])
$$ LANGUAGE plpythonu;

--
-- lexrank_summarize
--
DROP FUNCTION IF EXISTS lexrank_summarize(p text, t text, s_limit integer);

CREATE OR REPLACE FUNCTION lexrank_summarize(p text, t text, s_limit integer)
  RETURNS SETOF text
AS $$
   import sys
   sys.path.append(p)
   from summpy import lexrank

   res = lexrank.summarize(unicode(t, 'utf-8'), sent_limit=s_limit)
   for s in res:
      yield(s.encode('utf-8'))
$$ LANGUAGE plpythonu;
