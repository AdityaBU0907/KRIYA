"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

// Define all supported languages
export const languages = {
  english: "English",
  hindi: "हिन्दी",
  bengali: "বাংলা",
  telugu: "తెలుగు",
  tamil: "தமிழ்",
  marathi: "मराठी",
  gujarati: "ગુજરાતી",
  kannada: "ಕನ್ನಡ",
  malayalam: "മലയാളം",
  punjabi: "ਪੰਜਾਬੀ",
  urdu: "اردو",
  odia: "ଓଡ଼ିଆ"
}

// Define translations for each language
const translations = {
  english: {
    // Dashboard page
    welcomeBack: "Welcome back, {{name}}",
    dashboardOverview: "Here's an overview of your professional journey",
    trustScore: "Trust Score",
    earnings: "Total Earnings",
    activeJobs: "Active Jobs",
    currentlyWorking: "Currently working",
    completedJobs: "Completed Jobs",
    successfullyFinished: "Successfully finished",
    recentActivity: "Recent Activity",
    viewAll: "View all",
    jobsApplied: "Jobs Applied",
    applicationsThisMonth: "Applications this month",
    profileProgress: "Profile Completion",
    completeProfile: "Complete your profile to improve job opportunities",
    improveProfile: "Improve Profile",
    findJobs: "Find Jobs",
    browseLatest: "Browse the latest job openings",
    exploreJobs: "Explore Jobs",
    topSkills: "Top Skills",
    skillsDemand: "Skills in demand right now",
    jobCategories: "Categories: {{categories}}",
    viewJobs: "View Jobs",
    recommendedJobs: "Recommended Jobs",
    premium: "Premium",
    regular: "Regular",
    
    // Job Search page
    findYourNextJob: "Find Your Next Job",
    useVoiceSearch: "Use voice commands or text search to find jobs that match your skills",
    searchJobs: "Search jobs by title, location, or type...",
    voiceSearch: "Voice Search",
    search: "Search",
    construction: "Construction",
    delivery: "Delivery",
    delhi: "Delhi",
    partTime: "Part-time",
    warehouse: "Warehouse",
    searchResults: "Search Results ({{count}})",
    recommendedJobs: "Recommended Jobs",
    applyNow: "Apply Now",
    details: "Details",
    loyaltyPoints: "+{{count}} loyalty points",
    
    // Settings page
    settings: "Settings",
    manageAccount: "Manage your account settings and preferences",
    savePreferences: "Save preferences",
    saved: "Settings saved",
    savedDescription: "Your preferences have been updated successfully.",
    general: "General",
    appearance: "Appearance",
    account: "Account",
    language: "Language",
    selectLanguage: "Select language",
    chooseLanguage: "Choose your preferred language for the interface",
    notifications: "Notifications",
    jobAlerts: "Receive job alerts and updates",
    themeSettings: "Theme Settings",
    customize: "Customize how the application looks",
    themeMode: "Theme Mode",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    light: "Light",
    dark: "Dark",
    accountInfo: "Account Information",
    personalDetails: "View and update your personal details",
    editProfile: "Edit Profile",
    changePassword: "Change Password",
    deleteAccount: "Delete Account",
    
    // My Jobs page
    myJobs: "My Jobs",
    manageJobs: "Manage your active and completed jobs"
  },
  hindi: {
    // Dashboard page
    welcomeBack: "वापसी पर स्वागत है, {{name}}",
    dashboardOverview: "यहां आपकी पेशेवर यात्रा का अवलोकन है",
    trustScore: "विश्वास स्कोर",
    earnings: "कुल आय",
    activeJobs: "सक्रिय नौकरियाँ",
    currentlyWorking: "वर्तमान में काम कर रहे हैं",
    completedJobs: "पूर्ण नौकरियाँ",
    successfullyFinished: "सफलतापूर्वक पूर्ण",
    recentActivity: "हाल की गतिविधि",
    viewAll: "सभी देखें",
    jobsApplied: "आवेदन किए गए नौकरियाँ",
    applicationsThisMonth: "इस महीने के आवेदन",
    profileProgress: "प्रोफ़ाइल पूर्णता",
    completeProfile: "नौकरी के अवसर बेहतर बनाने के लिए अपनी प्रोफ़ाइल पूरी करें",
    improveProfile: "प्रोफ़ाइल में सुधार करें",
    findJobs: "नौकरियाँ खोजें",
    browseLatest: "नवीनतम नौकरी के अवसरों को ब्राउज़ करें",
    exploreJobs: "नौकरियाँ एक्सप्लोर करें",
    topSkills: "शीर्ष कौशल",
    skillsDemand: "अभी मांग में कौशल",
    jobCategories: "श्रेणियां: {{categories}}",
    viewJobs: "नौकरियाँ देखें",
    recommendedJobs: "अनुशंसित नौकरियाँ",
    premium: "प्रीमियम",
    regular: "नियमित",
    
    // Job Search page
    findYourNextJob: "अपनी अगली नौकरी खोजें",
    useVoiceSearch: "अपने कौशल से मेल खाने वाली नौकरियां खोजने के लिए वॉइस कमांड या टेक्स्ट सर्च का उपयोग करें",
    searchJobs: "शीर्षक, स्थान, या प्रकार द्वारा नौकरियां खोजें...",
    voiceSearch: "वॉइस खोज",
    search: "खोज",
    construction: "निर्माण",
    delivery: "डिलीवरी",
    delhi: "दिल्ली",
    partTime: "पार्ट-टाइम",
    warehouse: "गोदाम",
    searchResults: "खोज परिणाम ({{count}})",
    recommendedJobs: "अनुशंसित नौकरियाँ",
    applyNow: "अभी आवेदन करें",
    details: "विवरण",
    loyaltyPoints: "+{{count}} लॉयल्टी अंक",
    
    // Settings page
    settings: "सेटिंग्स",
    manageAccount: "अपने खाते की सेटिंग्स और प्राथमिकताएँ प्रबंधित करें",
    savePreferences: "प्राथमिकताएँ सहेजें",
    saved: "सेटिंग्स सहेजी गईं",
    savedDescription: "आपकी प्राथमिकताएँ सफलतापूर्वक अपडेट कर दी गई हैं।",
    general: "सामान्य",
    appearance: "रूप",
    account: "खाता",
    language: "भाषा",
    selectLanguage: "भाषा चुनें",
    chooseLanguage: "इंटरफेस के लिए अपनी पसंदीदा भाषा चुनें",
    notifications: "सूचनाएँ",
    jobAlerts: "नौकरी अलर्ट और अपडेट प्राप्त करें",
    themeSettings: "थीम सेटिंग्स",
    customize: "एप्लिकेशन का दिखावट कैसा हो",
    themeMode: "थीम मोड",
    lightMode: "लाइट मोड",
    darkMode: "डार्क मोड",
    light: "लाइट",
    dark: "डार्क",
    accountInfo: "खाता जानकारी",
    personalDetails: "अपनी व्यक्तिगत जानकारी देखें और अपडेट करें",
    editProfile: "प्रोफाइल संपादित करें",
    changePassword: "पासवर्ड बदलें",
    deleteAccount: "खाता हटाएँ",
    
    // My Jobs page
    myJobs: "मेरी नौकरियाँ",
    manageJobs: "अपनी सक्रिय और पूर्ण नौकरियां प्रबंधित करें"
  },
  // Add similar translations for other languages
}

// Create the context
type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string, params?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("english")
  
  // Load saved language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "english"
    setLanguage(savedLanguage)
  }, [])
  
  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])
  
  // Translation function with parameter support
  const t = (key: string, params?: Record<string, string>) => {
    let text = translations[language as keyof typeof translations]?.[key as keyof typeof translations["english"]] || 
           translations.english[key as keyof typeof translations["english"]] || 
           key
    
    // Replace parameters in the format {{param}}
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        text = text.replace(new RegExp(`{{${paramKey}}}`, 'g'), value)
      })
    }
    
    return text
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook for using the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}