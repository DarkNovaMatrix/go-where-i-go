-- 1. Profiles: restrict reads to the owner
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- 2. Revoke anon access on non-public tables
REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.trips FROM anon;
REVOKE ALL ON public.saved_destinations FROM anon;
REVOKE ALL ON public.reviews FROM anon;
REVOKE ALL ON public.linked_devices FROM anon;
REVOKE ALL ON public.device_pairing_codes FROM anon;

-- Ensure authenticated users retain needed access
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trips TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.saved_destinations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.linked_devices TO authenticated;
GRANT SELECT, INSERT, DELETE ON public.device_pairing_codes TO authenticated;

-- 3. Trigger/helper functions must not be callable via the API
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_destination_rating() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;