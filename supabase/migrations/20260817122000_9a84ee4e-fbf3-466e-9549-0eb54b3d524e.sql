CREATE TABLE IF NOT EXISTS public.linked_devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  device_name text NOT NULL,
  platform text NOT NULL DEFAULT 'unknown',
  app_version text,
  last_synced_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.linked_devices TO authenticated;
GRANT ALL ON public.linked_devices TO service_role;
ALTER TABLE public.linked_devices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage their own devices" ON public.linked_devices;
CREATE POLICY "Users manage their own devices"
  ON public.linked_devices FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_linked_devices_user ON public.linked_devices (user_id);

CREATE TABLE IF NOT EXISTS public.device_pairing_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  code text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '5 minutes'),
  claimed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.device_pairing_codes TO authenticated;
GRANT ALL ON public.device_pairing_codes TO service_role;
ALTER TABLE public.device_pairing_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read their own pairing codes" ON public.device_pairing_codes;
CREATE POLICY "Users read their own pairing codes"
  ON public.device_pairing_codes FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users create their own pairing codes" ON public.device_pairing_codes;
CREATE POLICY "Users create their own pairing codes"
  ON public.device_pairing_codes FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users delete their own pairing codes" ON public.device_pairing_codes;
CREATE POLICY "Users delete their own pairing codes"
  ON public.device_pairing_codes FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_pairing_codes_code ON public.device_pairing_codes (code);