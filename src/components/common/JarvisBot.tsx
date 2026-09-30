import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User } from 'lucide-react';
import { mockBuildingData, mockComplaints, mockMaintenanceEquipment, mockWorkers } from '../../data/mockData';

interface Message {
  sender: 'user' | 'jarvis';
  text: string;
  time: string;
}

export const JarvisBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'jarvis',
      text: "Greetings Admin! I am **JARVIS**, your AI Building Operations Assistant. Ask me anything about electricity, parking, CCTV, complaints, or maintenance telemetry.",
      time: 'Just now',
    },
  ]);

  const sampleQuestions = [
    'How much electricity did we use today?',
    'Which floor has the highest energy consumption?',
    'How many workers are present?',
    'Show pending complaints.',
    'Which equipment requires maintenance?',
    'How many parking spaces are available?',
  ];

  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('electricity') || q.includes('energy')) {
      return `⚡ Today's total grid electricity consumption is **1,245 kWh** (+8.2% from yesterday) with **₹9,820** estimated cost. Solar generation contributed **380 kWh** saving ₹3,420.`;
    }
    if (q.includes('highest') || q.includes('floor energy')) {
      const topFloor = mockBuildingData.floors.reduce((max, f) => (f.electricityUsage > max.electricityUsage ? f : max));
      return `🏢 **${topFloor.name}** currently has the highest energy consumption at **${topFloor.electricityUsage} kWh** (Temp: ${topFloor.temperature}°C, Occupancy: ${topFloor.occupancy}).`;
    }
    if (q.includes('worker') || q.includes('attendance')) {
      const present = mockWorkers.filter((w) => w.status === 'Present').length;
      return `👷 Currently **${present} / ${mockWorkers.length}** registered workers are present on site (Attendance Rate: 84.4%). 4 absent, 1 on leave.`;
    }
    if (q.includes('complaint') || q.includes('pending')) {
      const pendingCount = mockComplaints.filter((c) => c.status === 'Registered' || c.status === 'In Progress').length;
      return `⚠️ There are **${pendingCount} pending complaints** (${mockComplaints.filter((c) => c.status === 'Registered').length} Registered, ${mockComplaints.filter((c) => c.status === 'In Progress').length} In Progress). Most critical: CMP-104 Elevator 01 grinding noise on 3rd floor.`;
    }
    if (q.includes('equipment') || q.includes('maintenance')) {
      const highRisk = mockMaintenanceEquipment.filter((e) => e.status !== 'Normal');
      return `🔧 **2 units require maintenance attention**:\n1. **${highRisk[0]?.name}** (${highRisk[0]?.health}% Health, ${highRisk[0]?.status})\n2. **${highRisk[1]?.name}** (${highRisk[1]?.health}% Health, ${highRisk[1]?.status} - Failure predicted within 5 days).`;
    }
    if (q.includes('parking') || q.includes('space') || q.includes('slot')) {
      return `🚗 Parking Status: **28 slots available** out of 100 total (72 occupied, 5 reserved). Ground Deck A has 18 slots open and 10 EV chargers free.`;
    }

    return `🤖 Telemetry Query: Based on current sensor streams, all core systems are operating within nominal threshold parameters. Is there a specific module you would like detailed analytics for?`;
  };

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const jarvisText = generateAnswer(q);
    const jarvisMsg: Message = {
      sender: 'jarvis',
      text: jarvisText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg, jarvisMsg]);
    if (!textToSend) setInput('');
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-200 hover:scale-105"
      >
        <Sparkles className="w-5 h-5 text-cyan-200 animate-spin" style={{ animationDuration: '4s' }} />
        <span>JARVIS AI</span>
      </button>

      {/* Chatbot Modal Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px] animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  JARVIS AI Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <p className="text-[11px] text-slate-400">LLM-ready Digital Twin Copilot</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex space-x-2 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'jarvis' && (
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3 rounded-xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span className="block text-[9px] opacity-60 text-right mt-1">{m.time}</span>
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Preconfigured Quick Questions */}
          <div className="px-3 py-2 border-t border-slate-800 bg-slate-900/60 overflow-x-auto whitespace-nowrap flex space-x-2 scrollbar-none">
            {sampleQuestions.map((sq, i) => (
              <button
                key={i}
                onClick={() => handleSend(sq)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                {sq}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-slate-800 bg-slate-900 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask JARVIS about building telemetry..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
