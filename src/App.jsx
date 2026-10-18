import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trash2, Sun, Battery, BatteryCharging, Zap, ShieldAlert, Navigation, 
  Settings, Users, Activity, BarChart3, AlertTriangle, Truck, MapPin, Search, 
  Plus, RefreshCw, Cpu, Radio, CheckCircle, Clock, FileText, Lock, Unlock, 
  Wind, Camera, Thermometer, Filter, Layers, ChevronRight, Download, Send, 
  UserCheck, Bell, Sparkles, ArrowUpRight, Play, Pause, Smartphone, ShieldCheck,
  Maximize2, MoreHorizontal, User, Check, X, LayoutDashboard, Database, Wrench,
  AlertCircle, MessageSquare, Flame, Leaf, Compass, Crosshair, PhoneCall, Shield,
  Share2, Info, Eye, CheckCircle2, ChevronDown, ListFilter, Sliders, PlayCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';

const INITIAL_BINS = [
  { id: 'BIN-042', name: 'BIN-042 (MBU Campus Quad)', area: 'MBU Campus Zone', lat: 13.6288, lng: 79.4192, fill: 92, battery: 45, solar: 'Active / Charging', temp: 34, odor: 185, wasteType: 'Plastic & Wet Waste', status: 'RED ALERT', lastCleaned: '18 hrs ago', lockState: 'Locked', assignedWorker: 'Ramesh Kumar', riskScore: 'High' },
  { id: 'BIN-018', name: 'BIN-018 (Central Bus Stand Gate 1)', area: 'Tirupati Town', lat: 13.6320, lng: 79.4230, fill: 68, battery: 28, solar: 'Obstructed', temp: 30, odor: 110, wasteType: 'Paper & Organic', status: 'Partially Filled', lastCleaned: '5 hrs ago', lockState: 'Unlocked', assignedWorker: 'Srinivas V.', riskScore: 'Medium' },
  { id: 'BIN-007', name: 'BIN-007 (SV University Road)', area: 'Tirupati Town', lat: 13.6220, lng: 79.4080, fill: 24, battery: 94, solar: 'Active / Charging', temp: 28, odor: 35, wasteType: 'Dry Trash', status: 'Empty/Low', lastCleaned: '1 hr ago', lockState: 'Locked', assignedWorker: 'Unassigned', riskScore: 'Low' },
  { id: 'BIN-011', name: 'BIN-011 (Railway Station Platform 1)', area: 'Tirupati Town', lat: 13.6260, lng: 79.4150, fill: 88, battery: 80, solar: 'Active / Charging', temp: 33, odor: 210, wasteType: 'Food & Wet Waste', status: 'RED ALERT', lastCleaned: '14 hrs ago', lockState: 'Locked', assignedWorker: 'K. Venkatesh', riskScore: 'High' },
  { id: 'BIN-025', name: 'BIN-025 (Alipiri Checkpoint)', area: 'Alipiri Circle', lat: 13.6500, lng: 79.4000, fill: 45, battery: 88, solar: 'Active / Charging', temp: 27, odor: 50, wasteType: 'Plastic & Bottles', status: 'Partially Filled', lastCleaned: '3 hrs ago', lockState: 'Unlocked', assignedWorker: 'Unassigned', riskScore: 'Low' },
  { id: 'BIN-033', name: 'BIN-033 (Kapila Theertham Entrance)', area: 'Alipiri Circle', lat: 13.6420, lng: 79.4100, fill: 82, battery: 72, solar: 'Active / Charging', temp: 31, odor: 140, wasteType: 'E-Waste & Metals', status: 'RED ALERT', lastCleaned: '12 hrs ago', lockState: 'Locked', assignedWorker: 'Anil Reddy', riskScore: 'High' },
];

const PREDICTION_DATA = [
  { time: '06:00 AM', actual: 15, predicted: 18 },
  { time: '09:00 AM', actual: 35, predicted: 38 },
  { time: '12:00 PM', actual: 62, predicted: 60 },
  { time: '03:00 PM', actual: 78, predicted: 75 },
  { time: '06:00 PM', actual: 92, predicted: 89 },
  { time: '09:00 PM', actual: 95, predicted: 94 },
];

const OVERFLOW_HISTORY = [
  { day: 'Mon', count: 12, fuelSaved: 42 },
  { day: 'Tue', count: 8, fuelSaved: 50 },
  { day: 'Wed', count: 15, fuelSaved: 38 },
  { day: 'Thu', count: 19, fuelSaved: 30 },
  { day: 'Fri', count: 24, fuelSaved: 25 },
  { day: 'Sat', count: 31, fuelSaved: 18 },
  { day: 'Sun', count: 28, fuelSaved: 22 },
];

const CARBON_REDUCTION_DATA = [
  { month: 'Jan', co2: 240 },
  { month: 'Feb', co2: 310 },
  { month: 'Mar', co2: 450 },
  { month: 'Apr', co2: 520 },
  { month: 'May', co2: 680 },
  { month: 'Jun', co2: 890 },
];

const WASTE_CATEGORIES = [
  { name: 'Organic & Food', value: 40, color: '#10b981' },
  { name: 'Plastics & Polymers', value: 30, color: '#3b82f6' },
  { name: 'Paper & Cardboard', value: 18, color: '#f59e0b' },
  { name: 'E-Waste & Glass', value: 12, color: '#ef4444' },
];

