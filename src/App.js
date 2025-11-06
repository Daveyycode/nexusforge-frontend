import React, { useState } from 'react';
import { Sparkles, Zap, Code, Rocket, Check, Menu, X, Settings, Edit3, Play, Download, Share2, Database, Cloud, Lock, Users, Bell, BarChart, FileCode, Palette, Layers, GitBranch, MessageCircle, Brain, Sun, Moon, Copy, Terminal, Globe, Shield, Cpu, Box, Workflow } from 'lucide-react';

export default function AIAppBuilder() {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [credits, setCredits] = useState(500);
  const [showPreview, setShowPreview] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [generatedApps, setGeneratedApps] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editDescription, setEditDescription] = useState('');
  const [activeTab, setActiveTab] = useState('builder');
  const [darkMode, setDarkMode] = useState(false);
  
  // AI Assistant State
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [selectedAI, setSelectedAI] = useState('claude');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isAIChatting, setIsAIChatting] = useState(false);

  const aiModels = [
    { id: 'claude', name: 'Claude', icon: '🧠', color: 'from-amber-500 to-orange-500' },
    { id: 'gpt4', name: 'GPT-4', icon: '🤖', color: 'from-green-500 to-emerald-500' },
    { id: 'grok', name: 'Grok', icon: '⚡', color: 'from-blue-500 to-cyan-500' },
    { id: 'deepseek', name: 'DeepSeek', icon: '🔮', color: 'from-purple-500 to-pink-500' },
    { id: 'gemini', name: 'Gemini', icon: '💎', color: 'from-indigo-500 to-blue-500' }
  ];

