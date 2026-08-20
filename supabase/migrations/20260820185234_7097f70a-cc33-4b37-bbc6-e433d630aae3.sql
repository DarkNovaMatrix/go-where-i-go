CREATE TABLE IF NOT EXISTS public.pairing_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_key text NOT NULL,
  succeeded boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS pairing_attempts_client_key_created_at_idx
  ON public.pairing_attempts (client_key, created_at DESC);

REVOKE ALL ON public.pairing_attempts FROM anon, authenticated;
GRANT ALL ON public.pairing_attempts TO service_role;

ALTER TABLE public.pairing_attempts ENABLE ROW LEVEL SECURITY;
-- No policies: only service_role (which bypasses RLS) may touch this table.