const TASKS_DATA = [
  { id: 'TSK-101', binId: 'BIN-042', area: 'MBU Campus Quad', priority: 'Urgent', status: 'Assigned', worker: 'Ramesh Kumar', eta: '15 mins' },
  { id: 'TSK-102', binId: 'BIN-011', area: 'Railway Station', priority: 'Urgent', status: 'In-Progress', worker: 'K. Venkatesh', eta: '8 mins' },
  { id: 'TSK-103', binId: 'BIN-033', area: 'Kapila Theertham', priority: 'High', status: 'Pending', worker: 'Anil Reddy', eta: '35 mins' },
  { id: 'TSK-104', binId: 'BIN-018', area: 'Central Bus Stand', priority: 'Medium', status: 'Completed', worker: 'Srinivas V.', eta: 'Done' },
];

const COMPLAINTS_DATA = [
  { id: 'CMP-801', binId: 'BIN-042', user: 'Ananya S.', issue: 'Overflowing wet waste onto walkway', time: '25m ago', status: 'In Review', photo: '📸 Attaching photo... ' },
  { id: 'CMP-802', binId: 'BIN-018', user: 'Vikram R.', issue: 'Odor issue near bus waiting bench', time: '1h ago', status: 'Resolved', photo: '📸 Attaching photo... ' },
  { id: 'CMP-803', binId: 'BIN-011', user: 'Karthik M.', issue: 'Solar panel blocked by overhead banner', time: '3h ago', status: 'Pending', photo: '📸 Attaching photo... ' },
];

