import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PAIRING_CODE_LENGTH = 8;
const PAIRING_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export interface LinkedDevice {
  id: string;
  device_name: string;
  platform: string;
  app_version: string | null;
  last_synced_at: string;
  created_at: string;
}

export interface PairingCode {
  code: string;
  expires_at: string;
}

const generatePairingCode = (): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(PAIRING_CODE_LENGTH));
  return Array.from(bytes, (byte) => PAIRING_CODE_ALPHABET[byte % PAIRING_CODE_ALPHABET.length]).join("");
};

export const useLinkedDevices = (userId?: string) =>
  useQuery({
    queryKey: ["linked-devices", userId],
    enabled: Boolean(userId),
    queryFn: async (): Promise<LinkedDevice[]> => {
      const { data, error } = await supabase
        .from("linked_devices")
        .select("id, device_name, platform, app_version, last_synced_at, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

export const useCreatePairingCode = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<PairingCode> => {
      if (!userId) throw new Error("You need to be signed in to pair a device.");

      const { data, error } = await supabase
        .from("device_pairing_codes")
        .insert({ user_id: userId, code: generatePairingCode() })
        .select("code, expires_at")
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pairing-code", userId] });
    },
  });
};

export const useUnlinkDevice = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deviceId: string) => {
      const { error } = await supabase.from("linked_devices").delete().eq("id", deviceId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linked-devices", userId] });
    },
  });
};
