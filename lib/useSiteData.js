"use client";

import { useSyncExternalStore } from "react";
import {
  INITIAL_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_SKILLS,
  INITIAL_SERVICES,
  FURRY_CO_DESIGNERS,
  INITIAL_SETTINGS,
  STORAGE_KEYS
} from "./siteData";

// Constant frozen references for server snapshots
const EMPTY_ARRAY = Object.freeze([]);
const EMPTY_OBJECT = Object.freeze({});

// Module-level in-memory cache to guarantee referential stability for getSnapshot
const memoryCache = {
  [STORAGE_KEYS.PROFILE]: INITIAL_PROFILE,
  [STORAGE_KEYS.PROJECTS]: INITIAL_PROJECTS,
  [STORAGE_KEYS.SKILLS]: INITIAL_SKILLS,
  [STORAGE_KEYS.SERVICES]: INITIAL_SERVICES,
  [STORAGE_KEYS.CODESIGNERS]: FURRY_CO_DESIGNERS,
  [STORAGE_KEYS.SETTINGS]: INITIAL_SETTINGS,
  [STORAGE_KEYS.APPOINTMENTS]: EMPTY_ARRAY,
  [STORAGE_KEYS.MESSAGES]: EMPTY_ARRAY
};

let cacheInitialized = false;

function loadCacheFromStorage() {
  if (typeof window === "undefined") return;
  try {
    const rawProfile = window.localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (rawProfile) memoryCache[STORAGE_KEYS.PROFILE] = JSON.parse(rawProfile);

    const rawProjects = window.localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (rawProjects) memoryCache[STORAGE_KEYS.PROJECTS] = JSON.parse(rawProjects);

    const rawSkills = window.localStorage.getItem(STORAGE_KEYS.SKILLS);
    if (rawSkills) memoryCache[STORAGE_KEYS.SKILLS] = JSON.parse(rawSkills);

    const rawServices = window.localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (rawServices) memoryCache[STORAGE_KEYS.SERVICES] = JSON.parse(rawServices);

    const rawCoDesigners = window.localStorage.getItem(STORAGE_KEYS.CODESIGNERS);
    if (rawCoDesigners) memoryCache[STORAGE_KEYS.CODESIGNERS] = JSON.parse(rawCoDesigners);

    const rawSettings = window.localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (rawSettings) memoryCache[STORAGE_KEYS.SETTINGS] = JSON.parse(rawSettings);

    const rawApts = window.localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (rawApts) memoryCache[STORAGE_KEYS.APPOINTMENTS] = JSON.parse(rawApts);

    const rawMsgs = window.localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (rawMsgs) memoryCache[STORAGE_KEYS.MESSAGES] = JSON.parse(rawMsgs);
  } catch (err) {
    console.error("Error reading cache from localStorage:", err);
  }

  // Also sync from /api/data asynchronously in background
  syncFromApi();
}

async function syncFromApi() {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch("/api/data", { cache: "no-store" });
    if (res.ok) {
      const serverData = await res.json();
      if (serverData.profile) updateCacheAndStore(STORAGE_KEYS.PROFILE, serverData.profile);
      if (serverData.projects) updateCacheAndStore(STORAGE_KEYS.PROJECTS, serverData.projects);
      if (serverData.skills) updateCacheAndStore(STORAGE_KEYS.SKILLS, serverData.skills);
      if (serverData.services) updateCacheAndStore(STORAGE_KEYS.SERVICES, serverData.services);
      if (serverData.coDesigners) updateCacheAndStore(STORAGE_KEYS.CODESIGNERS, serverData.coDesigners);
      if (serverData.settings) updateCacheAndStore(STORAGE_KEYS.SETTINGS, serverData.settings);
      if (serverData.appointments) updateCacheAndStore(STORAGE_KEYS.APPOINTMENTS, serverData.appointments);
      if (serverData.messages) updateCacheAndStore(STORAGE_KEYS.MESSAGES, serverData.messages);
    }
  } catch (err) {
    // silent fallback
  }
}

// Active listeners set
const listeners = new Set();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error(e);
    }
  });
}

function subscribeToStore(listener) {
  if (!cacheInitialized && typeof window !== "undefined") {
    cacheInitialized = true;
    loadCacheFromStorage();
  }
  listeners.add(listener);

  const handleStorageChange = () => {
    loadCacheFromStorage();
    notifyListeners();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorageChange);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorageChange);
    }
  };
}