export default function App() {
  // Navigation & Role State
  const [role, setRole] = useState('Manager'); // 'Manager' | 'Worker' | 'Public'
  const [activeNav, setActiveNav] = useState('dashboard'); // 'dashboard' | 'map' | 'routes' | 'analytics' | 'telemetry' | 'tasks' | 'complaints'
  const [selectedArea, setSelectedArea] = useState('All');
  const [bins, setBins] = useState(INITIAL_BINS);
  const [selectedBin, setSelectedBin] = useState(INITIAL_BINS[0]);
  
  // UI Controls & States
  const [isSimulating, setIsSimulating] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeHardwareTab, setActiveHardwareTab] = useState('solar');
  const [routeSimulating, setRouteSimulating] = useState(false);

  // Community Reporting State
  const [reportBinId, setReportBinId] = useState('BIN-042');
  const [reportText, setReportText] = useState('');
  const [reportsList, setReportsList] = useState(COMPLAINTS_DATA);

  // New Bin Form State
  const [newBinId, setNewBinId] = useState('');
  const [newBinArea, setNewBinArea] = useState('MBU Campus Zone');

  // Simulation controls state
  const [simFill, setSimFill] = useState(selectedBin.fill);
  const [simBattery, setSimBattery] = useState(selectedBin.battery);
  const [simOdor, setSimOdor] = useState(selectedBin.odor);
  const [simTemp, setSimTemp] = useState(selectedBin.temp);
  const [simWasteType, setSimWasteType] = useState(selectedBin.wasteType);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  useEffect(() => {
    let interval;
    if (isSimulating) {
      interval = setInterval(() => {
        setBins((prevBins) =>
          prevBins.map((bin) => {
            if (bin.id === selectedBin?.id) {
              const fillDelta = Math.random() > 0.4 ? 1 : -1;
              const newFill = Math.min(100, Math.max(5, bin.fill + fillDelta));
              const newOdor = Math.min(300, Math.max(10, bin.odor + (fillDelta > 0 ? 2 : -2)));
              const updated = {
                ...bin,
                fill: newFill,
                odor: newOdor,
                status: newFill >= 80 ? 'RED ALERT' : newFill >= 50 ? 'Partially Filled' : 'Empty/Low'
              };
              setSelectedBin(updated);
              setSimFill(newFill);
              setSimOdor(newOdor);
              return updated;
            }
            return bin;
          })
        );
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isSimulating, selectedBin]);

  // Sync selected bin with simulator controls
  useEffect(() => {
    if (selectedBin) {
      setSimFill(selectedBin.fill);
      setSimBattery(selectedBin.battery);
      setSimOdor(selectedBin.odor);
      setSimTemp(selectedBin.temp);
      setSimWasteType(selectedBin.wasteType);
    }
  }, [selectedBin?.id]);

  const handleManualFillChange = (val) => {
    setSimFill(val);
    const updated = {
      ...selectedBin,
      fill: val,
      status: val >= 80 ? 'RED ALERT' : val >= 50 ? 'Partially Filled' : 'Empty/Low'
    };
    setSelectedBin(updated);
    setBins(bins.map(b => b.id === updated.id ? updated : b));
  };

  const handleManualBatteryChange = (val) => {
    setSimBattery(val);
    const updated = { ...selectedBin, battery: val };
    setSelectedBin(updated);
    setBins(bins.map(b => b.id === updated.id ? updated : b));
  };

  const handleManualOdorChange = (val) => {
    setSimOdor(val);
    const updated = { ...selectedBin, odor: val };
    setSelectedBin(updated);
    setBins(bins.map(b => b.id === updated.id ? updated : b));
  };

  const toggleLockState = (binId) => {
    setBins(bins.map(b => {
      if (b.id === binId) {
        const nextLock = b.lockState === 'Locked' ? 'Unlocked' : 'Locked';
        showToast(`${b.id} Electronic Lid Lock ${nextLock}`);
        const updated = { ...b, lockState: nextLock };
        if (selectedBin.id === binId) setSelectedBin(updated);
        return updated;
      }
      return b;
    }));
  };

  const markBinCleaned = (binId) => {
    setBins(bins.map(b => {
      if (b.id === binId) {
        const updated = { ...b, fill: 5, odor: 15, status: 'Empty/Low', lastCleaned: 'Just Now' };
        if (selectedBin.id === binId) setSelectedBin(updated);
        showToast(`Marked ${binId} as Cleaned & Reset Fill Level to 5%`);
        return updated;
      }
      return b;
    }));
  };

  // Filtered Bins List
  const filteredBins = useMemo(() => {
    if (selectedArea === 'All') return bins;
    return bins.filter(b => b.area === selectedArea);
  }, [bins, selectedArea]);

  const redAlertCount = bins.filter(b => b.status === 'RED ALERT').length;
  const avgFillLevel = Math.round(bins.reduce((acc, b) => acc + b.fill, 0) / bins.length);
  const avgBattery = Math.round(bins.reduce((acc, b) => acc + b.battery, 0) / bins.length);

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce text-xs border border-emerald-300">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {}
      <header className="bg-[#0b1322] border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between gap-4 shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/20">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm md:text-base tracking-wide flex items-center gap-2 text-slate-100">
              <span className="text-emerald-400 font-black">EcoBin AI</span>
              <span className="text-slate-400 font-normal hidden sm:inline">- SMART SOLAR WASTE DASHBOARD</span>
            </h1>
            <p className="text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ESP32 Telemetry Grid • Active Area: <span className="text-amber-400 font-semibold">{selectedArea}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 text-xs">
          
          {/* Interactive Hardware Showcase Splash Toggle */}
          <button 
            onClick={() => setShowSplash(!showSplash)}
            className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 text-slate-300 hover:text-emerald-400 px-3 py-1.5 rounded-lg transition font-medium text-xs hidden md:flex"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hardware Showcase</span>
          </button>

          {/* Area Filter Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <select 
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer font-medium text-xs"
            >
              <option value="All" className="bg-slate-900">All Regions</option>
              <option value="Tirupati Town" className="bg-slate-900">Tirupati Town</option>
              <option value="MBU Campus Zone" className="bg-slate-900">MBU Campus Zone</option>
              <option value="Alipiri Circle" className="bg-slate-900">Alipiri Circle</option>
            </select>
          </div>

          {/* Role Switcher Button */}
          <button 
            onClick={() => {
              const nextRole = role === 'Manager' ? 'Worker' : role === 'Worker' ? 'Public' : 'Manager';
              setRole(nextRole);
              showToast(`Switched workspace view to ${nextRole} Mode`);
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-lg hover:border-amber-400 transition font-semibold shadow-sm"
          >
            <User className="w-3.5 h-3.5" />
            <span>Role: {role}</span>
          </button>

          {/* Add Bin Trigger */}
          {role === 'Manager' && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow-lg shadow-emerald-500/20 text-xs"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">Add Bin</span>
            </button>
          )}
        </div>
      </header>

      {}
      {showSplash && (
        <div className="bg-[#0b1322] border-b border-emerald-500/30 p-4 relative transition-all">
          <button 
            onClick={() => setShowSplash(false)}
            className="absolute top-3 right-4 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-100 border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-5 space-y-2">
              <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                EcoBin Hardware Architecture
              </span>
              <h2 className="text-lg font-bold text-slate-100">Smart Solar Dustbin Node Blueprint</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Self-powered municipal waste receptacle featuring dual solar harvesting, ultrasonic volume sensing, AI waste material categorization camera, automated pneumatic lid locks, and odor gas detectors.
              </p>

              {/* Hardware Feature Callout Selector */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {[
                  { id: 'solar', label: 'Solar Top', icon: Sun },
                  { id: 'ultrasonic', label: 'Ultrasonic', icon: Radio },
                  { id: 'camera', label: 'AI Vision', icon: Camera },
                  { id: 'gas', label: 'Odor/Gas', icon: Wind },
                  { id: 'lock', label: 'Lid Lock', icon: Lock },
                  { id: 'anchors', label: 'Anchors', icon: Shield },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveHardwareTab(item.id)}
                    className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border text-xs font-semibold transition ${
                      activeHardwareTab === item.id 
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/10' 
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Vector Hardware Rendering */}
            <div className="md:col-span-7 bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col md:flex-row items-center justify-around gap-4">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Solar Panel Lid Top */}
                  <polygon 
                    points="40,40 160,40 145,15 55,15" 
                    fill={activeHardwareTab === 'solar' ? '#10b981' : '#1e293b'} 
                    stroke="#3b82f6" 
                    strokeWidth="2" 
                    className="transition-colors duration-300"
                  />
                  {/* Solar Cells Grid */}
                  <line x1="100" y1="15" x2="100" y2="40" stroke="#60a5fa" strokeWidth="1" />
                  <line x1="75" y1="15" x2="75" y2="40" stroke="#60a5fa" strokeWidth="1" />
                  <line x1="125" y1="15" x2="125" y2="40" stroke="#60a5fa" strokeWidth="1" />

                  {/* Bin Outer Body Frame */}
                  <rect x="45" y="48" width="110" height="130" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />

                  {/* Ultrasonic Sensor Ports */}
                  <circle cx="65" cy="62" r="4" fill={activeHardwareTab === 'ultrasonic' ? '#f59e0b' : '#334155'} />
                  <circle cx="80" cy="62" r="4" fill={activeHardwareTab === 'ultrasonic' ? '#f59e0b' : '#334155'} />

                  {/* AI Vision Camera Eye */}
                  <circle cx="100" cy="62" r="6" fill={activeHardwareTab === 'camera' ? '#3b82f6' : '#1e293b'} stroke="#60a5fa" strokeWidth="1.5" />

                  {/* Electronic Lock LED */}
                  <circle cx="135" cy="62" r="3" fill={activeHardwareTab === 'lock' ? '#ef4444' : '#10b981'} />

                  {/* Internal Waste Chamber Level */}
                  <rect x="55" y="80" width="90" height="85" rx="6" fill="#1e293b" opacity="0.7" />
                  <rect x="57" y="115" width="86" height="48" rx="4" fill="#10b981" opacity="0.8" />

                  {/* Gas Detector Vents */}
                  <rect x="140" y="95" width="8" height="20" rx="2" fill={activeHardwareTab === 'gas' ? '#f59e0b' : '#334155'} />

                  {/* Heavy Duty Base Anchors */}
                  <rect x="35" y="178" width="130" height="10" rx="3" fill={activeHardwareTab === 'anchors' ? '#f59e0b' : '#334155'} />
                </svg>
              </div>

              {/* Hardware Spec Description */}
              <div className="flex-1 space-y-2 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <h4 className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <Zap className="w-4 h-4" />
                    {activeHardwareTab === 'solar' && '12V 20W Monocrystalline Solar Lid'}
                    {activeHardwareTab === 'ultrasonic' && 'Dual HC-SR04 Ultrasonic Distance Sensors'}
                    {activeHardwareTab === 'camera' && 'ESP32-CAM Edge AI Waste Classifier'}
                    {activeHardwareTab === 'gas' && 'MQ-135 Air Quality & Methane Odor Module'}
                    {activeHardwareTab === 'lock' && '12V Electromagnetic Solenoid Lid Lock'}
                    {activeHardwareTab === 'anchors' && 'Heavy-Duty Reinforced Anti-Theft Base'}
                  </h4>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {activeHardwareTab === 'solar' && 'Captures ambient sunlight to recharge internal 12V LiFePO4 battery pack, powering continuous sensor monitoring and GSM transmission.'}
                    {activeHardwareTab === 'ultrasonic' && 'Measures exact waste volume fill percentage continuously with millimeter accuracy across dual angles inside the bin chamber.'}
                    {activeHardwareTab === 'camera' && 'Runs lightweight TensorFlow Lite models locally to automatically classify waste types (Plastic, Organic, Dry, Glass) on deposit.'}
                    {activeHardwareTab === 'gas' && 'Monitors hazardous methane gas and foul odor PPM levels to dispatch priority cleaning teams before health risks occur.'}
                    {activeHardwareTab === 'lock' && 'Prevents overflow spills or unauthorized access during scheduled lockouts, bad weather, or maintenance periods.'}
                    {activeHardwareTab === 'anchors' && 'Bolted directly into concrete foundation with ground vibration sensors to detect vandalism or tilt attempts.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Navigation Sidebar */}
        <aside className="w-16 md:w-56 bg-[#0b1322] border-r border-slate-800/80 flex flex-col justify-between py-4 shrink-0 transition-all">
          <div className="space-y-6">
            
            {/* System Status Banner */}
            <div className="px-3 hidden md:block">
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-1">
                <div className="flex justify-between items-center font-semibold text-slate-300">
                  <span>IoT Fleet Grid</span>
                  <span className="text-emerald-400 font-mono">100% ONLINE</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-full"></div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <nav className="px-2 space-y-1">
              {[
                { id: 'dashboard', label: 'Overview Hub', icon: LayoutDashboard },
                { id: 'map', label: 'GIS Live Map', icon: MapPin },
                { id: 'routes', label: 'AI Collection Routes', icon: Navigation },
                { id: 'analytics', label: 'Analytics & CO2', icon: BarChart3 },
                { id: 'telemetry', label: 'ESP32 Telemetry', icon: Cpu },
                { id: 'tasks', label: 'Field Staff Tasks', icon: Wrench },
                { id: 'complaints', label: 'Public Reports', icon: MessageSquare },
              ].map(nav => (
                <button
                  key={nav.id}
                  onClick={() => setActiveNav(nav.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-xs font-semibold ${
                    activeNav === nav.id 
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 font-extrabold' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <nav.icon className="w-4 h-4 shrink-0" />
                  <span className="hidden md:inline truncate">{nav.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom Settings & Simulation Trigger */}
          <div className="px-2 space-y-2">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition text-xs font-semibold"
            >
              <Sliders className="w-4 h-4 shrink-0 text-amber-400" />
              <span className="hidden md:inline truncate">Live Simulator</span>
            </button>
          </div>
        </aside>

        {/* Dynamic Content Views Render Section */}
        <main className="flex-1 p-3 md:p-4 overflow-y-auto bg-[#070b12]">
          
          {}
          {activeNav === 'dashboard' && (
            <div className="space-y-4">
              
              {/* Top Key Performance Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-[#0d1627] border border-slate-800/80 p-3.5 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Critical Alerts (&gt;80%)</span>
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-2xl font-black text-red-400">{redAlertCount} Bins</div>
                  <p className="text-[10px] text-slate-500 flex items-center gap-1">
                    <span className="text-red-400 font-bold">Action Needed</span> • Immediate dispatch
                  </p>
                </div>

                <div className="bg-[#0d1627] border border-slate-800/80 p-3.5 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Avg Capacity Fill</span>
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-slate-100">{avgFillLevel}%</div>
                  <p className="text-[10px] text-slate-500 flex items-center gap-1">
                    <span className="text-emerald-400 font-bold">Normal</span> across {bins.length} connected bins
                  </p>
                </div>

                <div className="bg-[#0d1627] border border-slate-800/80 p-3.5 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>Solar Grid Power</span>
                    <Sun className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-400">{avgBattery}%</div>
                  <p className="text-[10px] text-slate-500">Dual solar panel active charging</p>
                </div>

                <div className="bg-[#0d1627] border border-slate-800/80 p-3.5 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs">
                    <span>CO₂ Saved This Month</span>
                    <Leaf className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-400">890 kg</div>
                  <p className="text-[10px] text-slate-500">Via AI collection optimization</p>
                </div>
              </div>

              {/* Main 3-Column Operations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
                
                {/* Column 1: Live Interactive Mini Map & Quick Bin Roster */}
                <div className="lg:col-span-4 space-y-3 flex flex-col">
                  <div className="bg-[#0d1627] border border-slate-800/80 rounded-xl p-3 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-xs text-slate-200 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400" /> GIS Location Map
                      </h3>
                      <button onClick={() => setActiveNav('map')} className="text-[10px] text-emerald-400 hover:underline">
                        Full Map &rarr;
                      </button>
                    </div>

                    {/* Vector Map Component */}
                    <div className="h-60 bg-slate-950 rounded-lg border border-slate-800 relative overflow-hidden flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full opacity-30">
                        <pattern id="grid-mini" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid-mini)" />
                        <path d="M 0 80 Q 150 100 400 60" stroke="#334155" strokeWidth="8" fill="none" />
                        <path d="M 60 0 L 100 300" stroke="#334155" strokeWidth="6" fill="none" />
                      </svg>

                      {/* Map Pins */}
                      {filteredBins.map((bin) => {
                        const isSelected = selectedBin.id === bin.id;
                        const colorClass = 
                          bin.fill >= 80 ? 'bg-red-500 shadow-red-500/80 ring-2 ring-red-400/50' :
                          bin.fill >= 50 ? 'bg-amber-400 shadow-amber-400/80 ring-2 ring-amber-300/50' :
                          'bg-emerald-500 shadow-emerald-500/80 ring-2 ring-emerald-400/50';

                        return (
                          <div 
                            key={bin.id} 
                            onClick={() => setSelectedBin(bin)}
                            className={`absolute cursor-pointer transition-all ${isSelected ? 'z-30 scale-125' : 'hover:scale-110'}`}
                            style={{
                              left: `${((bin.lng - 79.4000) / 0.03) * 70 + 15}%`,
                              top: `${((13.6500 - bin.lat) / 0.03) * 70 + 15}%`
                            }}
                          >
                            <div className={`w-4 h-4 rounded-full ${colorClass} border border-slate-950 shadow-md animate-pulse`}></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bin List Roster */}
                  <div className="bg-[#0d1627] border border-slate-800/80 rounded-xl p-3 space-y-2">
                    <h4 className="text-xs font-bold text-slate-300 flex justify-between items-center">
                      <span>Monitored Bins ({filteredBins.length})</span>
                      <span className="text-[10px] text-slate-500">Click to focus</span>
                    </h4>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {filteredBins.map(bin => (
                        <div 
                          key={bin.id}
                          onClick={() => setSelectedBin(bin)}
                          className={`p-2 rounded-lg border text-xs cursor-pointer flex justify-between items-center transition ${
                            selectedBin.id === bin.id 
                              ? 'bg-slate-800/90 border-emerald-500/50 text-slate-100' 
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-900'
                          }`}
                        >
                          <div>
                            <span className="font-bold font-mono text-slate-200">{bin.id}</span>
                            <p className="text-[10px] text-slate-400 truncate w-32">{bin.name}</p>
                          </div>
                          <div className="text-right">
                            <span className={`font-bold ${bin.fill >= 80 ? 'text-red-400' : bin.fill >= 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                              {bin.fill}%
                            </span>
                            <p className="text-[9px] text-slate-500">{bin.lockState}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2: Focused Bin Live Graphic & Hardware Controls */}
                <div className="lg:col-span-5 bg-[#0d1627] border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                        Active Bin Node Focus - <span className="text-emerald-400 font-mono">{selectedBin.id}</span>
                      </h3>
                      <p className="text-xs text-slate-400">{selectedBin.name}</p>
                    </div>

                    {/* Remote Lid Lock Trigger Button */}
                    <button 
                      onClick={() => toggleLockState(selectedBin.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                        selectedBin.lockState === 'Locked' 
                          ? 'bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30' 
                          : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                      }`}
                    >
                      {selectedBin.lockState === 'Locked' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                      <span>{selectedBin.lockState}</span>
                    </button>
                  </div>

                  {/* 3D Visual Bin Graphic */}
                  <div className="relative py-2 flex items-center justify-center bg-slate-950/80 rounded-xl border border-slate-800/80">
                    <svg viewBox="0 0 280 260" className="w-56 h-56 drop-shadow-xl">
                      {/* Solar Lid Top */}
                      <polygon points="60,50 220,50 200,20 80,20" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                      <line x1="140" y1="20" x2="140" y2="50" stroke="#60a5fa" strokeWidth="1" />
                      <line x1="110" y1="20" x2="110" y2="50" stroke="#60a5fa" strokeWidth="1" />
                      <line x1="170" y1="20" x2="170" y2="50" stroke="#60a5fa" strokeWidth="1" />

                      {/* Dustbin Body */}
                      <rect x="65" y="60" width="150" height="170" rx="16" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
                      
                      {/* Inner Chamber Background */}
                      <rect x="78" y="75" width="124" height="140" rx="8" fill="#1e293b" opacity="0.6" />
                      
                      {/* Dynamic Fill Level Bar */}
                      <rect 
                        x="80" 
                        y={213 - (selectedBin.fill * 1.3)} 
                        width="120" 
                        height={selectedBin.fill * 1.3} 
                        rx="6" 
                        fill={selectedBin.fill >= 80 ? '#ef4444' : selectedBin.fill >= 50 ? '#f59e0b' : '#10b981'} 
                        opacity="0.85" 
                        className="transition-all duration-500"
                      />

                      {/* Sensor Specs Badges */}
                      <text x="140" y="140" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">
                        {selectedBin.fill}%
                      </text>
                      <text x="140" y="158" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        {selectedBin.status}
                      </text>
                    </svg>
                  </div>

                  {/* Telemetry Sensor Gauges */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Solar Battery</span>
                      <span className="font-bold text-blue-400 flex items-center justify-center gap-1 mt-0.5">
                        <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" /> {selectedBin.battery}%
                      </span>
                    </div>

                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Odor / Gas PPM</span>
                      <span className={`font-bold flex items-center justify-center gap-1 mt-0.5 ${selectedBin.odor > 150 ? 'text-red-400' : 'text-emerald-400'}`}>
                        <Wind className="w-3.5 h-3.5" /> {selectedBin.odor} PPM
                      </span>
                    </div>

                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Temperature</span>
                      <span className="font-bold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                        <Thermometer className="w-3.5 h-3.5" /> {selectedBin.temp}°C
                      </span>
                    </div>
                  </div>

                  {/* Action Commands */}
                  <div className="flex gap-2 pt-1">
                    <button 
                      onClick={() => markBinCleaned(selectedBin.id)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
                    >
                      <CheckCircle className="w-4 h-4" /> Mark as Cleaned
                    </button>
                    
                    <button 
                      onClick={() => {
                        setActiveNav('routes');
                        showToast(`Calculating optimal truck route to ${selectedBin.id}`);
                      }}
                      className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold px-3 py-2 rounded-lg text-xs transition flex items-center gap-1"
                    >
                      <Truck className="w-4 h-4 text-amber-400" /> Dispatch Route
                    </button>
                  </div>
                </div>

                {/* Column 3: AI Predictions & Quick Staff Workflows */}
                <div className="lg:col-span-3 space-y-3 flex flex-col justify-between">
                  
                  {/* AI Prediction Chart */}
                  <div className="bg-[#0d1627] border border-slate-800/80 rounded-xl p-3 space-y-2">
                    <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Overflow Prediction
                    </h3>
                    <p className="text-[10px] text-slate-400">Forecasted fill levels for {selectedBin.id}</p>
                    
                    <div className="h-28 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={PREDICTION_DATA}>
                          <defs>
                            <linearGradient id="aiFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '10px' }} />
                          <Area type="monotone" dataKey="actual" stroke="#f59e0b" strokeWidth={2} fill="url(#aiFill)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Field Staff Dispatch List */}
                  <div className="bg-[#0d1627] border border-slate-800/80 rounded-xl p-3 space-y-2">
                    <h3 className="text-xs font-bold text-slate-200 flex items-center justify-between">
                      <span>Field Staff Roster</span>
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                    </h3>

                    <div className="space-y-1.5 text-xs">
                      {TASKS_DATA.slice(0, 3).map(task => (
                        <div key={task.id} className="p-2 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center text-[11px]">
                          <div>
                            <p className="font-semibold text-slate-200">{task.worker}</p>
                            <p className="text-[9px] text-slate-500">{task.binId} • {task.area}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            task.status === 'In-Progress' ? 'bg-amber-500/20 text-amber-400' : 
                            task.status === 'Assigned' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Broadcast Dispatch Trigger Button */}
                  <button 
                    onClick={() => showToast('Dispatched SMS alert to all municipal collection drivers!')}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs py-2.5 rounded-xl transition shadow-lg shadow-emerald-500/20 uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Emergency Dispatch
                  </button>

                </div>

              </div>
            </div>
          )}

          {}
          {activeNav === 'map' && (
            <div className="bg-[#0d1627] border border-slate-800/80 rounded-xl p-4 space-y-3 h-full flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-400" /> Municipal GIS Mapping & GPS Fleet Grid
                  </h2>
                  <p className="text-xs text-slate-400">Real-time status of all solar dustbins across Tirupati Town and MBU Campus</p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Green: Low
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span> Yellow: Mid
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Red: Alert
                  </span>
                </div>
              </div>

              {/* Vector Full GIS Map Frame */}
              <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden min-h-[450px] flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full opacity-25">
                  <pattern id="grid-full" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid-full)" />
                  <path d="M 0 150 Q 250 180 800 120" stroke="#334155" strokeWidth="16" fill="none" />
                  <path d="M 180 0 L 220 600" stroke="#334155" strokeWidth="12" fill="none" />
                  <path d="M 520 0 L 560 600" stroke="#334155" strokeWidth="10" fill="none" />
                  <path d="M 0 400 L 800 380" stroke="#334155" strokeWidth="14" fill="none" />
                </svg>

                {/* Map Bin Pin Overlays */}
                <div className="absolute inset-0 p-8 flex flex-col justify-around">
                  {filteredBins.map((bin) => {
                    const isSelected = selectedBin.id === bin.id;
                    const colorClass = 
                      bin.fill >= 80 ? 'bg-red-500 shadow-red-500/80 ring-4 ring-red-500/30' :
                      bin.fill >= 50 ? 'bg-amber-400 shadow-amber-400/80 ring-4 ring-amber-400/30' :
                      'bg-emerald-500 shadow-emerald-500/80 ring-4 ring-emerald-500/30';

                    return (
                      <div 
                        key={bin.id} 
                        onClick={() => setSelectedBin(bin)}
                        className={`absolute cursor-pointer transition-all ${isSelected ? 'z-40 scale-125' : 'hover:scale-110 z-10'}`}
                        style={{
                          left: `${((bin.lng - 79.4000) / 0.03) * 75 + 10}%`,
                          top: `${((13.6500 - bin.lat) / 0.03) * 75 + 10}%`
                        }}
                      >
                        <div className={`w-6 h-6 rounded-full ${colorClass} shadow-xl border-2 border-slate-950 flex items-center justify-center font-bold text-[10px] text-slate-950`}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </div>

                        {/* Interactive Hover Popup Modal */}
                        {isSelected && (
                          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#09111e]/95 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs w-60 z-50 backdrop-blur space-y-2">
                            <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                              <span className="font-bold text-slate-100 font-mono flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-red-400" /> {bin.id}
                              </span>
                              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{bin.area}</span>
                            </div>
                            
                            <div className="space-y-1 text-slate-300 text-[11px]">
                              <p className="flex justify-between"><span>Fill Level:</span> <strong className="text-red-400">{bin.fill}%</strong></p>
                              <p className="flex justify-between"><span>Battery / Solar:</span> <strong className="text-emerald-400">{bin.battery}% ({bin.solar})</strong></p>
                              <p className="flex justify-between"><span>Air / Odor PPM:</span> <strong className="text-amber-400">{bin.odor} PPM</strong></p>
                              <p className="flex justify-between"><span>AI Classification:</span> <strong className="text-blue-400">{bin.wasteType}</strong></p>
                            </div>

                            <div className="grid grid-cols-2 gap-1.5 pt-1">
                              <button 
                                onClick={(e) => { e.stopPropagation(); toggleLockState(bin.id); }}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1 rounded text-[10px] font-bold border border-slate-700"
                              >
                                {bin.lockState === 'Locked' ? 'Unlock Lid' : 'Lock Lid'}
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); markBinCleaned(bin.id); }}
                                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-1 rounded text-[10px] font-bold"
                              >
                                Clean Bin
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {}
          {activeNav === 'routes' && (
            <div className="bg-[#0d1627] border border-slate-800/80 rounded-xl p-4 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-amber-400" /> AI Dynamic Route Optimization Engine
                  </h2>
                  <p className="text-xs text-slate-400">Calculates fuel-efficient collection paths prioritizing overflowing dustbins (&gt;80%)</p>
                </div>

                <button 
                  onClick={() => {
                    setRouteSimulating(true);
                    showToast('Calculating TSP optimal truck path...');
                    setTimeout(() => {
                      setRouteSimulating(false);
                      showToast('Optimized route generated: Saved 3.8 km & 22 mins!');
                    }, 2000);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{routeSimulating ? 'Computing Route...' : 'Recalculate Optimal Route'}</span>
                </button>
              </div>

              {/* Route Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400">Target Priority Bins</span>
                  <div className="text-xl font-bold text-red-400">{redAlertCount} Bins</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400">Total Route Distance</span>
                  <div className="text-xl font-bold text-slate-100">12.4 km <span className="text-xs text-emerald-400">(-3.8 km)</span></div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400">Estimated Fuel Usage</span>
                  <div className="text-xl font-bold text-amber-400">2.1 Liters</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400">Est. Collection Time</span>
                  <div className="text-xl font-bold text-emerald-400">35 Minutes</div>
                </div>
              </div>

              {/* Simulated Route Sequence Table */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-300">Optimal Stop Sequence for Truck #04</h3>
                <div className="space-y-1.5 text-xs">
                  {bins.filter(b => b.fill >= 50).map((bin, index) => (
                    <div key={bin.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-bold text-slate-200">{bin.id} - {bin.name}</p>
                          <p className="text-[10px] text-slate-500">Fill: {bin.fill}% • Waste Type: {bin.wasteType}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400 font-mono">ETA: {10 + index * 8} mins</span>
                        <button 
                          onClick={() => markBinCleaned(bin.id)}
                          className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-bold px-2.5 py-1 rounded text-[10px] transition"
                        >
                          Mark Collected
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {}
          {activeNav === 'analytics' && (
            <div className="bg-[#0d1627] border border-slate-800/80 rounded-xl p-4 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" /> Carbon Reduction & Waste Analytics
                </h2>
                <p className="text-xs text-slate-400">Historical metrics on waste composition, overflow prevention, and municipal fuel savings</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Waste Material Composition Pie Chart */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="text-xs font-bold text-slate-300">AI Material Categorization Breakdown</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={WASTE_CATEGORIES} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                          {WASTE_CATEGORIES.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '10px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Monthly Carbon Reduction Trend Line */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="text-xs font-bold text-slate-300">Monthly CO₂ Emission Reduction (kg)</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={CARBON_REDUCTION_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                        <YAxis stroke="#64748b" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '10px' }} />
                        <Line type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {}
          {activeNav === 'telemetry' && (
            <div className="bg-[#0d1627] border border-slate-800/80 rounded-xl p-4 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-400" /> IoT & ESP32 Live Telemetry Terminal
                </h2>
                <p className="text-xs text-slate-400">Raw diagnostic feeds from embedded Microcontrollers, GSM modules, and Solar charge controllers</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {bins.map(bin => (
                  <div key={bin.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                      <span className="font-bold text-slate-200">{bin.id}</span>
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ONLINE
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-400 text-[11px]">
                      <p>• MCU: ESP32-WROOM-32U</p>
                      <p>• Firmware: v2.4.1-build8</p>
                      <p>• Battery Level: {bin.battery}% ({bin.solar})</p>
                      <p>• Ultrasonic Raw Dist: {Math.round(200 - (bin.fill * 1.8))} mm</p>
                      <p>• Gas Sensor MQ-135: {bin.odor} PPM</p>
                      <p>• Core Temp: {bin.temp}°C</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {}
          {activeNav === 'tasks' && (
            <div className="bg-[#0d1627] border border-slate-800/80 rounded-xl p-4 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-emerald-400" /> Field Worker Task & Schedule Manager
                </h2>
                <p className="text-xs text-slate-400">Automated cleaning task assignment and real-time status monitoring for sanitation workers</p>
              </div>

              <div className="space-y-2">
                {TASKS_DATA.map(task => (
                  <div key={task.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono text-emerald-400">{task.id}</span>
                        <span className="font-bold text-slate-200">{task.binId} - {task.area}</span>
                        <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] px-2 py-0.5 rounded font-bold">{task.priority}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Assigned Worker: <strong className="text-slate-200">{task.worker}</strong> • ETA: {task.eta}</p>
                    </div>

                    <button 
                      onClick={() => showToast(`Task ${task.id} marked complete by ${role}`)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Complete Task
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {}
          {activeNav === 'complaints' && (
            <div className="bg-[#0d1627] border border-slate-800/80 rounded-xl p-4 space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" /> Community Feedback & Public Reporting
                </h2>
                <p className="text-xs text-slate-400">Submit geotagged photos and complaints regarding damaged or overflowing dustbins</p>
              </div>

              {/* Public Form Submit Module */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-200">Submit New Community Report</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Select Nearest Dustbin</label>
                    <select 
                      value={reportBinId}
                      onChange={(e) => setReportBinId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                    >
                      {bins.map(b => (
                        <option key={b.id} value={b.id}>{b.id} ({b.name})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Complaint Details</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Lid stuck or odor issue..." 
                      value={reportText}
                      onChange={(e) => setReportText(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (!reportText) return;
                    const newReport = {
                      id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
                      binId: reportBinId,
                      user: 'You (Citizen)',
                      issue: reportText,
                      time: 'Just now',
                      status: 'Pending',
                      photo: '📸 Photo Attached'
                    };
                    setReportsList([newReport, ...reportsList]);
                    setReportText('');
                    showToast('Report submitted! Municipal team alerted.');
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs"
                >
                  Submit Report
                </button>
              </div>

              {/* Complaints List */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-300">Submitted Complaints Log</h3>
                <div className="space-y-1.5 text-xs">
                  {reportsList.map(item => (
                    <div key={item.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <span className="font-mono text-emerald-400 font-bold">{item.id}</span> • <span className="font-bold text-slate-200">{item.binId}</span>
                        <p className="text-slate-300 mt-0.5">{item.issue}</p>
                        <p className="text-[10px] text-slate-500">{item.user} • {item.time}</p>
                      </div>

                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                        item.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d1627] border border-slate-800 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Plus className="text-emerald-400 w-4 h-4" /> Register & Deploy New Smart Bin Node
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Bin Serial Code</label>
                <input 
                  type="text" 
                  value={newBinId} 
                  onChange={(e) => setNewBinId(e.target.value)}
                  placeholder="e.g. BIN-099" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Region / Zone</label>
                <select 
                  value={newBinArea}
                  onChange={(e) => setNewBinArea(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 outline-none"
                >
                  <option value="MBU Campus Zone">MBU Campus Zone</option>
                  <option value="Tirupati Town">Tirupati Town</option>
                  <option value="Alipiri Circle">Alipiri Circle</option>
                </select>
              </div>

              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-2 text-[11px] text-slate-300">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>ESP32 Hardware Signal Detected Nearby!</span>
              </div>

              <button 
                onClick={() => {
                  const bId = newBinId || `BIN-0${bins.length + 15}`;
                  const newBin = {
                    id: bId,
                    name: `${bId} (${newBinArea})`,
                    area: newBinArea,
                    lat: 13.6290,
                    lng: 79.4180,
                    fill: 10,
                    battery: 99,
                    solar: 'Active / Charging',
                    temp: 27,
                    odor: 18,
                    wasteType: 'Dry & Recyclables',
                    status: 'Empty/Low',
                    lastCleaned: 'Just Now',
                    lockState: 'Locked',
                    assignedWorker: 'Unassigned',
                    riskScore: 'Low'
                  };
                  setBins([...bins, newBin]);
                  setIsAddModalOpen(false);
                  showToast(`Smart Bin ${bId} successfully paired via Bluetooth/GSM!`);
                }}
                className="w-full bg-emerald-500 text-slate-950 font-bold py-2 rounded-lg mt-2 shadow-md shadow-emerald-500/20 hover:bg-emerald-400 transition"
              >
                Pair & Register Hardware
              </button>
            </div>

            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-400 text-xs py-2 rounded-lg hover:text-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d1627] border border-slate-800 rounded-2xl p-5 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Sliders className="text-amber-400 w-4 h-4" /> Hackathon Sensor Live Simulator
              </h3>
              <X className="w-4 h-4 text-slate-400 cursor-pointer" onClick={() => setIsSettingsOpen(false)} />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Simulate Fill Level (%)</span>
                  <span className="font-bold text-red-400">{simFill}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={simFill} 
                  onChange={(e) => handleManualFillChange(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Simulate Battery (%)</span>
                  <span className="font-bold text-blue-400">{simBattery}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={simBattery} 
                  onChange={(e) => handleManualBatteryChange(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Simulate Gas / Odor (PPM)</span>
                  <span className="font-bold text-amber-400">{simOdor} PPM</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="300" 
                  value={simOdor} 
                  onChange={(e) => handleManualOdorChange(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer" 
                />
              </div>

              <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-300">Live Auto Loop Simulation</span>
                <button 
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`px-3 py-1 rounded text-xs font-bold transition ${
                    isSimulating 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isSimulating ? 'ACTIVE' : 'PAUSED'}
                </button>
              </div>
            </div>

            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="w-full bg-emerald-500 text-slate-950 font-bold py-2 rounded-lg text-xs"
            >
              Apply Simulator Values
            </button>
          </div>
        </div>
      )}

    </div>
  );
}