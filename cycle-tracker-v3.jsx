import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Onboarding Component (defined outside to preserve state between renders)
const OnboardingScreen = ({ themes, allMetrics, onComplete }) => {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [tempName, setTempName] = useState('');
  const [tempTheme, setTempTheme] = useState('soft');
  const [tempMetrics, setTempMetrics] = useState([
    'bloating', 'cyclePain', 'temperature', 'clothingPreference',
    'totalSleep', 'mood', 'cravings', 'exercise'
  ]);
  const [tempNfpMode, setTempNfpMode] = useState(false);
  const [tempNfpMethod, setTempNfpMethod] = useState(null);

  // Helper to get if current temp theme is dark
  const getTempIsDark = () => ['bold', 'forest', 'ocean', 'midnight'].includes(tempTheme);

  // Helper to get temp theme input style
  const getTempInputStyle = () => ({
    width: '100%',
    padding: '12px',
    borderRadius: '15px',
    border: `2px solid ${themes[tempTheme].light}`,
    fontSize: '18px',
    outline: 'none',
    background: getTempIsDark() ? 'rgba(255, 255, 255, 0.05)' : '#fff',
    color: themes[tempTheme].text
  });

  // Helper to get temp theme button style
  const getTempButtonStyle = (variant = 'primary') => {
    if (variant === 'primary') {
      return {
        flex: 2,
        padding: '18px',
        background: `linear-gradient(135deg, ${themes[tempTheme].primary}, ${themes[tempTheme].secondary})`,
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        fontSize: '18px',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: `0 8px 25px ${themes[tempTheme].primary}66`
      };
    } else if (variant === 'secondary') {
      return {
        flex: 1,
        padding: '18px',
        background: getTempIsDark() ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
        color: themes[tempTheme].text,
        border: 'none',
        borderRadius: '25px',
        fontSize: '18px',
        fontWeight: '700',
        cursor: 'pointer'
      };
    } else if (variant === 'skip') {
      return {
        flex: 1,
        padding: '18px',
        background: 'transparent',
        color: themes[tempTheme].text,
        border: `2px solid ${themes[tempTheme].light}`,
        borderRadius: '25px',
        fontSize: '18px',
        fontWeight: '700',
        cursor: 'pointer',
        opacity: 0.7
      };
    }
  };

  const completeOnboarding = () => {
    onComplete({
      name: tempName,
      currentTheme: tempTheme,
      enabledMetrics: tempMetrics,
      nfpMode: tempNfpMode,
      nfpMethod: tempNfpMethod
    });
  };

  // Step 0: Welcome
  if (onboardingStep === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: themes[tempTheme].gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Quicksand', 'Nunito', sans-serif"
      }}>
        <div style={{
          background: themes[tempTheme].cardBg,
          borderRadius: '30px',
          padding: '60px 40px',
          maxWidth: '500px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🌸</div>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '700',
            background: `linear-gradient(90deg, ${themes[tempTheme].primary}, ${themes[tempTheme].secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '15px'
          }}>Moon Cycle</h1>
          <p style={{ color: themes[tempTheme].text, fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>
            Track your body, understand your patterns, and live in harmony with your cycle
          </p>
          <button
            onClick={() => setOnboardingStep(1)}
            style={{
              padding: '18px 50px',
              background: `linear-gradient(135deg, ${themes[tempTheme].primary}, ${themes[tempTheme].secondary})`,
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: `0 8px 25px ${themes[tempTheme].primary}66`,
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; }}
          >
            Start Logging
          </button>
        </div>
      </div>
    );
  }

  // Step 1: Color Theme (Required)
  if (onboardingStep === 1) {
    return (
      <div style={{
        minHeight: '100vh',
        background: themes[tempTheme].gradient,
        padding: '20px',
        fontFamily: "'Quicksand', 'Nunito', sans-serif"
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          paddingTop: '40px'
        }}>
          <div style={{
            background: themes[tempTheme].cardBg,
            borderRadius: '30px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: themes[tempTheme].secondary,
              marginBottom: '10px'
            }}>Choose Your Theme</h2>
            <p style={{ color: themes[tempTheme].text, marginBottom: '30px', opacity: 0.8 }}>
              Step 1 of 4 • Required
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '15px',
              marginBottom: '40px'
            }}>
              {Object.keys(themes).map(themeKey => (
                <button
                  key={themeKey}
                  onClick={() => setTempTheme(themeKey)}
                  style={{
                    padding: '20px',
                    background: tempTheme === themeKey
                      ? `linear-gradient(135deg, ${themes[themeKey].primary}, ${themes[themeKey].secondary})`
                      : themes[themeKey].gradient,
                    border: tempTheme === themeKey ? `3px solid ${themes[themeKey].primary}` : '3px solid transparent',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: tempTheme === themeKey
                      ? `0 8px 25px ${themes[themeKey].primary}66`
                      : '0 4px 15px rgba(0,0,0,0.1)',
                    color: themes[themeKey].text,
                    fontWeight: '600',
                    fontSize: '16px'
                  }}
                >
                  {themes[themeKey].name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOnboardingStep(2)}
              style={{
                width: '100%',
                padding: '18px',
                background: `linear-gradient(135deg, ${themes[tempTheme].primary}, ${themes[tempTheme].secondary})`,
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: `0 8px 25px ${themes[tempTheme].primary}66`
              }}
            >
              Continue
            </button>

            <button
              onClick={completeOnboarding}
              style={{
                width: '100%',
                padding: '12px',
                background: 'transparent',
                color: themes[tempTheme].text,
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '15px',
                opacity: 0.7
              }}
            >
              Skip remaining steps (you can add this later in settings)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Name (Optional)
  if (onboardingStep === 2) {
    return (
      <div style={{
        minHeight: '100vh',
        background: themes[tempTheme].gradient,
        padding: '20px',
        fontFamily: "'Quicksand', 'Nunito', sans-serif"
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          paddingTop: '40px'
        }}>
          <div style={{
            background: themes[tempTheme].cardBg,
            borderRadius: '30px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: themes[tempTheme].secondary,
              marginBottom: '10px'
            }}>What's Your Name?</h2>
            <p style={{ color: themes[tempTheme].text, marginBottom: '30px', opacity: 0.8 }}>
              Step 2 of 4 • Optional
            </p>

            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter your name"
              style={{
                ...getTempInputStyle(),
                marginBottom: '30px'
              }}
            />

            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={() => setOnboardingStep(1)} style={getTempButtonStyle('secondary')}>
                Back
              </button>
              <button onClick={() => setOnboardingStep(4)} style={getTempButtonStyle('skip')}>
                Skip
              </button>
              <button onClick={() => setOnboardingStep(3)} style={getTempButtonStyle('primary')}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Choose Metrics
  if (onboardingStep === 3) {
    const toggleMetric = (key) => {
      if (tempMetrics.includes(key)) {
        setTempMetrics(tempMetrics.filter(m => m !== key));
      } else {
        setTempMetrics([...tempMetrics, key]);
      }
    };

    const categories = {
      physical: { name: 'Physical Symptoms', icon: '🎈' },
      sleep: { name: 'Sleep & Energy', icon: '💤' },
      mood: { name: 'Mood & Emotions', icon: '😊' },
      food: { name: 'Food & Substances', icon: '🍫' },
      activity: { name: 'Physical Activity', icon: '🏃‍♀️' },
      sexual: { name: 'Sexual Health', icon: '💕' },
      health: { name: 'Medications', icon: '💊' },
      notes: { name: 'Daily Notes', icon: '📝' }
    };

    return (
      <div style={{
        minHeight: '100vh',
        background: themes[tempTheme].gradient,
        padding: '20px',
        fontFamily: "'Quicksand', 'Nunito', sans-serif"
      }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          paddingTop: '40px'
        }}>
          <div style={{
            background: themes[tempTheme].cardBg,
            borderRadius: '30px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: themes[tempTheme].secondary,
              marginBottom: '10px'
            }}>Choose What to Track</h2>
            <p style={{ color: themes[tempTheme].text, marginBottom: '30px', opacity: 0.8 }}>
              Step 3 of 4 • Optional (you can always add more later)
            </p>

            <div style={{ marginBottom: '30px' }}>
              {Object.entries(categories).map(([catKey, catInfo]) => {
                const metricsInCategory = Object.entries(allMetrics).filter(
                  ([key, metric]) => metric.category === catKey && metric.canDisable !== false
                );

                if (metricsInCategory.length === 0) return null;

                return (
                  <div key={catKey} style={{ marginBottom: '30px' }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: themes[tempTheme].secondary,
                      marginBottom: '15px'
                    }}>
                      {catInfo.icon} {catInfo.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      {metricsInCategory.map(([key, metric]) => (
                        <button
                          key={key}
                          onClick={() => toggleMetric(key)}
                          style={{
                            padding: '12px 20px',
                            background: tempMetrics.includes(key)
                              ? `linear-gradient(135deg, ${themes[tempTheme].primary}, ${themes[tempTheme].secondary})`
                              : getTempIsDark() ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                            color: tempMetrics.includes(key) ? '#fff' : themes[tempTheme].text,
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {metric.icon} {metric.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={() => setOnboardingStep(2)} style={getTempButtonStyle('secondary')}>
                Back
              </button>
              <button onClick={() => setOnboardingStep(4)} style={getTempButtonStyle('skip')}>
                Skip
              </button>
              <button onClick={() => setOnboardingStep(4)} style={getTempButtonStyle('primary')}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: NFP & Data Import
  if (onboardingStep === 4) {
    return (
      <div style={{
        minHeight: '100vh',
        background: themes[tempTheme].gradient,
        padding: '20px',
        fontFamily: "'Quicksand', 'Nunito', sans-serif"
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          paddingTop: '40px'
        }}>
          <div style={{
            background: themes[tempTheme].cardBg,
            borderRadius: '30px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: themes[tempTheme].secondary,
              marginBottom: '10px'
            }}>Additional Options</h2>
            <p style={{ color: themes[tempTheme].text, marginBottom: '30px', opacity: 0.8 }}>
              Step 4 of 4 • Optional
            </p>

            {/* NFP Mode */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                fontSize: '18px',
                color: themes[tempTheme].text,
                fontWeight: '600',
                marginBottom: '15px'
              }}>
                <input
                  type="checkbox"
                  checked={tempNfpMode}
                  onChange={(e) => {
                    setTempNfpMode(e.target.checked);
                    if (!e.target.checked) setTempNfpMethod(null);
                  }}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                🌡️ Enable Natural Family Planning (NFP) Tracking
              </label>

              {tempNfpMode && (
                <div style={{
                  background: getTempIsDark() ? 'rgba(255, 255, 255, 0.05)' : '#f9f9f9',
                  padding: '20px',
                  borderRadius: '15px',
                  marginTop: '15px'
                }}>
                  <p style={{
                    fontSize: '13px',
                    color: themes[tempTheme].text,
                    marginBottom: '15px',
                    opacity: 0.8
                  }}>
                    ⚠️ <strong>Disclaimer:</strong> This app is for tracking purposes only and should not be used as the sole method of contraception. Consult with a healthcare provider or certified NFP instructor.
                  </p>
                  <p style={{ fontSize: '16px', color: themes[tempTheme].text, marginBottom: '10px', fontWeight: '600' }}>
                    Select NFP Method:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['symptothermal', 'billings', 'creighton', 'marquette'].map(method => (
                      <button
                        key={method}
                        onClick={() => setTempNfpMethod(method)}
                        style={{
                          padding: '12px 20px',
                          background: tempNfpMethod === method
                            ? `linear-gradient(135deg, ${themes[tempTheme].primary}, ${themes[tempTheme].secondary})`
                            : getTempIsDark() ? 'rgba(255, 255, 255, 0.1)' : '#fff',
                          color: tempNfpMethod === method ? '#fff' : themes[tempTheme].text,
                          border: `2px solid ${themes[tempTheme].light}`,
                          borderRadius: '15px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          textAlign: 'left',
                          transition: 'all 0.3s ease',
                          textTransform: 'capitalize'
                        }}
                      >
                        {method.charAt(0).toUpperCase() + method.slice(1)} Method
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Import Data Placeholder */}
            <div style={{
              background: getTempIsDark() ? 'rgba(255, 255, 255, 0.05)' : '#f9f9f9',
              padding: '20px',
              borderRadius: '15px',
              marginBottom: '30px'
            }}>
              <p style={{ fontSize: '16px', color: themes[tempTheme].text, fontWeight: '600', marginBottom: '10px' }}>
                📊 Import Historical Data
              </p>
              <p style={{ fontSize: '14px', color: themes[tempTheme].text, opacity: 0.8, marginBottom: '15px' }}>
                You can import your cycle data from Apple Health or CSV later in Settings.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={() => setOnboardingStep(3)} style={getTempButtonStyle('secondary')}>
                Back
              </button>
              <button onClick={completeOnboarding} style={getTempButtonStyle('skip')}>
                Skip
              </button>
              <button onClick={completeOnboarding} style={getTempButtonStyle('primary')}>
                Start Tracking!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const CycleTrackerApp = () => {
  // Main state
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('log');
  const [cycleData, setCycleData] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // User preferences
  const [userPreferences, setUserPreferences] = useState({
    name: '',
    currentTheme: 'soft',
    enabledMetrics: [], // Will be populated during onboarding
    nfpMode: false,
    nfpMethod: null // 'symptothermal', 'billings', 'creighton', 'marquette'
  });

  // Cycle settings
  const [cycleSettings, setCycleSettings] = useState({
    averageCycleLength: 28,
    lastPeriodStart: null,
    periodHistory: []
  });

  // Today's log
  const [todayLog, setTodayLog] = useState({
    date: new Date().toISOString().split('T')[0],
    notes: '',
    // Core cycle metrics
    periodDay: false,
    flowHeaviness: '',
    // Physical symptoms
    bloating: '',
    cyclePain: { intensity: '', locations: [], customNotes: '' },
    temperature: 3,
    clothingPreference: 3,
    // Sleep & energy
    totalSleep: '',
    deepSleep: '',
    naps: [],
    stressLevel: '',
    // Mood & emotions
    mood: '',
    // Food & substances
    cravings: [],
    caffeine: [],
    alcohol: false,
    marijuana: false,
    // Physical activity
    exercise: [],
    // Sexual health
    sexualActivity: [],
    // Medications
    medications: [],
    // NFP metrics (if enabled)
    basalBodyTemp: '',
    cervicalMucus: '',
    cervicalPosition: { height: '', firmness: '', opening: '' },
    ovulationTest: ''
  });

  // All available metrics with metadata
  const allMetrics = {
    // Core (always shown, can't disable)
    periodDay: { label: 'Period Day', category: 'core', canDisable: false, icon: '🩸' },
    flowHeaviness: { label: 'Flow Heaviness', category: 'core', canDisable: false, icon: '💧' },
    
    // Physical symptoms
    bloating: { label: 'Bloating', category: 'physical', icon: '🎈' },
    cyclePain: { label: 'Cycle Pain', category: 'physical', icon: '💢' },
    temperature: { label: 'Temperature Sensitivity', category: 'physical', icon: '🌡️' },
    clothingPreference: { label: 'Clothing Comfort', category: 'physical', icon: '👗' },
    
    // Sleep & energy
    totalSleep: { label: 'Total Sleep', category: 'sleep', icon: '💤' },
    deepSleep: { label: 'Deep Sleep', category: 'sleep', icon: '🌙' },
    naps: { label: 'Naps', category: 'sleep', icon: '😴' },
    stressLevel: { label: 'Stress Level', category: 'sleep', icon: '😰' },
    
    // Mood & emotions
    mood: { label: 'Mood', category: 'mood', icon: '😊' },
    
    // Food & substances
    cravings: { label: 'Food Cravings', category: 'food', icon: '🍫' },
    caffeine: { label: 'Caffeine', category: 'food', icon: '☕' },
    alcohol: { label: 'Alcohol', category: 'food', icon: '🍷' },
    marijuana: { label: 'Marijuana', category: 'food', icon: '🌿' },
    
    // Physical activity
    exercise: { label: 'Exercise', category: 'activity', icon: '🏃‍♀️' },
    
    // Sexual health
    sexualActivity: { label: 'Sexual Activity', category: 'sexual', icon: '💕' },
    
    // Medications
    medications: { label: 'Medications', category: 'health', icon: '💊' },
    
    // Daily notes
    notes: { label: 'Daily Notes', category: 'notes', icon: '📝' }
  };

  // NFP-specific metrics (only shown when NFP mode is enabled)
  const nfpMetrics = {
    basalBodyTemp: { label: 'Basal Body Temperature', icon: '🌡️', methods: ['symptothermal', 'marquette'] },
    cervicalMucus: { label: 'Cervical Mucus', icon: '💧', methods: ['symptothermal', 'billings', 'creighton'] },
    cervicalPosition: { label: 'Cervical Position', icon: '📍', methods: ['symptothermal'] },
    ovulationTest: { label: 'Ovulation Test (LH)', icon: '🧪', methods: ['marquette'] }
  };

  // Theme configurations
  const themes = {
    soft: {
      name: 'Soft Luna',
      gradient: 'linear-gradient(135deg, #ffd1dc 0%, #e0c3fc 50%, #d4b5ff 100%)',
      primary: '#ff6b9d',
      secondary: '#c44569',
      light: '#ffd1dc',
      text: '#7d5a8f',
      cardBg: 'rgba(255, 255, 255, 0.95)'
    },
    bold: {
      name: 'Bold Crimson',
      gradient: 'linear-gradient(135deg, #000000 0%, #434343 50%, #FF0000 100%)',
      primary: '#FF0000',
      secondary: '#8B0000',
      light: '#FF6B6B',
      text: '#FFFFFF',
      cardBg: 'rgba(30, 30, 30, 0.95)'
    },
    forest: {
      name: 'Forest Moon',
      gradient: 'linear-gradient(135deg, #1a3a1a 0%, #2d5a2d 50%, #4a7c59 100%)',
      primary: '#66BB6A',
      secondary: '#2E7D32',
      light: '#81C784',
      text: '#E8F5E9',
      cardBg: 'rgba(26, 58, 26, 0.95)'
    },
    ocean: {
      name: 'Deep Ocean',
      gradient: 'linear-gradient(135deg, #0a1929 0%, #1e3a5f 50%, #2d5f8d 100%)',
      primary: '#29B6F6',
      secondary: '#0277BD',
      light: '#4FC3F7',
      text: '#E1F5FE',
      cardBg: 'rgba(10, 25, 41, 0.95)'
    },
    sunset: {
      name: 'Desert Sunset',
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #c73866 100%)',
      primary: '#FF6B35',
      secondary: '#C73866',
      light: '#FFB88C',
      text: '#2d1b00',
      cardBg: 'rgba(255, 248, 220, 0.95)'
    },
    midnight: {
      name: 'Midnight Purple',
      gradient: 'linear-gradient(135deg, #1a0033 0%, #2d004d 50%, #4a0080 100%)',
      primary: '#B388FF',
      secondary: '#7C4DFF',
      light: '#D1C4E9',
      text: '#F3E5F5',
      cardBg: 'rgba(26, 0, 51, 0.95)'
    },
    minimal: {
      name: 'Minimal Mono',
      gradient: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 50%, #d6d6d6 100%)',
      primary: '#000000',
      secondary: '#424242',
      light: '#BDBDBD',
      text: '#212121',
      cardBg: 'rgba(255, 255, 255, 0.95)'
    }
  };

  const theme = isDarkMode 
    ? { ...themes.midnight, name: 'Dark Mode' }
    : themes[userPreferences.currentTheme] || themes.soft;

  const isDarkTheme = ['bold', 'forest', 'ocean', 'midnight'].includes(userPreferences.currentTheme) || isDarkMode;

  // Style objects
  const sectionHeaderStyle = {
    color: theme.secondary,
    fontSize: '20px',
    marginBottom: '15px',
    fontWeight: '600'
  };

  const h2Style = {
    fontSize: '28px',
    color: theme.secondary,
    marginBottom: '25px',
    fontWeight: '700'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '15px',
    border: `2px solid ${theme.light}`,
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.3s ease',
    background: isDarkTheme ? 'rgba(255, 255, 255, 0.05)' : '#fff',
    color: theme.text
  };

  const getToggleButtonStyle = (isActive) => ({
    padding: '10px 20px',
    background: isActive
      ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
      : isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
    color: isActive ? '#fff' : theme.text,
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    textTransform: 'capitalize'
  });

  // Helper functions
  const handleInputChange = (field, value) => {
    setTodayLog({ ...todayLog, [field]: value });
  };

  const toggleArrayItem = (field, item) => {
    const current = todayLog[field];
    if (current.includes(item)) {
      setTodayLog({ ...todayLog, [field]: current.filter(i => i !== item) });
    } else {
      setTodayLog({ ...todayLog, [field]: [...current, item] });
    }
  };

  // Helper functions for complex metrics
  const addCaffeine = (type, cups) => {
    const existing = todayLog.caffeine.find(c => c.type === type);
    if (existing) {
      setTodayLog({
        ...todayLog,
        caffeine: todayLog.caffeine.map(c => 
          c.type === type ? { ...c, cups: parseInt(cups) || 0 } : c
        )
      });
    } else {
      setTodayLog({
        ...todayLog,
        caffeine: [...todayLog.caffeine, { type, cups: parseInt(cups) || 0 }]
      });
    }
  };

  const removeCaffeine = (type) => {
    setTodayLog({
      ...todayLog,
      caffeine: todayLog.caffeine.filter(c => c.type !== type)
    });
  };

  const addNap = (time, duration) => {
    if (time && duration) {
      setTodayLog({
        ...todayLog,
        naps: [...todayLog.naps, { time, duration: parseInt(duration) || 0 }]
      });
    }
  };

  const removeNap = (index) => {
    setTodayLog({
      ...todayLog,
      naps: todayLog.naps.filter((_, i) => i !== index)
    });
  };

  const addExercise = (type, duration) => {
    if (type && duration) {
      setTodayLog({
        ...todayLog,
        exercise: [...todayLog.exercise, { type, duration: parseInt(duration) || 0 }]
      });
    }
  };

  const removeExercise = (index) => {
    setTodayLog({
      ...todayLog,
      exercise: todayLog.exercise.filter((_, i) => i !== index)
    });
  };

  const addMedication = (name, dosage, timesPerDay) => {
    if (name) {
      setTodayLog({
        ...todayLog,
        medications: [...todayLog.medications, { 
          name, 
          dosage: dosage || '',
          timesPerDay: parseInt(timesPerDay) || 1,
          taken: [] // Array to track which doses were taken
        }]
      });
    }
  };

  const removeMedication = (index) => {
    setTodayLog({
      ...todayLog,
      medications: todayLog.medications.filter((_, i) => i !== index)
    });
  };

  const toggleMedicationDose = (medIndex, doseIndex) => {
    setTodayLog({
      ...todayLog,
      medications: todayLog.medications.map((med, i) => {
        if (i === medIndex) {
          const taken = med.taken.includes(doseIndex)
            ? med.taken.filter(d => d !== doseIndex)
            : [...med.taken, doseIndex];
          return { ...med, taken };
        }
        return med;
      })
    });
  };

  // Cycle calculation functions
  const getCurrentCycleDay = () => {
    if (!cycleSettings.lastPeriodStart) return null;
    const today = new Date();
    const lastPeriod = new Date(cycleSettings.lastPeriodStart);
    const daysSince = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
    return (daysSince % cycleSettings.averageCycleLength) + 1;
  };

  const getHormonalPhase = (cycleDay, cycleLength = cycleSettings.averageCycleLength) => {
    if (!cycleDay) return null;
    const ovulationDay = cycleLength - 14;
    if (cycleDay >= 1 && cycleDay <= 5) return { name: 'Menstrual', description: 'Hormone levels are low. You might feel tired or need extra rest.', emoji: '🩸' };
    if (cycleDay > 5 && cycleDay < ovulationDay) return { name: 'Follicular', description: 'Estrogen is rising. You may feel energized and social.', emoji: '🌱' };
    if (cycleDay === ovulationDay || cycleDay === ovulationDay + 1) return { name: 'Ovulation', description: 'Estrogen peaks. You might feel confident and outgoing.', emoji: '✨' };
    return { name: 'Luteal', description: 'Progesterone rises then falls. You might crave comfort or alone time.', emoji: '🌙' };
  };

  const refineCycleLength = () => {
    if (cycleSettings.periodHistory.length < 2) return cycleSettings.averageCycleLength;
    const sorted = [...cycleSettings.periodHistory].sort((a, b) => new Date(a) - new Date(b));
    const lengths = [];
    for (let i = 1; i < sorted.length; i++) {
      const diff = Math.floor((new Date(sorted[i]) - new Date(sorted[i-1])) / 86400000);
      if (diff >= 14 && diff <= 40) lengths.push(diff);
    }
    return lengths.length ? Math.round(lengths.reduce((sum, len) => sum + len, 0) / lengths.length) : cycleSettings.averageCycleLength;
  };

  // Save log function
  const saveLog = () => {
    const updated = [...cycleData];
    const idx = updated.findIndex(d => d.date === todayLog.date);
    const entry = {
      ...todayLog,
      totalSleep: parseFloat(todayLog.totalSleep) || 0,
      deepSleep: parseFloat(todayLog.deepSleep) || 0,
      cycleDay: getCurrentCycleDay() || 1
    };
    
    if (idx >= 0) updated[idx] = entry;
    else updated.push(entry);
    
    const newData = updated.sort((a, b) => new Date(a.date) - new Date(b.date));
    let newSettings = cycleSettings;
    
    // If this is a period day, update cycle tracking
    if (todayLog.periodDay) {
      const recent = cycleData.filter(d => {
        const diff = Math.floor((new Date(todayLog.date) - new Date(d.date)) / 86400000);
        return d.periodDay && diff > 0 && diff <= 7;
      });
      
      if (recent.length === 0) {
        newSettings = {
          ...cycleSettings,
          lastPeriodStart: todayLog.date,
          periodHistory: [todayLog.date, ...cycleSettings.periodHistory.filter(d => d !== cycleSettings.lastPeriodStart)],
          averageCycleLength: refineCycleLength()
        };
      }
    }
    
    setCycleData(newData);
    setCycleSettings(newSettings);
    alert('✅ Log saved successfully!');
  };

  // Check if metric is enabled
  const isMetricEnabled = (metricKey) => {
    const metric = allMetrics[metricKey];
    if (!metric) return false;
    if (!metric.canDisable) return true; // Core metrics always enabled
    return userPreferences.enabledMetrics.includes(metricKey);
  };

  // If onboarding not completed, show onboarding
  if (!hasCompletedOnboarding) {
    return <OnboardingScreen 
      themes={themes} 
      allMetrics={allMetrics}
      onComplete={(preferences) => {
        setUserPreferences(preferences);
        setHasCompletedOnboarding(true);
      }}
    />;
  }

  // Main app (placeholder for now - we'll build this next)
  return (
    <div style={{
      minHeight: '100vh',
      background: theme.gradient,
      fontFamily: "'Quicksand', 'Nunito', sans-serif",
      padding: '20px'
    }}>
      <header style={{ textAlign: 'center', padding: '40px 20px', marginBottom: '30px' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🌸</div>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px'
        }}>
          {userPreferences.name ? `${userPreferences.name}'s Cycle` : 'Moon Cycle'}
        </h1>
        <p style={{ color: theme.text, fontSize: '16px', fontWeight: '500' }}>
          Track your body, understand your patterns
        </p>
      </header>

      {/* Top controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <button
          onClick={() => setShowSettings(true)}
          style={{
            padding: '10px 20px',
            background: theme.cardBg,
            color: theme.text,
            border: `2px solid ${theme.light}`,
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ⚙️ Settings
        </button>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            padding: '10px 20px',
            background: theme.cardBg,
            color: theme.text,
            border: `2px solid ${theme.light}`,
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isDarkMode ? '☀️' : '🌙'} {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>

      {/* Tab navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {['log', 'calendar', 'trends', 'insights'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 30px',
              background: activeTab === tab
                ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                : theme.cardBg,
              color: activeTab === tab ? '#fff' : theme.text,
              border: 'none',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === tab
                ? `0 6px 20px ${theme.primary}66`
                : '0 4px 10px rgba(0,0,0,0.1)',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main content area */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: theme.cardBg,
        borderRadius: '30px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
      }}>
        {activeTab === 'log' && (
          <LogTab 
            todayLog={todayLog}
            setTodayLog={setTodayLog}
            userPreferences={userPreferences}
            theme={theme}
            isDarkTheme={isDarkTheme}
            allMetrics={allMetrics}
            nfpMetrics={nfpMetrics}
            isMetricEnabled={isMetricEnabled}
            sectionHeaderStyle={sectionHeaderStyle}
            h2Style={h2Style}
            inputStyle={inputStyle}
            getToggleButtonStyle={getToggleButtonStyle}
            handleInputChange={handleInputChange}
            toggleArrayItem={toggleArrayItem}
            addCaffeine={addCaffeine}
            removeCaffeine={removeCaffeine}
            addNap={addNap}
            removeNap={removeNap}
            addExercise={addExercise}
            removeExercise={removeExercise}
            addMedication={addMedication}
            removeMedication={removeMedication}
            toggleMedicationDose={toggleMedicationDose}
            saveLog={saveLog}
            getCurrentCycleDay={getCurrentCycleDay}
            getHormonalPhase={getHormonalPhase}
            cycleSettings={cycleSettings}
          />
        )}

        {activeTab === 'calendar' && (
          <div>
            <h2 style={h2Style}>Calendar</h2>
            <p style={{ color: theme.text }}>Calendar view coming soon...</p>
          </div>
        )}

        {activeTab === 'trends' && (
          <div>
            <h2 style={h2Style}>Trends</h2>
            <p style={{ color: theme.text }}>Trend charts coming soon...</p>
          </div>
        )}

        {activeTab === 'insights' && (
          <div>
            <h2 style={h2Style}>Insights</h2>
            <p style={{ color: theme.text }}>Personalized insights coming soon...</p>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          userPreferences={userPreferences}
          setUserPreferences={setUserPreferences}
          cycleSettings={cycleSettings}
          setCycleSettings={setCycleSettings}
          theme={theme}
          themes={themes}
          isDarkTheme={isDarkTheme}
          allMetrics={allMetrics}
          nfpMetrics={nfpMetrics}
          onClose={() => setShowSettings(false)}
          inputStyle={inputStyle}
        />
      )}

      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        color: theme.text,
        fontSize: '14px',
        opacity: 0.8
      }}>
        <p>Your cycle data is stored locally in your browser</p>
        <p style={{ marginTop: '5px' }}>🌙 Track mindfully, live intentionally</p>
      </footer>
    </div>
  );
};

