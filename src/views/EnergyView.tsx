
import React, { useEffect, useState } from 'react';
import {
  Zap,
  Sun,
  AlertTriangle,
  CloudSun,
  Database,
  Sparkles,
  TrendingUp,
  Cloud
} from 'lucide-react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

import { supabase } from '../lib/supabase';
import { Badge } from '../components/common/Badge';

type EnergyRow = {
  timestamp_utc: string;
  grid_import_interval_kwh: number | null;
};

type SolarRow = {
  timestamp_utc: string;
  pv_roof_interval_kwh: number | null;
  pv_facade_interval_kwh: number | null;
};

type ChartReading = {
  timestamp: string;
  date: string;
  time: string;
  gridUsage: number;
  solarYield: number;
};

type WeeklyReading = {
  day: string;
  grid: number;
  solar: number;
};

const TARIFF = 7.88;
const BUILDING_ID = 'industrial3';

export const EnergyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'hourly' | 'weekly' | 'solarVsGrid'
  >('hourly');

  const [readings, setReadings] = useState<ChartReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchEnergyData = async () => {
      try {
        setError(null);

        const [energyResult, solarResult] = await Promise.all([
          supabase
            .from('energy_readings')
            .select('timestamp_utc, grid_import_interval_kwh')
            .eq('building_id', BUILDING_ID)
            .order('timestamp_utc', { ascending: false })
            .limit(168),

          supabase
            .from('solar_readings')
            .select(
              'timestamp_utc, pv_roof_interval_kwh, pv_facade_interval_kwh'
            )
            .eq('building_id', BUILDING_ID)
            .order('timestamp_utc', { ascending: false })
            .limit(168)
        ]);

        if (energyResult.error) {
          throw new Error(
            `Energy data error: ${energyResult.error.message}`
          );
        }

        if (solarResult.error) {
          throw new Error(
            `Solar data error: ${solarResult.error.message}`
          );
        }

        const energyRows = (energyResult.data || []) as EnergyRow[];
        const solarRows = (solarResult.data || []) as SolarRow[];

        const solarMap = new Map<string, number>();

        solarRows.forEach((row) => {
          const roof = Number(row.pv_roof_interval_kwh);
          const facade = Number(row.pv_facade_interval_kwh);

          const roofValid =
            row.pv_roof_interval_kwh !== null &&
            Number.isFinite(roof) &&
            roof >= 0;

          const facadeValid =
            row.pv_facade_interval_kwh !== null &&
            Number.isFinite(facade) &&
            facade >= 0;

          if (roofValid || facadeValid) {
            solarMap.set(
              row.timestamp_utc,
              (roofValid ? roof : 0) +
              (facadeValid ? facade : 0)
            );
          }
        });

        const mergedData: ChartReading[] = energyRows
          .filter((row) => {
            const value = Number(row.grid_import_interval_kwh);

            return (
              row.grid_import_interval_kwh !== null &&
              Number.isFinite(value) &&
              value >= 0
            );
          })
          .map((row) => {
            const dateObject = new Date(row.timestamp_utc);

            return {
              timestamp: row.timestamp_utc,
              date: dateObject.toISOString().slice(0, 10),
              time: dateObject.toISOString().slice(11, 16),
              gridUsage: Number(row.grid_import_interval_kwh),
              solarYield: solarMap.get(row.timestamp_utc) ?? 0
            };
          })
          .sort(
            (a, b) =>
              new Date(a.timestamp).getTime() -
              new Date(b.timestamp).getTime()
          );

        if (mergedData.length === 0) {
          throw new Error(
            'No valid energy readings were found for this building.'
          );
        }

        if (!cancelled) {
          setReadings(mergedData);
          setLastUpdated(new Date().toISOString());
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to fetch energy data.'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchEnergyData();

    const interval = window.setInterval(fetchEnergyData, 30000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  // Latest available UTC date in the imported dataset
  const latestDate =
    readings.length > 0
      ? readings[readings.length - 1].date
      : null;

  const latestDayReadings = latestDate
    ? readings.filter((item) => item.date === latestDate)
    : [];

  const dailyGridUsage = latestDayReadings.reduce(
    (total, item) => total + item.gridUsage,
    0
  );

  const dailySolarGeneration = latestDayReadings.reduce(
    (total, item) => total + item.solarYield,
    0
  );

  const dailyCost = dailyGridUsage * TARIFF;
  const dailySavings = dailySolarGeneration * TARIFF;

  const peakSolarReading = latestDayReadings.reduce(
    (peak, item) => Math.max(peak, item.solarYield),
    0
  );

  const hourlyData = readings.slice(-24);

  // Group readings by UTC date for the latest seven available dates
  const dailyGroups = new Map<
    string,
    { grid: number; solar: number }
  >();

  readings.forEach((item) => {
    const existing = dailyGroups.get(item.date) || {
      grid: 0,
      solar: 0
    };

    existing.grid += item.gridUsage;
    existing.solar += item.solarYield;

    dailyGroups.set(item.date, existing);
  });

  const weeklyData: WeeklyReading[] = Array.from(dailyGroups.entries())
    .slice(-7)
    .map(([date, values]) => ({
      day: date.slice(5),
      grid: Number(values.grid.toFixed(2)),
      solar: Number(values.solar.toFixed(2))
    }));

  const formattedLastUpdated = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString()
    : 'Not available';

  const formattedDatasetDate = latestDate
    ? new Date(`${latestDate}T00:00:00Z`).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
      }
    )
    : 'Not available';

  return (
    <div className="space-y-6">

      {/* Database connection status */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>
            Supabase Database · Building: {BUILDING_ID}
          </span>
          <Badge variant={error ? 'warning' : 'success'}>
            {loading
              ? 'Loading'
              : error
                ? 'Connection Error'
                : 'Connected'}
          </Badge>
        </div>

        <span className="text-slate-500">
          Last checked: {formattedLastUpdated}
        </span>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/30 p-4 text-sm text-red-300">
          <strong>Unable to load database data:</strong> {error}
          <p className="mt-1 text-xs text-red-200/70">
            Check your Supabase connection, table permissions and data.
          </p>
        </div>
      )}

      {/* 5 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 bg-amber-950/10">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Latest Day Usage
            </span>
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">
            {loading ? '...' : `${dailyGridUsage.toFixed(2)} kWh`}
          </div>
          <span className="text-[11px] text-amber-400 font-semibold">
            {formattedDatasetDate}
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Estimated Cost
            </span>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              ₹
            </span>
          </div>
          <div className="text-2xl font-bold font-display text-white">
            {loading ? '...' : `₹${dailyCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
          </div>
          <span className="text-[11px] text-slate-400">
            Estimated · ₹{TARIFF}/kWh
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Solar Generation
            </span>
            <Sun className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">
            {loading ? '...' : `${dailySolarGeneration.toFixed(2)} kWh`}
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold">
            Peak hour: {peakSolarReading.toFixed(2)} kWh
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Solar Savings
            </span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">
            {loading ? '...' : `₹${dailySavings.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold">
            Estimated energy offset
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/10">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Solar Efficiency
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold font-display text-white">
            Not Available
          </div>
          <span className="text-[11px] text-cyan-400 font-semibold">
            Requires capacity and irradiance data
          </span>
        </div>

      </div>

      {/* AI Energy Anomaly Alert */}
      <div className="glass-panel p-4 rounded-2xl border border-amber-500/40 bg-amber-950/30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              AI Anomaly Detection
              <Badge variant="warning">DEMO</Badge>
            </h4>
            <p className="text-xs text-amber-200">
              Demonstration alert: Electricity consumption is above the normal weekday pattern.
            </p>
          </div>
        </div>
        <button className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shrink-0">
          Optimize Load
        </button>
      </div>

      {/* Charts and Prediction Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Chart Panel */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Power Telemetry & Energy Charts
              </h3>
              <p className="text-xs text-slate-400">
                Historical database readings · Latest dataset date: {formattedDatasetDate}
              </p>
            </div>

            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('hourly')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${activeTab === 'hourly'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                  }`}
              >
                Hourly Profile
              </button>

              <button
                onClick={() => setActiveTab('solarVsGrid')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${activeTab === 'solarVsGrid'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                  }`}
              >
                Solar vs Grid
              </button>

              <button
                onClick={() => setActiveTab('weekly')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${activeTab === 'weekly'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                  }`}
              >
                Weekly Trend
              </button>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            {loading ? (
              <div className="h-full flex items-center justify-center text-sm text-slate-400">
                Loading readings from Supabase...
              </div>
            ) : readings.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-slate-400">
                No chart data available.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">

                {activeTab === 'hourly' ? (
                  <AreaChart data={hourlyData}>
                    <defs>
                      <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>

                      <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '8px'
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="gridUsage"
                      stroke="#f59e0b"
                      fillOpacity={1}
                      fill="url(#gridGrad)"
                      name="Grid Usage (kWh)"
                    />

                    <Area
                      type="monotone"
                      dataKey="solarYield"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#solarGrad)"
                      name="Solar Yield (kWh)"
                    />
                  </AreaChart>

                ) : activeTab === 'solarVsGrid' ? (
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '8px'
                      }}
                    />

                    <Legend />

                    <Bar
                      dataKey="gridUsage"
                      name="Grid Electricity (kWh)"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />

                    <Bar
                      dataKey="solarYield"
                      name="Solar Generation (kWh)"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>

                ) : (
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#334155',
                        borderRadius: '8px'
                      }}
                    />

                    <Legend />

                    <Bar
                      dataKey="grid"
                      name="Grid Electricity (kWh)"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />

                    <Bar
                      dataKey="solar"
                      name="Solar Generation (kWh)"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                )}

              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* AI Prediction and Weather */}
        <div className="space-y-6">

          {/* AI Forecast Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">
                  AI Energy Forecast Model
                </h4>
                <p className="text-[11px] text-slate-400">
                  Demonstration data · Not connected to an ML model
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="glass-card p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">
                  Tomorrow's Predicted Usage
                </span>
                <span className="font-bold font-mono text-cyan-400 text-sm">
                  1,310 kWh
                </span>
              </div>

              <div className="glass-card p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">
                  Expected Monthly Bill
                </span>
                <span className="font-bold font-mono text-white text-sm">
                  ₹52,400
                </span>
              </div>
            </div>
          </div>

          {/* Solar Weather Diagnostics */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <CloudSun className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">
                  Solar Weather Telemetry
                </h4>
                <p className="text-[11px] text-slate-400">
                  Demonstration data · Weather API not connected
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Cloud className="w-3.5 h-3.5 text-slate-400" />
                  Example Weather:
                </span>
                <span className="font-semibold text-white">
                  Partly Cloudy (27°C)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  Example Solar Performance:
                </span>
                <Badge variant="success">Normal</Badge>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                <span className="font-bold text-cyan-400 block mb-1">
                  Example Recommendation:
                </span>
                "Monitor panel performance if cloud cover remains high."
              </div>
            </div>
          </div>

          {/* Dataset Citation */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center space-x-2.5 text-[11px] text-slate-400">
            <Database className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong className="text-slate-200">
                Data Attribution:
              </strong>{' '}
              UCI Machine Learning Repository & Kaggle Energy Datasets.
              <span className="block mt-1">
                Latest available date: {formattedDatasetDate}
              </span>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