function updateCacheAndStore(key, value) {
  memoryCache[key] = value;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving ${key} to localStorage:`, e);
    }
  }
  notifyListeners();
}

// Referentially stable snapshot getters
const getProfileSnapshot = () => memoryCache[STORAGE_KEYS.PROFILE];
const getProjectsSnapshot = () => memoryCache[STORAGE_KEYS.PROJECTS];
const getSkillsSnapshot = () => memoryCache[STORAGE_KEYS.SKILLS];
const getServicesSnapshot = () => memoryCache[STORAGE_KEYS.SERVICES];
const getCoDesignersSnapshot = () => memoryCache[STORAGE_KEYS.CODESIGNERS];
const getSettingsSnapshot = () => memoryCache[STORAGE_KEYS.SETTINGS];
const getAppointmentsSnapshot = () => memoryCache[STORAGE_KEYS.APPOINTMENTS];
const getMessagesSnapshot = () => memoryCache[STORAGE_KEYS.MESSAGES];

// Referentially stable server snapshot getters (returns constant reference)
const getServerProfile = () => INITIAL_PROFILE;
const getServerProjects = () => INITIAL_PROJECTS;
const getServerSkills = () => INITIAL_SKILLS;
const getServerServices = () => INITIAL_SERVICES;
const getServerCoDesigners = () => FURRY_CO_DESIGNERS;
const getServerSettings = () => INITIAL_SETTINGS;
const getServerAppointments = () => EMPTY_ARRAY;
const getServerMessages = () => EMPTY_ARRAY;

export function useSiteData() {
  const profile = useSyncExternalStore(
    subscribeToStore,
    getProfileSnapshot,
    getServerProfile
  );

  const projects = useSyncExternalStore(
    subscribeToStore,
    getProjectsSnapshot,
    getServerProjects
  );

  const skills = useSyncExternalStore(
    subscribeToStore,
    getSkillsSnapshot,
    getServerSkills
  );

  const services = useSyncExternalStore(
    subscribeToStore,
    getServicesSnapshot,
    getServerServices
  );

  const coDesigners = useSyncExternalStore(
    subscribeToStore,
    getCoDesignersSnapshot,
    getServerCoDesigners
  );

  const settings = useSyncExternalStore(
    subscribeToStore,
    getSettingsSnapshot,
    getServerSettings
  );

  const appointments = useSyncExternalStore(
    subscribeToStore,
    getAppointmentsSnapshot,
    getServerAppointments
  );

  const messages = useSyncExternalStore(
    subscribeToStore,
    getMessagesSnapshot,
    getServerMessages
  );

  // CRUD actions
  const saveProfile = (newProfile) => {
    updateCacheAndStore(STORAGE_KEYS.PROFILE, newProfile);
  };

  const saveProjects = (newProjects) => {
    updateCacheAndStore(STORAGE_KEYS.PROJECTS, newProjects);
  };

  const saveSkills = (newSkills) => {
    updateCacheAndStore(STORAGE_KEYS.SKILLS, newSkills);
  };

  const saveServices = (newServices) => {
    updateCacheAndStore(STORAGE_KEYS.SERVICES, newServices);
  };

  const saveCoDesigners = (newCoDesigners) => {
    updateCacheAndStore(STORAGE_KEYS.CODESIGNERS, newCoDesigners);
  };

  const saveSettings = (newSettings) => {
    updateCacheAndStore(STORAGE_KEYS.SETTINGS, newSettings);
  };

  const addAppointment = (appointment) => {
    const current = memoryCache[STORAGE_KEYS.APPOINTMENTS] || [];
    const newApt = {
      id: "apt-" + Date.now(),
      createdAt: new Date().toISOString(),
      status: "Pending",
      ...appointment
    };
    const updated = [newApt, ...current];
    updateCacheAndStore(STORAGE_KEYS.APPOINTMENTS, updated);

    if (typeof window !== "undefined") {
      fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment)
      }).catch((err) => console.error("Error persisting booking:", err));
    }

    return true;
  };

  const updateAppointmentStatus = (id, newStatus) => {
    const current = memoryCache[STORAGE_KEYS.APPOINTMENTS] || [];
    const updated = current.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    updateCacheAndStore(STORAGE_KEYS.APPOINTMENTS, updated);
  };

  const deleteAppointment = (id) => {
    const current = memoryCache[STORAGE_KEYS.APPOINTMENTS] || [];
    const updated = current.filter((item) => item.id !== id);
    updateCacheAndStore(STORAGE_KEYS.APPOINTMENTS, updated);
  };

  const addMessage = (msg) => {
    const current = memoryCache[STORAGE_KEYS.MESSAGES] || [];
    const newMsg = {
      id: "msg-" + Date.now(),
      createdAt: new Date().toISOString(),
      read: false,
      ...msg
    };
    const updated = [newMsg, ...current];
    updateCacheAndStore(STORAGE_KEYS.MESSAGES, updated);

    if (typeof window !== "undefined") {
      fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg)
      }).catch((err) => console.error("Error persisting message:", err));
    }

    return true;
  };

  const markMessageAsRead = (id) => {
    const current = memoryCache[STORAGE_KEYS.MESSAGES] || [];
    const updated = current.map((item) =>
      item.id === id ? { ...item, read: true } : item
    );
    updateCacheAndStore(STORAGE_KEYS.MESSAGES, updated);
  };

  const deleteMessage = (id) => {
    const current = memoryCache[STORAGE_KEYS.MESSAGES] || [];
    const updated = current.filter((item) => item.id !== id);
    updateCacheAndStore(STORAGE_KEYS.MESSAGES, updated);
  };

  const resetToDefaults = () => {
    updateCacheAndStore(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
    updateCacheAndStore(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    updateCacheAndStore(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
    updateCacheAndStore(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    updateCacheAndStore(STORAGE_KEYS.CODESIGNERS, FURRY_CO_DESIGNERS);
    updateCacheAndStore(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  };

  return {
    profile,
    projects,
    skills,
    services,
    coDesigners,
    settings,
    appointments,
    messages,
    saveProfile,
    saveProjects,
    saveSkills,
    saveServices,
    saveCoDesigners,
    saveSettings,
    addAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    addMessage,
    markMessageAsRead,
    deleteMessage,
    resetToDefaults
  };
}
