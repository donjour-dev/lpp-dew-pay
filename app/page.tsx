"use client";

import { useState } from "react";

type TimeEntry = {
  label: string;
  minutes: number;
};

const TIME_BUTTONS: { label: string; minutes: number }[] = [
  { label: "6시", minutes: 360 },
  { label: "6시 30분", minutes: 390 },
  { label: "7시", minutes: 420 },
  { label: "7시 30분", minutes: 450 },
  { label: "8시", minutes: 480 },
  { label: "8시 30분", minutes: 510 },
  { label: "9시", minutes: 540 },
  { label: "9시 30분", minutes: 570 },
];

const OVERTIME_BUTTONS: { label: string; minutes: number }[] = [
  { label: "5분", minutes: 5 },
  { label: "10분", minutes: 10 },
  { label: "30분", minutes: 30 },
  { label: "1시", minutes: 60 },
];

const WON_PER_HOUR = 11000; // 30분 = 5,500원

function formatTotal(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h}시간`;
  if (h === 0) return `${m}분`;
  return `${h}시간 ${m}분`;
}

function calcPay(minutes: number): number {
  return Math.round((minutes / 60) * WON_PER_HOUR);
}

export default function Home() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [showTotal, setShowTotal] = useState(false);

  const addEntry = (label: string, minutes: number) => {
    setEntries((prev) => [...prev, { label, minutes }]);
    setShowTotal(false);
  };

  const handleSum = () => {
    setShowTotal(true);
  };

  const totalMinutes = entries.reduce((acc, e) => acc + e.minutes, 0);
  const clearEntries = () => {
    setEntries([]);
    setShowTotal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50/30 to-slate-100 py-8 px-4 sm:py-12">
      <main className="mx-auto max-w-lg rounded-2xl border border-rose-100/60 bg-white/90 p-6 shadow-xl shadow-rose-200/20 backdrop-blur sm:p-8">
        <h1 className="mb-2 text-center text-2xl font-bold tracking-tight text-rose-500 sm:text-3xl">
          르쁘빠 근무계산표
        </h1>
        <p className="mb-8 text-center text-sm text-slate-500">🥐💗</p>

        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            근무 시간
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {TIME_BUTTONS.map(({ label, minutes }) => (
              <button
                key={label}
                type="button"
                onClick={() => addEntry(label, minutes)}
                className="rounded-xl bg-amber-100 px-3 py-3.5 text-sm font-medium text-amber-900 ring-1 ring-amber-200/60 transition-all duration-100 ease-out hover:bg-amber-200 hover:ring-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 active:scale-[0.95] active:opacity-90"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            추가 근무
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {OVERTIME_BUTTONS.map(({ label, minutes }) => (
              <button
                key={label}
                type="button"
                onClick={() => addEntry(label, minutes)}
                className="min-w-0 rounded-xl bg-amber-500 px-3 py-3.5 text-sm font-medium text-white shadow-md shadow-amber-500/25 transition-all duration-100 ease-out hover:bg-amber-600 hover:shadow-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 active:scale-[0.95] active:opacity-90"
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={clearEntries}
              className="min-w-0 rounded-xl border-2 border-amber-200 bg-amber-50/80 px-3 py-3.5 text-sm font-medium text-amber-900 transition-all duration-100 ease-out hover:bg-amber-100 hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 active:scale-[0.95] active:opacity-90"
            >
              초기화
            </button>
          </div>
          <div className="mt-5">
            <button
              type="button"
              onClick={handleSum}
              className="w-full rounded-xl bg-rose-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-rose-500/25 transition-all duration-100 ease-out hover:bg-rose-700 hover:shadow-rose-500/30 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 active:scale-[0.97] active:opacity-90"
            >
              합계 계산
            </button>
          </div>
        </div>

        <section className="min-h-[140px] rounded-xl border border-slate-200/80 bg-slate-50/80 p-5 ring-1 ring-slate-100">
          {entries.length === 0 ? (
            <p className="text-slate-400">버튼을 눌러 근무 시간을 추가하세요.</p>
          ) : (
            <p className="whitespace-pre-wrap text-slate-700">
              {entries.map((e, i) => (
                <span key={i}>
                  {e.label}
                  {i < entries.length - 1 ? " + " : ""}
                </span>
              ))}
            </p>
          )}

          {showTotal && entries.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-5 border-t border-slate-200 pt-5">
              <div className="min-w-0 rounded-lg bg-white/60 p-3 ring-1 ring-slate-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  최종 근무시간
                </p>
                <p className="mt-1.5 text-xl font-bold text-emerald-600">
                  {formatTotal(totalMinutes)}
                </p>
                <p className="mt-0.5 text-sm text-slate-500">
                  (총 {totalMinutes}분)
                </p>
              </div>
              <div className="min-w-0 rounded-lg bg-white/60 p-3 ring-1 ring-slate-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  예상급여
                </p>
                <p className="mt-1.5 text-xl font-bold text-slate-800">
                  {calcPay(totalMinutes).toLocaleString("ko-KR")}원
                </p>
              </div>
            </div>
          )}
        </section>

        <p className="mt-6 text-right text-xs text-slate-400">
          design by donjour & dew
        </p>
      </main>
    </div>
  );
}
