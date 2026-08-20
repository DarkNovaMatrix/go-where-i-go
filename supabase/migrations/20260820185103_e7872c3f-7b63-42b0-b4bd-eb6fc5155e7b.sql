-- 1. Catalog tables: read-only from the API
REVOKE ALL ON public.destinations FROM anon, authenticated;
REVOKE ALL ON public.categories FROM anon, authenticated;
GRANT SELECT ON public.destinations TO anon, authenticated;
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.destinations TO service_role;
GRANT ALL ON public.categories TO service_role;

-- 2. Least-privilege grants on user-owned tables (authenticated only)
REVOKE ALL ON public.profiles FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

REVOKE ALL ON public.trips FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trips TO authenticated;
GRANT ALL ON public.trips TO service_role;

REVOKE ALL ON public.reviews FROM anon, authenticated;
GRANT SELECT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;

REVOKE ALL ON public.saved_destinations FROM anon, authenticated;
GRANT SELECT, INSERT, DELETE ON public.saved_destinations TO authenticated;
GRANT ALL ON public.saved_destinations TO service_role;

REVOKE ALL ON public.linked_devices FROM anon, authenticated;
GRANT SELECT, DELETE ON public.linked_devices TO authenticated;
GRANT ALL ON public.linked_devices TO service_role;

REVOKE ALL ON public.device_pairing_codes FROM anon, authenticated;
GRANT SELECT, INSERT, DELETE ON public.device_pairing_codes TO authenticated;
GRANT ALL ON public.device_pairing_codes TO service_role;

-- 3. Close ownership-reassignment holes (missing WITH CHECK) and scope policies to authenticated
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own trips" ON public.trips;
CREATE POLICY "Users can update their own trips" ON public.trips
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create trips" ON public.trips;
CREATE POLICY "Users can create trips" ON public.trips
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own trips" ON public.trips;
CREATE POLICY "Users can delete their own trips" ON public.trips
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own trips" ON public.trips;
CREATE POLICY "Users can view their own trips" ON public.trips
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR is_public = true);

DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;
CREATE POLICY "Users can update their own reviews" ON public.reviews
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create reviews" ON public.reviews;
CREATE POLICY "Users can create reviews" ON public.reviews
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own reviews" ON public.reviews;
CREATE POLICY "Users can delete their own reviews" ON public.reviews
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can save destinations" ON public.saved_destinations;
CREATE POLICY "Users can save destinations" ON public.saved_destinations
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can unsave destinations" ON public.saved_destinations;
CREATE POLICY "Users can unsave destinations" ON public.saved_destinations
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their saved destinations" ON public.saved_destinations;
CREATE POLICY "Users can view their saved destinations" ON public.saved_destinations
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- 4. Safe, name-only public view for review authors (private profile columns stay hidden)
CREATE OR REPLACE VIEW public.public_profiles
WITH (security_invoker = false) AS
  SELECT user_id, display_name, avatar_url FROM public.profiles;

REVOKE ALL ON public.public_profiles FROM anon, authenticated;
GRANT SELECT ON public.public_profiles TO anon, authenticated;