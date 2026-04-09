const STORAGE_KEYS = {
  token: "token",
  user: "user",
  userAddress: "userAddress",
  demoOwnedGameIds: "metagames.demoOwnedGameIds",
  demoTokenBalance: "metagames.demoTokenBalance",
  demoLoggedOut: "metagames.demoLoggedOut",
};

const GUEST_TOKEN = "guest-token";
const GUEST_ADDRESS = "guest-wallet";
const DEFAULT_DEMO_BALANCE = 250;
const DEFAULT_OWNED_GAME_IDS = [];
const LEGACY_SEEDED_OWNED_IDS = [101, 103, 108];

export const GUEST_USER = {
  userName: "guest",
  email: "guest",
  address: GUEST_ADDRESS,
  isGuest: true,
};

const isBrowser = typeof window !== "undefined";

const readJSON = (key, fallback) => {
  if (!isBrowser) return fallback;

  const rawValue = localStorage.getItem(key);
  if (!rawValue) return fallback;

  try {
    return JSON.parse(rawValue);
  } catch {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const isGuestModeEnabled = () =>
  import.meta.env.VITE_GUEST_MODE === "true";

export const isGuestCredentials = (data = {}) => {
  const email = String(data.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(data.password ?? "").trim();

  return email === "guest" && password === "guest";
};

export const isGuestSessionActive = () => {
  if (!isBrowser) return false;

  const storedAddress = localStorage.getItem(STORAGE_KEYS.userAddress);
  const user = readJSON(STORAGE_KEYS.user, null);

  return storedAddress === GUEST_ADDRESS || Boolean(user?.isGuest);
};

export const getGuestLoginMessage = () =>
  "Blockchain login is disabled in this deployment. Use guest / guest to continue.";

export const getGuestSignupMessage = () =>
  "Signup is disabled in this deployment. Please use guest / guest on the login screen.";

export const seedGuestState = () => {
  if (!isBrowser || !isGuestModeEnabled()) return;

  const existingOwnedIds = readJSON(STORAGE_KEYS.demoOwnedGameIds, null);
  if (!Array.isArray(existingOwnedIds)) {
    writeJSON(STORAGE_KEYS.demoOwnedGameIds, DEFAULT_OWNED_GAME_IDS);
  } else {
    const hasOnlyLegacyDefaults =
      existingOwnedIds.length === LEGACY_SEEDED_OWNED_IDS.length &&
      existingOwnedIds.every((id) => LEGACY_SEEDED_OWNED_IDS.includes(Number(id)));

    if (hasOnlyLegacyDefaults) {
      writeJSON(STORAGE_KEYS.demoOwnedGameIds, DEFAULT_OWNED_GAME_IDS);
    }
  }

  if (!localStorage.getItem(STORAGE_KEYS.demoTokenBalance)) {
    localStorage.setItem(
      STORAGE_KEYS.demoTokenBalance,
      String(DEFAULT_DEMO_BALANCE),
    );
  }
};

export const activateGuestSession = () => {
  if (!isBrowser) return;

  seedGuestState();

  localStorage.setItem(STORAGE_KEYS.token, GUEST_TOKEN);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(GUEST_USER));
  localStorage.setItem(STORAGE_KEYS.userAddress, GUEST_ADDRESS);
  localStorage.setItem(STORAGE_KEYS.demoLoggedOut, "false");
};

export const initializeGuestSession = () => {
  if (!isBrowser || !isGuestModeEnabled()) return;

  seedGuestState();

  const userAddress = localStorage.getItem(STORAGE_KEYS.userAddress);
  const loggedOut = localStorage.getItem(STORAGE_KEYS.demoLoggedOut) === "true";

  if (!userAddress && !loggedOut) {
    activateGuestSession();
  }
};

export const markGuestLoggedOut = () => {
  if (!isBrowser) return;

  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.user);
  localStorage.removeItem(STORAGE_KEYS.userAddress);
  localStorage.setItem(STORAGE_KEYS.demoLoggedOut, "true");
};

export const readDemoOwnedGameIds = () =>
  readJSON(STORAGE_KEYS.demoOwnedGameIds, DEFAULT_OWNED_GAME_IDS);

export const addDemoOwnedGameIds = (gameIds) => {
  const existing = readDemoOwnedGameIds();
  const merged = [...new Set([...existing, ...gameIds.map((id) => Number(id))])];
  writeJSON(STORAGE_KEYS.demoOwnedGameIds, merged);
  return merged;
};

export const readDemoTokenBalance = () => {
  if (!isBrowser) return DEFAULT_DEMO_BALANCE;

  const value = Number(localStorage.getItem(STORAGE_KEYS.demoTokenBalance));
  if (Number.isNaN(value)) return DEFAULT_DEMO_BALANCE;

  return value;
};

export const writeDemoTokenBalance = (balance) => {
  if (!isBrowser) return;

  localStorage.setItem(
    STORAGE_KEYS.demoTokenBalance,
    String(Math.max(0, Math.floor(balance))),
  );
};

export const getGuestUser = () => GUEST_USER;
export const getGuestToken = () => GUEST_TOKEN;