const handleGenerate = async () => {
  if (description.trim() && credits >= 40) {
    setIsGenerating(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/generate-app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: description,
          userId: 1 // Mock user ID for now
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        const newApp = {
          id: Date.now(),
          description: description,
          createdAt: new Date().toLocaleString(),
          status: 'ready',
          code: data.code
        };
        setGeneratedApps([newApp, ...generatedApps]);
        setCredits(credits - 40);
        setShowPreview(true);
        setDescription('');
      }
    } catch (error) {
      console.error('Error generating app:', error);
      alert('Failed to generate app. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }
};
  const handleEdit = () => {
    if (editDescription.trim() && credits >= 1) {
      setIsGenerating(true);
      setTimeout(() => {
        setCredits(credits - 1);
        setIsGenerating(false);
        setEditMode(false);
        setEditDescription('');
        alert('App updated successfully! 1 credit used.');
      }, 2000);
    }
  };

const handleAIChat = async () => {
  if (dailyQuestions >= questionsLimit) {
    setShowUpgradeModal(true);
    return;
  }
  
  if (chatInput.trim()) {
    const userMessage = { role: 'user', content: chatInput };
    setChatMessages([...chatMessages, userMessage]);
    setChatInput('');
    setIsAIChatting(true);
    setDailyQuestions(dailyQuestions + 1);

    try {
      const response = await fetch('http://localhost:3001/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: chatInput,
          aiModel: selectedAI,
          userId: 1
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        const aiMessage = { role: 'assistant', content: data.response };
        setChatMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('AI chat error:', error);
    } finally {
      setIsAIChatting(false);
    }
  }
};
  const useAIIdea = () => {
    if (chatMessages.length > 0) {
      const lastUserMessage = chatMessages.filter(m => m.role === 'user').pop();
      if (lastUserMessage) {
        setDescription(lastUserMessage.content);
        setShowAIAssistant(false);
      }
    }
  };

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
  const subTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderClass = darkMode ? 'border-gray-700' : 'border-orange-100';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md border-b ${borderClass} sticky top-0 z-50 shadow-sm transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-yellow-500 via-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className={`text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent`}>
                  NexusForge
                </span>
                <p className={`text-xs ${subTextClass}`}>AI App Builder Pro</p>
              </div>
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className={textClass} /> : <Menu className={textClass} />}
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setActiveTab('builder')}
                className={`${activeTab === 'builder' ? 'text-orange-600' : subTextClass} hover:text-orange-600 transition font-medium`}
              >
                Builder
              </button>
              <button 
                onClick={() => setActiveTab('apps')}
                className={`${activeTab === 'apps' ? 'text-orange-600' : subTextClass} hover:text-orange-600 transition font-medium`}
              >
                My Apps
              </button>
              <button 
                onClick={() => setActiveTab('templates')}
                className={`${activeTab === 'templates' ? 'text-orange-600' : subTextClass} hover:text-orange-600 transition font-medium`}
              >
                Templates
              </button>
              <a href="#pricing" className={`${subTextClass} hover:text-orange-600 transition font-medium`}>Pricing</a>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} hover:scale-110 transition`}
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>

              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-5 py-2.5 rounded-full shadow-sm">
                <Zap className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-orange-700">{credits}</span>
                <span className="text-sm text-orange-600">credits</span>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
                Upgrade
              </button>
            </nav>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
              <button onClick={() => setActiveTab('builder')} className={`text-left ${subTextClass} hover:text-orange-600 transition`}>Builder</button>
              <button onClick={() => setActiveTab('apps')} className={`text-left ${subTextClass} hover:text-orange-600 transition`}>My Apps</button>
              <button onClick={() => setActiveTab('templates')} className={`text-left ${subTextClass} hover:text-orange-600 transition`}>Templates</button>
              <a href="#pricing" className={`${subTextClass} hover:text-orange-600 transition`}>Pricing</a>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
                </button>
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 text-orange-600" />
                  <span className="font-bold text-orange-700">{credits} credits</span>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* AI Assistant Chat Box */}
      {showAIAssistant && (
        <div className="fixed bottom-6 left-6 z-50 w-96 max-w-[calc(100vw-3rem)] animate-in slide-in-from-left">
          <div className={`${cardBgClass} rounded-2xl shadow-2xl border-2 ${darkMode ? 'border-gray-700' : 'border-orange-200'} overflow-hidden`}>
            <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-white" />
                <div>
                  <h3 className="font-bold text-white">AI Assistant</h3>
                  <p className="text-xs text-white/80">Free consultation - No credits used!</p>
                </div>
              </div>
              <button onClick={() => setShowAIAssistant(false)} className="text-white hover:bg-white/20 p-1 rounded transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Model Selection */}
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <label className={`text-xs font-semibold ${subTextClass} mb-2 block`}>Choose AI Model:</label>
              <div className="flex flex-wrap gap-2">
                {aiModels.map(model => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedAI(model.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                      selectedAI === model.id 
                        ? `bg-gradient-to-r ${model.color} text-white shadow-lg` 
                        : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:scale-105`
                    }`}
                  >
                    <span className="mr-1">{model.icon}</span>
                    {model.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className={`h-80 overflow-y-auto p-4 space-y-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              {chatMessages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className={`w-12 h-12 ${subTextClass} mx-auto mb-3`} />
                  <p className={`${subTextClass} text-sm`}>
                    Not sure what to build? Ask our AI for ideas!
                  </p>
                  <p className={`${subTextClass} text-xs mt-2`}>
                    💡 Try: "I want to build an app for small businesses"
                  </p>
                </div>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' 
                        : `${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              {isAIChatting && (
                <div className="flex justify-start">
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-white'} p-3 rounded-xl border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAIChat()}
                  placeholder="Ask anything about your app idea..."
                  className={`flex-1 px-3 py-2 border-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white'} rounded-lg focus:border-orange-500 focus:outline-none text-sm`}
                />
                <button
                  onClick={handleAIChat}
                  disabled={!chatInput.trim() || isAIChatting}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 transition"
                >
                  Send
                </button>
              </div>
              {chatMessages.length > 0 && (
                <button
                  onClick={useAIIdea}
                  className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition text-sm flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Use This Idea
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Builder Tab */}
      {activeTab === 'builder' && !showPreview && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className={`text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent leading-tight`}>
              Build Anything with AI
            </h1>
            <p className={`text-xl ${subTextClass} max-w-3xl mx-auto`}>
              The most advanced AI app builder. Describe your vision, and watch it materialize instantly.
            </p>
          </div>

          {/* Main Builder Card */}
          <div className={`${cardBgClass} rounded-3xl shadow-2xl p-8 mb-12 border-2 ${borderClass}`}>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className={`block text-lg font-bold ${textClass}`}>
                  Describe Your App
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAIAssistant(!showAIAssistant)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition"
                  >
                    <Brain className="w-4 h-4" />
                    Need Help? Chat with AI (Free!)
                  </button>
                </div>
              </div>

              {/* Helper Alert */}
              <div className={`mb-4 p-4 ${darkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} border-2 rounded-xl`}>
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'} flex items-center gap-2`}>
                  <MessageCircle className="w-4 h-4" />
                  <strong>Not sure what to build?</strong> Talk to our AI assistants first - it's completely free! Save your credits for when you're ready.
                </p>
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: Build a full-stack e-commerce platform with user authentication, product catalog with search and filters, shopping cart, payment integration via Stripe, admin dashboard with analytics, order management system, and email notifications..."
                className={`w-full h-56 p-5 border-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white'} rounded-2xl focus:border-orange-500 focus:outline-none resize-none text-lg shadow-sm`}
              />
              <div className={`mt-3 flex items-center justify-between text-sm ${subTextClass}`}>
                <span>💡 Pro tip: Be detailed for best results</span>
                <span>{description.length} characters</span>
              </div>
            </div>

            <div className={`flex flex-col lg:flex-row items-center justify-between gap-4 p-4 ${darkMode ? 'bg-gray-700/50' : 'bg-gradient-to-r from-yellow-50 to-orange-50'} rounded-xl`}>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className={`flex items-center gap-2 ${textClass}`}>
                  <Zap className="w-4 h-4 text-orange-600" />
                  <span><strong className="text-orange-700">40 credits</strong> per generation</span>
                </div>
                <div className={`flex items-center gap-2 ${textClass}`}>
                  <Edit3 className="w-4 h-4 text-pink-600" />
                  <span><strong className="text-pink-700">1 credit</strong> per edit</span>
                </div>
              </div>
              
              <button
                onClick={WhandleGenerate}
                disabled={!description.trim() || credits < 40 || isGenerating}
                className="w-full lg:w-auto px-10 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Rocket className="w-6 h-6" />
                    Generate App
                  </>
                )}
              </button>
            </div>
          </div>

          {/* NEW: Advanced Features Grid */}
          <div id="features" className="mb-12">
            <h2 className={`text-3xl font-bold text-center mb-8 ${textClass}`}>Advanced Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Database, title: "Database Integration", desc: "Auto-setup PostgreSQL, MongoDB, Firebase", color: "from-blue-500 to-cyan-500" },
                { icon: Cloud, title: "One-Click Deploy", desc: "Deploy to AWS, Vercel, Netlify instantly", color: "from-green-500 to-emerald-500" },
                { icon: Lock, title: "Auth & Security", desc: "Built-in OAuth 2.0, JWT, encryption", color: "from-orange-500 to-red-500" },
                { icon: Users, title: "Multi-User", desc: "Team collaboration & role management", color: "from-purple-500 to-pink-500" },
                { icon: Bell, title: "Real-Time", desc: "WebSockets, push notifications, live data", color: "from-yellow-500 to-orange-500" },
                { icon: BarChart, title: "Analytics", desc: "Built-in tracking, metrics, dashboards", color: "from-indigo-500 to-blue-500" },
                { icon: Palette, title: "Custom Theme", desc: "Dark mode, brand colors, accessibility", color: "from-pink-500 to-rose-500" },
                { icon: GitBranch, title: "Version Control", desc: "Git integration, rollback, branches", color: "from-teal-500 to-cyan-500" },
                { icon: Globe, title: "i18n Support", desc: "Multi-language, localization ready", color: "from-violet-500 to-purple-500" },
                { icon: Shield, title: "DDoS Protection", desc: "Built-in security, rate limiting", color: "from-red-500 to-orange-500" },
                { icon: Cpu, title: "AI Integration", desc: "OpenAI, Claude API pre-configured", color: "from-cyan-500 to-blue-500" },
                { icon: Workflow, title: "API Generator", desc: "Auto REST & GraphQL endpoints", color: "from-lime-500 to-green-500" }
              ].map((feature, i) => (
                <div key={i} className={`${cardBgClass} rounded-2xl p-6 border-2 ${borderClass} hover:shadow-xl transition group`}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${textClass}`}>{feature.title}</h3>
                  <p className={`${subTextClass} text-sm`}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div id="pricing" className={`${cardBgClass} rounded-3xl p-10 border-2 ${borderClass} shadow-2xl`}>
            <h2 className={`text-4xl font-bold text-center mb-4 ${textClass}`}>Unbeatable Pricing</h2>
            <p className={`text-center ${subTextClass} mb-10`}>Better than competitors. More features, lower cost.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter */}
              <div className={`border-2 ${borderClass} rounded-2xl p-8 hover:border-orange-400 hover:shadow-xl transition ${darkMode ? 'bg-gray-700/30' : ''}`}>
                <h3 className={`text-2xl font-bold mb-2 ${textClass}`}>Starter</h3>
                <div className={`text-5xl font-bold mb-2 ${textClass}`}>$15<span className={`text-xl ${subTextClass}`}>/mo</span></div>
                <p className={`text-sm ${subTextClass} mb-6`}>Perfect for beginners</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}><strong className={textClass}>400 credits/month</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>10 app generations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>Unlimited edits (1 credit each)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>Free AI consultation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>Basic deployment</span>
                  </li>
                </ul>
                <button className="w-full py-3 border-2 border-orange-600 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition">
                  Get Started
                </button>
              </div>

              {/* Pro */}
              <div className={`border-2 border-orange-600 rounded-2xl p-8 relative bg-gradient-to-br ${darkMode ? 'from-gray-700 to-gray-800' : 'from-orange-50 to-pink-50'} shadow-2xl scale-105`}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${textClass}`}>Pro</h3>
                <div className={`text-5xl font-bold mb-2 ${textClass}`}>$180<span className={`text-xl ${subTextClass}`}>/mo</span></div>
                <p className={`text-sm ${subTextClass} mb-6`}>For professionals</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}><strong className={textClass}>5,200 credits/month</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>130 app generations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>Everything in Starter</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>Priority AI processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>Advanced deployment options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>Custom domains</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-2xl transition">
                  Get Started
                </button>
              </div>

              {/* Team */}
              <div className={`border-2 ${borderClass} rounded-2xl p-8 hover:border-orange-400 hover:shadow-xl transition ${darkMode ? 'bg-gray-700/30' : ''}`}>
                <h3 className={`text-2xl font-bold mb-2 ${textClass}`}>Team</h3>
                <div className={`text-5xl font-bold mb-2 ${textClass}`}>$250<span className={`text-xl ${subTextClass}`}>/mo</span></div>
                <p className={`text-sm ${subTextClass} mb-6`}>For teams & agencies</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}><strong className={textClass}>8,000 credits/month</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>200 app generations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>Up to 10 team members</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>Collaboration tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>White-label options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className={subTextClass}>24/7 priority support</span>
                  </li>
                </ul>
                <button className="w-full py-3 border-2 border-orange-600 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Templates Tab - NEW */}
      {activeTab === 'templates' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className={`text-4xl font-bold mb-4 ${textClass}`}>App Templates</h2>
          <p className={`${subTextClass} mb-8 text-lg`}>Start with a pre-built template and customize it to your needs (20 credits)</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "E-Commerce Store", desc: "Full shopping cart, payments, admin panel", icon: "🛒", color: "from-green-500 to-emerald-500" },
              { title: "SaaS Dashboard", desc: "User management, analytics, billing", icon: "📊", color: "from-blue-500 to-cyan-500" },
              { title: "Social Media App", desc: "Posts, comments, likes, user profiles", icon: "💬", color: "from-purple-500 to-pink-500" },
              { title: "Booking System", desc: "Calendar, appointments, notifications", icon: "📅", color: "from-orange-500 to-red-500" },
              { title: "Learning Platform", desc: "Courses, quizzes, progress tracking", icon: "📚", color: "from-indigo-500 to-purple-500" },
              { title: "Portfolio Website", desc: "Projects showcase, contact form, blog", icon: "🎨", color: "from-pink-500 to-rose-500" },
              { title: "Task Manager", desc: "Todo lists, teams, deadlines, reports", icon: "✅", color: "from-teal-500 to-cyan-500" },
              { title: "Food Delivery", desc: "Menu, orders, delivery tracking, reviews", icon: "🍕", color: "from-yellow-500 to-orange-500" },
              { title: "Fitness App", desc: "Workouts, meal plans, progress charts", icon: "💪", color: "from-lime-500 to-green-500" }
            ].map((template, i) => (
              <div key={i} className={`${cardBgClass} rounded-2xl p-6 border-2 ${borderClass} hover:shadow-xl transition group cursor-pointer`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${template.color} rounded-2xl flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition shadow-lg`}>
                  {template.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${textClass}`}>{template.title}</h3>
                <p className={`${subTextClass} text-sm mb-4`}>{template.desc}</p>
                <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
                  Use Template (20 credits)
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* My Apps View */}
      {activeTab === 'apps' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className={`text-3xl font-bold mb-8 ${textClass}`}>My Applications</h2>
          {generatedApps.length === 0 ? (
            <div className={`${cardBgClass} rounded-2xl p-12 text-center border-2 ${borderClass}`}>
              <Code className={`w-16 h-16 ${subTextClass} mx-auto mb-4`} />
              <p className={`${subTextClass} text-lg`}>No apps generated yet. Start building!</p>
              <button 
                onClick={() => setActiveTab('builder')}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Create Your First App
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedApps.map(app => (
                <div key={app.id} className={`${cardBgClass} rounded-2xl p-6 border-2 ${borderClass} hover:shadow-xl transition`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-pink-600 rounded-xl flex items-center justify-center">
                      <Layers className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">Ready</span>
                  </div>
                  <h3 className={`font-bold text-lg mb-2 line-clamp-1 ${textClass}`}>{app.description.substring(0, 50)}...</h3>
                  <p className={`text-sm ${subTextClass} mb-4`}>Created: {app.createdAt}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition flex items-center justify-center gap-1">
                      <Play className="w-4 h-4" />
                      Open
                    </button>
                    <button className={`px-3 py-2 border-2 ${borderClass} rounded-lg hover:border-orange-400 transition`}>
                      <Settings className={`w-4 h-4 ${textClass}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* Preview/Edit Mode */}
      {showPreview && activeTab === 'builder' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`${cardBgClass} rounded-3xl shadow-2xl p-8 border-2 ${borderClass}`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className={`text-3xl font-bold mb-1 ${textClass}`}>Your App is Ready! 🎉</h2>
                <p className={subTextClass}>Generated in 3.5 seconds with advanced AI</p>
              </div>
              <button
                onClick={() => {
                  setShowPreview(false);
                  setEditMode(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition"
              >
                + New App
              </button>
            </div>
            
            <div className={`mb-6 p-5 ${darkMode ? 'bg-green-900/30 border-green-700' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'} border-2 rounded-xl`}>
              <p className={`${darkMode ? 'text-green-300' : 'text-green-800'} font-bold flex items-center gap-2`}>
                <Check className="w-5 h-5" />
                Successfully Generated!
              </p>
              <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-700'} mt-2`}>Description: "{generatedApps[0]?.description}"</p>
              <p className={`text-xs ${darkMode ? 'text-green-500' : 'text-green-600'} mt-1`}>40 credits used • {credits} credits remaining</p>
            </div>

            {/* Edit Section */}
            {!editMode ? (
              <div className={`mb-6 p-5 ${darkMode ? 'bg-purple-900/30 border-purple-700' : 'bg-purple-50 border-purple-200'} border-2 rounded-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-bold ${darkMode ? 'text-purple-300' : 'text-purple-900'} mb-1`}>Want to make changes?</p>
                    <p className={`text-sm ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>Edit your app for just 1 credit per modification</p>
                  </div>
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit App
                  </button>
                </div>
              </div>
            ) : (
              <div className={`mb-6 p-5 ${darkMode ? 'bg-purple-900/30 border-purple-700' : 'bg-purple-50 border-purple-200'} border-2 rounded-xl`}>
                <label className={`block font-bold ${darkMode ? 'text-purple-300' : 'text-purple-900'} mb-3`}>Describe your changes:</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Example: Add a dark mode toggle, change primary color to blue, add user profile dropdown..."
                  className={`w-full h-32 p-4 border-2 ${darkMode ? 'border-purple-600 bg-gray-700 text-gray-100' : 'border-purple-300'} rounded-xl focus:border-purple-500 focus:outline-none resize-none mb-3`}
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleEdit}
                    disabled={!editDescription.trim() || credits < 1 || isGenerating}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Apply Changes (1 credit)
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setEditDescription('');
                    }}
                    className={`px-6 py-3 border-2 ${borderClass} ${textClass} rounded-xl font-semibold hover:bg-gray-50 transition`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* App Preview with 70s Terminal Style */}
            <div className={`border-2 ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-orange-200 bg-gradient-to-br from-gray-50 to-orange-50'} rounded-2xl p-8 min-h-96`}>
              {/* Terminal Header - 70s Style */}
              <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-t-xl p-3 mb-4 font-mono text-green-400 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4">NEXUSFORGE_TERMINAL_V1.0</span>
                </div>
                <div className="text-xs">
                  <span className="text-green-500">user@nexusforge:~$</span> <span className="text-yellow-400">app-preview</span> --status=ready
                </div>
              </div>

              {/* Terminal Content */}
              <div className="bg-black rounded-b-xl p-6 font-mono text-sm">
                <div className="text-green-400 mb-4">
                  <span className="text-yellow-400">{'>'}</span> Loading application preview...<br/>
                  <span className="text-yellow-400">{'>'}</span> Initializing components...<span className="text-green-500"> [OK]</span><br/>
                  <span className="text-yellow-400">{'>'}</span> Compiling code...<span className="text-green-500"> [OK]</span><br/>
                  <span className="text-yellow-400">{'>'}</span> Running tests...<span className="text-green-500"> [PASSED]</span><br/>
                  <span className="text-yellow-400">{'>'}</span> Deploying to server...<span className="text-green-500"> [READY]</span><br/>
                </div>

                <div className="border-t border-green-800 pt-4 mb-4">
                  <div className="text-cyan-400 mb-2">== APPLICATION DETAILS ==</div>
                  <div className="text-green-400 text-xs space-y-1">
                    <div><span className="text-yellow-400">STATUS:</span> Production Ready</div>
                    <div><span className="text-yellow-400">FRAMEWORK:</span> React + Node.js</div>
                    <div><span className="text-yellow-400">DATABASE:</span> PostgreSQL (Connected)</div>
                    <div><span className="text-yellow-400">AUTH:</span> OAuth 2.0 + JWT</div>
                    <div><span className="text-yellow-400">HOSTING:</span> AWS + CloudFront CDN</div>
                    <div><span className="text-yellow-400">SSL:</span> Enabled (HTTPS)</div>
                  </div>
                </div>

                <div className="text-green-400">
                  <span className="text-yellow-400">user@nexusforge:~$</span> <span className="animate-pulse">_</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 text-center">
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  <button className="px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-2xl transition flex items-center gap-2 text-lg">
                    <Rocket className="w-5 h-5" />
                    Deploy to Production
                  </button>
                  <button className="px-8 py-4 border-2 border-orange-600 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition flex items-center gap-2 text-lg">
                    <Play className="w-5 h-5" />
                    Preview Live
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button className={`px-4 py-3 border-2 ${borderClass} ${textClass} rounded-lg font-semibold hover:border-orange-400 hover:text-orange-600 transition flex items-center justify-center gap-2`}>
                    <Terminal className="w-4 h-4" />
                    View Code
                  </button>
                  <button className={`px-4 py-3 border-2 ${borderClass} ${textClass} rounded-lg font-semibold hover:border-orange-400 hover:text-orange-600 transition flex items-center justify-center gap-2`}>
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button className={`px-4 py-3 border-2 ${borderClass} ${textClass} rounded-lg font-semibold hover:border-orange-400 hover:text-orange-600 transition flex items-center justify-center gap-2`}>
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className={`px-4 py-3 border-2 ${borderClass} ${textClass} rounded-lg font-semibold hover:border-orange-400 hover:text-orange-600 transition flex items-center justify-center gap-2`}>
                    <Copy className="w-4 h-4" />
                    Clone
                  </button>
                </div>

                <div className="mt-8 grid md:grid-cols-3 gap-4 text-left">
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl border-2 ${borderClass}`}>
                    <Database className="w-6 h-6 text-blue-600 mb-2" />
                    <p className={`font-semibold text-sm mb-1 ${textClass}`}>Database Ready</p>
                    <p className={`text-xs ${subTextClass}`}>PostgreSQL configured & connected</p>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl border-2 ${borderClass}`}>
                    <Lock className="w-6 h-6 text-green-600 mb-2" />
                    <p className={`font-semibold text-sm mb-1 ${textClass}`}>Auth Enabled</p>
                    <p className={`text-xs ${subTextClass}`}>OAuth 2.0 & JWT implemented</p>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl border-2 ${borderClass}`}>
                    <Cloud className="w-6 h-6 text-orange-600 mb-2" />
                    <p className={`font-semibold text-sm mb-1 ${textClass}`}>CDN Optimized</p>
                    <p className={`text-xs ${subTextClass}`}>Global delivery network active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className={`mt-20 py-12 border-t ${borderClass} ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 via-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
                  NexusForge
                </span>
              </div>
              <p className={`text-sm ${subTextClass}`}>Building the future of app development with AI. Better, faster, cheaper.</p>
            </div>

            <div>
              <h4 className={`font-bold mb-3 ${textClass}`}>Product</h4>
              <ul className={`space-y-2 text-sm ${subTextClass}`}>
                <li><a href="#" className="hover:text-orange-600 transition">Features</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">Templates</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`font-bold mb-3 ${textClass}`}>Company</h4>
              <ul className={`space-y-2 text-sm ${subTextClass}`}>
                <li><a href="#" className="hover:text-orange-600 transition">About</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">Blog</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">Careers</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`font-bold mb-3 ${textClass}`}>Legal</h4>
              <ul className={`space-y-2 text-sm ${subTextClass}`}>
                <li><a href="#" className="hover:text-orange-600 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">Terms</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">Security</a></li>
                <li><a href="#" className="hover:text-orange-600 transition">Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className={`pt-8 border-t ${borderClass} text-center ${subTextClass} text-sm`}>
            <p>© 2025 NexusForge AI. Powered by advanced AI technology. Better than the rest.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
