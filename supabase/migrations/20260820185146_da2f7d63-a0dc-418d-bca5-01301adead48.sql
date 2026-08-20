DROP VIEW IF EXISTS public.public_profiles;

ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS author_name text,
  ADD COLUMN IF NOT EXISTS author_avatar_url text;

CREATE OR REPLACE FUNCTION public.set_review_author_identity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  SELECT p.display_name, p.avatar_url
    INTO NEW.author_name, NEW.author_avatar_url
  FROM public.profiles p
  WHERE p.user_id = NEW.user_id;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.set_review_author_identity() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS reviews_set_author_identity ON public.reviews;
CREATE TRIGGER reviews_set_author_identity
  BEFORE INSERT OR UPDATE OF user_id ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.set_review_author_identity();

UPDATE public.reviews r
SET author_name = p.display_name, author_avatar_url = p.avatar_url
FROM public.profiles p
WHERE p.user_id = r.user_id AND r.author_name IS NULL;