// Searchable Tag Input Component
const SearchableTagInput = ({ 
  value, 
  onChange, 
  presetOptions, 
  placeholder, 
  theme, 
  isDarkTheme,
  inputStyle 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentItems, setRecentItems] = useState([]);

  const addItem = (item) => {
    if (item && !value.includes(item)) {
      onChange([...value, item.toLowerCase()]);
      setRecentItems([item, ...recentItems.filter(i => i !== item)].slice(0, 5));
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const removeItem = (item) => {
    onChange(value.filter(i => i !== item));
  };

  const filteredSuggestions = presetOptions.filter(opt =>
    opt.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(opt)
  );

  return (
    <div style={{ position: 'relative' }}>
      {/* Selected tags */}
      {value.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
          {value.map(item => (
            <div
              key={item}
              style={{
                padding: '8px 15px',
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                color: 'white',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {item}
              <button
                onClick={() => removeItem(item)}
                style={{
                  background: 'rgba(255,255,255,0.3)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input field */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(e.target.value.length > 0);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && inputValue.trim()) {
            addItem(inputValue.trim());
          }
        }}
        onFocus={() => setShowSuggestions(inputValue.length > 0)}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          marginBottom: showSuggestions ? '0' : '10px'
        }}
      />

      {/* Suggestions dropdown */}
      {showSuggestions && (filteredSuggestions.length > 0 || recentItems.length > 0) && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: theme.cardBg,
          border: `2px solid ${theme.light}`,
          borderRadius: '15px',
          marginTop: '5px',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 10,
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          {filteredSuggestions.map(item => (
            <button
              key={item}
              onClick={() => addItem(item)}
              style={{
                width: '100%',
                padding: '12px 15px',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                color: theme.text,
                cursor: 'pointer',
                fontSize: '14px',
                borderBottom: `1px solid ${theme.light}`,
                transition: 'background 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.background = isDarkTheme ? 'rgba(255,255,255,0.05)' : '#f5f5f5'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Quick add chips for preset options */}
      {!showSuggestions && presetOptions.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
          {presetOptions.filter(opt => !value.includes(opt)).slice(0, 6).map(item => (
            <button
              key={item}
              onClick={() => addItem(item)}
              style={{
                padding: '8px 15px',
                background: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                color: theme.text,
                border: `1px solid ${theme.light}`,
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '13px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = `${theme.primary}20`;
                e.target.style.borderColor = theme.primary;
              }}
              onMouseOut={(e) => {
                e.target.style.background = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5';
                e.target.style.borderColor = theme.light;
              }}
            >
              + {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Log Tab Component
const LogTab = ({
  todayLog,
  setTodayLog,
  userPreferences,
  theme,
  isDarkTheme,
  allMetrics,
  nfpMetrics,
  isMetricEnabled,
  sectionHeaderStyle,
  h2Style,
  inputStyle,
  getToggleButtonStyle,
  handleInputChange,
  toggleArrayItem,
  saveLog,
  getCurrentCycleDay,
  getHormonalPhase,
  cycleSettings
}) => {
  const [expandedSections, setExpandedSections] = useState({
    core: true,
    physical: false,
    sleep: false,
    mood: false,
    food: false,
    activity: false,
    sexual: false,
    health: false,
    nfp: false,
    notes: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      // Close all sections first, then open the clicked one
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      return { ...allClosed, [section]: !prev[section] };
    });
  };

  const categories = {
    core: { name: 'Period & Flow', icon: '🩸', color: theme.primary },
    physical: { name: 'Physical Symptoms', icon: '🎈', color: theme.secondary },
    sleep: { name: 'Sleep & Energy', icon: '💤', color: theme.primary },
    mood: { name: 'Mood & Emotions', icon: '😊', color: theme.secondary },
    food: { name: 'Food & Substances', icon: '🍫', color: theme.primary },
    activity: { name: 'Physical Activity', icon: '🏃‍♀️', color: theme.secondary },
    sexual: { name: 'Sexual Health', icon: '💕', color: theme.primary },
    health: { name: 'Medications', icon: '💊', color: theme.secondary },
    notes: { name: 'Daily Notes', icon: '📝', color: theme.primary }
  };

  if (userPreferences.nfpMode) {
    categories.nfp = { name: 'NFP Tracking', icon: '🌡️', color: theme.primary };
  }

  const currentCycleDay = getCurrentCycleDay();
  const currentPhase = getHormonalPhase(currentCycleDay);

  return (
    <div>
      <h2 style={h2Style}>Today's Log</h2>

      {/* Current Cycle Info */}
      {currentCycleDay && cycleSettings.lastPeriodStart && (
        <div style={{
          background: `linear-gradient(135deg, ${theme.primary}15, ${theme.light}25)`,
          padding: '20px',
          borderRadius: '20px',
          marginBottom: '30px',
          border: `2px solid ${theme.light}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <p style={{ fontSize: '14px', color: theme.text, opacity: 0.8, marginBottom: '5px' }}>Current Cycle Day</p>
              <p style={{ fontSize: '32px', fontWeight: '700', color: theme.primary, margin: 0 }}>
                Day {currentCycleDay}
              </p>
            </div>
            {currentPhase && (
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '14px', color: theme.text, opacity: 0.8, marginBottom: '5px' }}>Hormonal Phase</p>
                <p style={{ fontSize: '24px', fontWeight: '600', color: theme.secondary, margin: 0 }}>
                  {currentPhase.emoji} {currentPhase.name}
                </p>
                <p style={{ fontSize: '12px', color: theme.text, marginTop: '5px', maxWidth: '300px' }}>
                  {currentPhase.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* First time setup prompt */}
      {!cycleSettings.lastPeriodStart && (
        <div style={{
          background: theme.cardBg,
          padding: '20px',
          borderRadius: '20px',
          marginBottom: '30px',
          border: `2px solid ${theme.primary}`
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: theme.primary, marginBottom: '15px' }}>
            🌟 Set Up Cycle Tracking
          </h3>
          <p style={{ fontSize: '14px', color: theme.text, marginBottom: '15px', opacity: 0.8 }}>
            Go to Settings → Cycle tab to set your last period start date and begin tracking your cycle phases.
          </p>
        </div>
      )}

      {Object.entries(categories).map(([catKey, catInfo]) => {
        // Get metrics in this category
        const metricsInCategory = Object.entries(allMetrics).filter(
          ([key, metric]) => metric.category === catKey && isMetricEnabled(key)
        );

        // For NFP category, use nfpMetrics
        const nfpMetricsInCategory = catKey === 'nfp' && userPreferences.nfpMode
          ? Object.entries(nfpMetrics).filter(([key, metric]) =>
              !userPreferences.nfpMethod || metric.methods.includes(userPreferences.nfpMethod)
            )
          : [];

        const hasMetrics = metricsInCategory.length > 0 || nfpMetricsInCategory.length > 0;
        if (!hasMetrics) return null;

        const isExpanded = expandedSections[catKey];

        return (
          <div
            key={catKey}
            style={{
              marginBottom: '20px',
              border: `2px solid ${theme.light}`,
              borderRadius: '20px',
              overflow: 'hidden'
            }}
          >
            {/* Section header - clickable to expand/collapse */}
            <button
              onClick={() => toggleSection(catKey)}
              style={{
                width: '100%',
                padding: '20px',
                background: `linear-gradient(135deg, ${catInfo.color}15, ${theme.light}20)`,
                border: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{catInfo.icon}</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: theme.text }}>
                  {catInfo.name}
                </span>
              </div>
              <span style={{ fontSize: '24px', color: theme.text, transition: 'transform 0.3s ease', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>
                ▼
              </span>
            </button>

            {/* Section content */}
            {isExpanded && (
              <div style={{ padding: '20px' }}>
                {/* Render metrics based on type */}
                {metricsInCategory.map(([key, metric]) => (
                  <MetricInput
                    key={key}
                    metricKey={key}
                    metric={metric}
                    value={todayLog[key]}
                    onChange={(val) => handleInputChange(key, val)}
                    onToggleArray={(item) => toggleArrayItem(key, item)}
                    theme={theme}
                    isDarkTheme={isDarkTheme}
                    inputStyle={inputStyle}
                    getToggleButtonStyle={getToggleButtonStyle}
                    sectionHeaderStyle={sectionHeaderStyle}
                  />
                ))}

                {/* NFP metrics */}
                {nfpMetricsInCategory.map(([key, metric]) => (
                  <NFPMetricInput
                    key={key}
                    metricKey={key}
                    metric={metric}
                    value={todayLog[key]}
                    onChange={(val) => handleInputChange(key, val)}
                    theme={theme}
                    isDarkTheme={isDarkTheme}
                    inputStyle={inputStyle}
                    sectionHeaderStyle={sectionHeaderStyle}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Save button */}
      <button
        onClick={saveLog}
        style={{
          width: '100%',
          padding: '18px',
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          fontSize: '18px',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: `0 8px 25px ${theme.primary}66`,
          marginTop: '30px',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; }}
        onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; }}
      >
        💾 Save Today's Log
      </button>
    </div>
  );
};

// Metric Input Component (renders different UI based on metric type)
const MetricInput = ({
  metricKey,
  metric,
  value,
  onChange,
  onToggleArray,
  theme,
  isDarkTheme,
  inputStyle,
  getToggleButtonStyle,
  sectionHeaderStyle
}) => {
  // Define preset options for searchable fields
  const presetOptions = {
    cravings: ['chocolate', 'red meat', 'carbs', 'salty foods', 'sweets', 'spicy'],
    sexualActivity: ['solo', 'partnered'],
    mood: ['energized', 'calm', 'anxious', 'irritable', 'sad', 'happy'],
    flowHeaviness: ['spotting', 'light', 'medium', 'heavy', 'very heavy', 'none']
  };

  const renderInput = () => {
    switch(metricKey) {
      // Simple checkbox
      case 'periodDay':
        return (
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '18px',
            color: theme.text,
            fontWeight: '600'
          }}>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            {metric.icon} {metric.label}
          </label>
        );

      // Searchable tag inputs
      case 'cravings':
      case 'sexualActivity':
      case 'mood':
        return (
          <div>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            <SearchableTagInput
              value={value}
              onChange={onChange}
              presetOptions={presetOptions[metricKey] || []}
              placeholder={`Type and press Enter to add...`}
              theme={theme}
              isDarkTheme={isDarkTheme}
              inputStyle={inputStyle}
            />
          </div>
        );

      // Button select
      case 'bloating':
      case 'stressLevel':
        const options = metricKey === 'bloating'
          ? ['none', 'mild', 'moderate', 'severe']
          : ['relaxed', 'moderate', 'high', 'overwhelming'];
        
        return (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {options.map(opt => (
                <button
                  key={opt}
                  onClick={() => onChange(opt)}
                  style={getToggleButtonStyle(value === opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );

      // Number inputs
      case 'totalSleep':
      case 'deepSleep':
        return (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: theme.text, fontSize: '14px', fontWeight: '500' }}>
              {metric.icon} {metric.label} (hours)
            </label>
            <input
              type="number"
              step="0.5"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="7.5"
              style={inputStyle}
            />
          </div>
        );

      // Sliders
      case 'temperature':
      case 'clothingPreference':
        const labels = metricKey === 'temperature'
          ? ['Very Cold ❄️', 'Cold', 'Normal', 'Hot', 'Very Hot 🔥']
          : ['Very Fitted', 'Fitted', 'Neutral', 'Loose', 'Oversized'];
        
        return (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            <div style={{ padding: '20px 10px' }}>
              <input
                type="range"
                min="1"
                max="5"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '5px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <span style={{ color: theme.text, fontSize: '14px', fontWeight: '500' }}>{labels[0]}</span>
                <span style={{ color: theme.primary, fontSize: '16px', fontWeight: '700' }}>
                  {labels[value - 1]}
                </span>
                <span style={{ color: theme.text, fontSize: '14px', fontWeight: '500' }}>{labels[4]}</span>
              </div>
            </div>
          </div>
        );

      // Text area for notes
      case 'notes':
        return (
          <div>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="How are you feeling today? Any observations?"
              style={{
                ...inputStyle,
                minHeight: '100px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>
        );

      // Flow heaviness with searchable input
      case 'flowHeaviness':
        return (
          <div>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            <SearchableTagInput
              value={value ? [value] : []}
              onChange={(arr) => onChange(arr[0] || '')}
              presetOptions={presetOptions.flowHeaviness}
              placeholder="Select or type custom description..."
              theme={theme}
              isDarkTheme={isDarkTheme}
              inputStyle={inputStyle}
            />
          </div>
        );

      // Cycle pain (complex with searchable locations)
      case 'cyclePain':
        const commonPainLocations = ['head', 'neck', 'stomach', 'lower back', 'joints', 'cramps', 'breast', 'legs'];
        
        return (
          <div>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '14px', color: theme.text, marginBottom: '10px', fontWeight: '500' }}>Intensity:</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['none', 'mild', 'moderate', 'severe'].map(level => (
                  <button
                    key={level}
                    onClick={() => onChange({ ...value, intensity: level })}
                    style={getToggleButtonStyle(value.intensity === level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            {value.intensity && value.intensity !== 'none' && (
              <div>
                <div style={{ marginBottom: '15px' }}>
                  <p style={{ fontSize: '14px', color: theme.text, marginBottom: '10px', fontWeight: '500' }}>Location(s):</p>
                  <SearchableTagInput
                    value={value.locations || []}
                    onChange={(locs) => onChange({ ...value, locations: locs })}
                    presetOptions={commonPainLocations}
                    placeholder="Type location and press Enter..."
                    theme={theme}
                    isDarkTheme={isDarkTheme}
                    inputStyle={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: theme.text, fontSize: '14px' }}>
                    Custom Notes (optional):
                  </label>
                  <input
                    type="text"
                    value={value.customNotes || ''}
                    onChange={(e) => onChange({ ...value, customNotes: e.target.value })}
                    placeholder="e.g., sharp pain on left side, comes and goes, etc."
                    style={inputStyle}
                  />
                </div>
              </div>
            )}
          </div>
        );

      // Alcohol and Marijuana (simple checkboxes)
      case 'alcohol':
      case 'marijuana':
        return (
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            color: theme.text,
            fontWeight: '500',
            padding: '12px',
            background: value ? `${theme.primary}20` : 'transparent',
            borderRadius: '15px',
            transition: 'all 0.3s ease'
          }}>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            {metric.icon} {metric.label}
          </label>
        );

      // Caffeine tracking
      case 'caffeine':
        return (
          <div>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '15px' }}>
              {['coffee', 'tea', 'soda', 'energy drink'].map(type => {
                const existing = value.find(c => c.type === type);
                return (
                  <div key={type} style={{
                    padding: '15px',
                    background: existing ? `linear-gradient(135deg, ${theme.primary}20, ${theme.light}30)` : (isDarkTheme ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5'),
                    borderRadius: '15px',
                    border: existing ? `2px solid ${theme.primary}` : `2px solid ${theme.light}`
                  }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: theme.text, fontSize: '14px', textTransform: 'capitalize', fontWeight: '500' }}>
                      {type}
                    </label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="number"
                        min="0"
                        value={existing ? existing.cups : ''}
                        onChange={(e) => {
                          if (e.target.value === '' || e.target.value === '0') {
                            // Remove from caffeine array (passed via parent)
                            onChange(value.filter(c => c.type !== type));
                          } else {
                            // Add or update
                            const newCaffeine = existing
                              ? value.map(c => c.type === type ? { ...c, cups: parseInt(e.target.value) } : c)
                              : [...value, { type, cups: parseInt(e.target.value) }];
                            onChange(newCaffeine);
                          }
                        }}
                        placeholder="0"
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '10px',
                          border: `2px solid ${theme.light}`,
                          fontSize: '14px',
                          outline: 'none',
                          background: isDarkTheme ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                          color: theme.text
                        }}
                      />
                      <span style={{ color: theme.text, fontSize: '14px' }}>cups</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <p style={{ fontSize: '12px', color: theme.text, opacity: 0.7 }}>
              Total: {value.reduce((sum, c) => sum + c.cups, 0)} cups
            </p>
          </div>
        );

      // Naps tracking
      case 'naps':
        return (
          <div>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            {value.map((nap, index) => (
              <div key={index} style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '12px',
                background: `linear-gradient(135deg, ${theme.primary}20, ${theme.light}30)`,
                borderRadius: '15px'
              }}>
                <span style={{ color: theme.text, fontSize: '14px', flex: 1 }}>
                  {nap.time} • {nap.duration} min
                </span>
                <button
                  onClick={() => {
                    onChange(value.filter((_, i) => i !== index));
                  }}
                  style={{
                    background: theme.secondary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.text, fontSize: '14px' }}>
                  Time
                </label>
                <input
                  type="time"
                  id={`napTime-${metricKey}`}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.text, fontSize: '14px' }}>
                  Duration (min)
                </label>
                <input
                  type="number"
                  id={`napDuration-${metricKey}`}
                  placeholder="30"
                  style={inputStyle}
                />
              </div>
              <button
                onClick={() => {
                  const time = document.getElementById(`napTime-${metricKey}`).value;
                  const duration = document.getElementById(`napDuration-${metricKey}`).value;
                  if (time && duration) {
                    onChange([...value, { time, duration: parseInt(duration) }]);
                    document.getElementById(`napTime-${metricKey}`).value = '';
                    document.getElementById(`napDuration-${metricKey}`).value = '';
                  }
                }}
                style={{
                  padding: '12px 20px',
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Add
              </button>
            </div>
          </div>
        );

      // Exercise tracking
      case 'exercise':
        return (
          <div>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            {value.map((ex, index) => (
              <div key={index} style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '12px',
                background: `linear-gradient(135deg, ${theme.primary}20, ${theme.light}30)`,
                borderRadius: '15px'
              }}>
                <span style={{ color: theme.text, fontSize: '14px', flex: 1, textTransform: 'capitalize' }}>
                  {ex.type} • {ex.duration} min
                </span>
                <button
                  onClick={() => {
                    onChange(value.filter((_, i) => i !== index));
                  }}
                  style={{
                    background: theme.secondary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <div style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '14px', color: theme.text, marginBottom: '10px', fontWeight: '500' }}>Quick Select:</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['yoga', 'running', 'walking', 'cycling', 'swimming', 'strength training', 'dancing', 'pilates'].map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      document.getElementById(`exerciseType-${metricKey}`).value = type;
                    }}
                    style={{
                      padding: '8px 16px',
                      background: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                      color: theme.text,
                      border: `1px solid ${theme.light}`,
                      borderRadius: '15px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      textTransform: 'capitalize'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.text, fontSize: '14px' }}>
                  Type
                </label>
                <input
                  type="text"
                  id={`exerciseType-${metricKey}`}
                  placeholder="yoga, running, etc."
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.text, fontSize: '14px' }}>
                  Duration (min)
                </label>
                <input
                  type="number"
                  id={`exerciseDuration-${metricKey}`}
                  placeholder="30"
                  style={inputStyle}
                />
              </div>
              <button
                onClick={() => {
                  const type = document.getElementById(`exerciseType-${metricKey}`).value;
                  const duration = document.getElementById(`exerciseDuration-${metricKey}`).value;
                  if (type && duration) {
                    onChange([...value, { type: type.toLowerCase(), duration: parseInt(duration) }]);
                    document.getElementById(`exerciseType-${metricKey}`).value = '';
                    document.getElementById(`exerciseDuration-${metricKey}`).value = '';
                  }
                }}
                style={{
                  padding: '12px 20px',
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Add
              </button>
            </div>
          </div>
        );

      // Medication tracking with checkboxes
      case 'medications':
        return (
          <div>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            {value.map((med, medIndex) => (
              <div key={medIndex} style={{
                padding: '15px',
                background: `linear-gradient(135deg, ${theme.primary}10, ${theme.light}20)`,
                borderRadius: '15px',
                marginBottom: '15px',
                border: `2px solid ${theme.light}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: theme.text, fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>
                      {med.name}
                    </p>
                    {med.dosage && (
                      <p style={{ color: theme.text, fontSize: '14px', opacity: 0.7 }}>
                        {med.dosage}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      onChange(value.filter((_, i) => i !== medIndex));
                    }}
                    style={{
                      background: theme.secondary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    ×
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {Array.from({ length: med.timesPerDay }, (_, doseIndex) => {
                    const isTaken = med.taken.includes(doseIndex);
                    return (
                      <button
                        key={doseIndex}
                        onClick={() => {
                          const newMeds = value.map((m, i) => {
                            if (i === medIndex) {
                              const taken = m.taken.includes(doseIndex)
                                ? m.taken.filter(d => d !== doseIndex)
                                : [...m.taken, doseIndex];
                              return { ...m, taken };
                            }
                            return m;
                          });
                          onChange(newMeds);
                        }}
                        style={{
                          padding: '10px 16px',
                          background: isTaken 
                            ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` 
                            : isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : '#fff',
                          color: isTaken ? '#fff' : theme.text,
                          border: `2px solid ${isTaken ? 'transparent' : theme.light}`,
                          borderRadius: '12px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {isTaken ? '✓' : ''} Dose {doseIndex + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.text, fontSize: '14px' }}>
                  Medication Name
                </label>
                <input
                  type="text"
                  id={`medName-${metricKey}`}
                  placeholder="e.g., Ibuprofen"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.text, fontSize: '14px' }}>
                  Dosage
                </label>
                <input
                  type="text"
                  id={`medDosage-${metricKey}`}
                  placeholder="200mg"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.text, fontSize: '14px' }}>
                  Times/Day
                </label>
                <input
                  type="number"
                  id={`medTimes-${metricKey}`}
                  min="1"
                  max="10"
                  defaultValue="1"
                  style={inputStyle}
                />
              </div>
              <button
                onClick={() => {
                  const name = document.getElementById(`medName-${metricKey}`).value;
                  const dosage = document.getElementById(`medDosage-${metricKey}`).value;
                  const times = document.getElementById(`medTimes-${metricKey}`).value;
                  if (name) {
                    onChange([...value, { 
                      name, 
                      dosage, 
                      timesPerDay: parseInt(times) || 1,
                      taken: []
                    }]);
                    document.getElementById(`medName-${metricKey}`).value = '';
                    document.getElementById(`medDosage-${metricKey}`).value = '';
                    document.getElementById(`medTimes-${metricKey}`).value = '1';
                  }
                }}
                style={{
                  padding: '12px 20px',
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Add
              </button>
            </div>
            <p style={{ fontSize: '12px', color: theme.text, opacity: 0.7, marginTop: '10px' }}>
              💡 Tip: Check off each dose as you take it throughout the day
            </p>
          </div>
        );

      // TODO: other metrics
      default:
        return (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: theme.text, fontSize: '14px', opacity: 0.7 }}>
              {metric.icon} {metric.label} (coming soon)
            </p>
          </div>
        );
    }
  };

  return <div style={{ marginBottom: '25px' }}>{renderInput()}</div>;
};

// NFP Metric Input Component
const NFPMetricInput = ({
  metricKey,
  metric,
  value,
  onChange,
  theme,
  isDarkTheme,
  inputStyle,
  sectionHeaderStyle
}) => {
  const renderInput = () => {
    switch(metricKey) {
      case 'basalBodyTemp':
        return (
          <div>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            <input
              type="number"
              step="0.1"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="36.5"
              style={inputStyle}
            />
            <p style={{ fontSize: '12px', color: theme.text, opacity: 0.7, marginTop: '5px' }}>
              Temperature in °C (take immediately upon waking, before getting out of bed)
            </p>
          </div>
        );

      case 'cervicalMucus':
        return (
          <div>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['dry', 'sticky', 'creamy', 'egg white', 'watery'].map(type => (
                <button
                  key={type}
                  onClick={() => onChange(type)}
                  style={{
                    padding: '10px 20px',
                    background: value === type
                      ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                      : isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                    color: value === type ? '#fff' : theme.text,
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    textTransform: 'capitalize'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        );

      case 'cervicalPosition':
        return (
          <div>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            {['height', 'firmness', 'opening'].map(attr => (
              <div key={attr} style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '14px', color: theme.text, marginBottom: '8px', fontWeight: '500', textTransform: 'capitalize' }}>
                  {attr}:
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {(attr === 'height' ? ['low', 'medium', 'high'] :
                    attr === 'firmness' ? ['firm', 'medium', 'soft'] :
                    ['closed', 'partially open', 'open']).map(opt => (
                    <button
                      key={opt}
                      onClick={() => onChange({ ...value, [attr]: opt })}
                      style={{
                        padding: '8px 16px',
                        background: value[attr] === opt
                          ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                          : isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                        color: value[attr] === opt ? '#fff' : theme.text,
                        border: 'none',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        textTransform: 'capitalize'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'ovulationTest':
        return (
          <div>
            <h3 style={sectionHeaderStyle}>{metric.icon} {metric.label}</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['negative', 'low', 'high', 'peak'].map(result => (
                <button
                  key={result}
                  onClick={() => onChange(result)}
                  style={{
                    padding: '10px 20px',
                    background: value === result
                      ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                      : isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                    color: value === result ? '#fff' : theme.text,
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    textTransform: 'capitalize'
                  }}
                >
                  {result}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div style={{ marginBottom: '25px' }}>{renderInput()}</div>;
};

// Settings Modal Component
const SettingsModal = ({
  userPreferences,
  setUserPreferences,
  cycleSettings,
  setCycleSettings,
  theme,
  themes,
  isDarkTheme,
  allMetrics,
  nfpMetrics,
  onClose,
  inputStyle
}) => {
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      zIndex: 1000,
      overflowY: 'auto'
    }}>
      <div style={{
        background: theme.cardBg,
        borderRadius: '25px',
        padding: '40px',
        maxWidth: '700px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: theme.secondary, margin: 0 }}>
            ⚙️ Settings
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '32px',
              cursor: 'pointer',
              color: theme.text,
              padding: '0',
              width: '40px',
              height: '40px'
            }}
          >
            ×
          </button>
        </div>

        {/* Settings tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
          {['general', 'metrics', 'cycle', 'data'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSettingsTab(tab)}
              style={{
                padding: '10px 20px',
                background: activeSettingsTab === tab
                  ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                  : isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                color: activeSettingsTab === tab ? '#fff' : theme.text,
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Settings content */}
        {activeSettingsTab === 'general' && (
          <div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: theme.text, fontSize: '16px', fontWeight: '600' }}>
                Your Name
              </label>
              <input
                type="text"
                value={userPreferences.name}
                onChange={(e) => setUserPreferences({ ...userPreferences, name: e.target.value })}
                placeholder="Enter your name"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: theme.text, fontSize: '16px', fontWeight: '600' }}>
                Color Theme
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
                {Object.keys(themes).map(themeKey => (
                  <button
                    key={themeKey}
                    onClick={() => setUserPreferences({ ...userPreferences, currentTheme: themeKey })}
                    style={{
                      padding: '15px',
                      background: userPreferences.currentTheme === themeKey
                        ? `linear-gradient(135deg, ${themes[themeKey].primary}, ${themes[themeKey].secondary})`
                        : themes[themeKey].gradient,
                      border: userPreferences.currentTheme === themeKey ? `3px solid ${themes[themeKey].primary}` : '3px solid transparent',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      color: themes[themeKey].text,
                      fontWeight: '600',
                      fontSize: '14px'
                    }}
                  >
                    {themes[themeKey].name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSettingsTab === 'metrics' && (
          <div>
            <p style={{ color: theme.text, marginBottom: '20px', opacity: 0.8 }}>
              Choose which metrics to track in your daily log. Core metrics (Period Day, Flow, Pain) cannot be disabled.
            </p>
            {/* Metric toggles would go here - similar to onboarding step 3 */}
            <p style={{ color: theme.text }}>Metric customization coming soon...</p>
          </div>
        )}

        {activeSettingsTab === 'cycle' && (
          <div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: theme.text, fontSize: '16px', fontWeight: '600' }}>
                Last Period Start Date
              </label>
              <input
                type="date"
                value={cycleSettings.lastPeriodStart || ''}
                onChange={(e) => setCycleSettings({ ...cycleSettings, lastPeriodStart: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: theme.text, fontSize: '16px', fontWeight: '600' }}>
                Average Cycle Length (days)
              </label>
              <input
                type="number"
                min="14"
                max="40"
                value={cycleSettings.averageCycleLength}
                onChange={(e) => setCycleSettings({ ...cycleSettings, averageCycleLength: parseInt(e.target.value) || 28 })}
                style={inputStyle}
              />
            </div>
          </div>
        )}

        {activeSettingsTab === 'data' && (
          <div>
            <p style={{ color: theme.text, marginBottom: '20px' }}>
              Import and export your cycle data
            </p>
            <button
              style={{
                width: '100%',
                padding: '15px',
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                marginBottom: '15px'
              }}
            >
              📤 Export Data
            </button>
            <button
              style={{
                width: '100%',
                padding: '15px',
                background: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : '#f5f5f5',
                color: theme.text,
                border: 'none',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              📥 Import Data
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '15px',
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            marginTop: '30px'
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default CycleTrackerApp;
