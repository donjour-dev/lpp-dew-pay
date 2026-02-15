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
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <main className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-xl font-bold text-pink-500">
          르쁘빠 근무계산표 🥐💗
        </h1>

        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TIME_BUTTONS.map(({ label, minutes }) => (
            <button
              key={label}
              type="button"
              onClick={() => addEntry(label, minutes)}
              className="rounded-lg bg-amber-200 px-3 py-3.5 text-sm font-medium text-amber-900 transition hover:bg-amber-300 active:scale-[0.98]"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mb-6 mt-8">
          <p className="mb-3 text-sm font-medium text-slate-600">추가 근무</p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-2">
              {OVERTIME_BUTTONS.map(({ label, minutes }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => addEntry(label, minutes)}
                  className="h-12 w-20 rounded-lg bg-amber-500 text-sm font-medium text-white transition hover:bg-amber-400 active:scale-[0.98]"
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={clearEntries}
                className="h-12 w-28 shrink-0 rounded-lg border border-amber-300 bg-amber-100 text-sm font-medium text-amber-900 transition hover:bg-amber-200 active:scale-[0.98]"
              >
                초기화
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleSum}
              className="w-full rounded-lg bg-amber-800 px-6 py-3.5 text-sm font-semibold text-amber-50 transition hover:bg-amber-700 active:scale-[0.98]"
            >
              합계
            </button>
          </div>
        </div>

        <section className="min-h-[120px] rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            근무시간
          </p>
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
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  최종 근무시간
                </p>
                <p className="mt-1 text-lg font-bold text-emerald-700">
                  {formatTotal(totalMinutes)}
                </p>
                <p className="mt-0.5 text-sm text-slate-500">
                  (총 {totalMinutes}분)
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  예상급여
                </p>
                <p className="mt-1 text-lg font-bold text-slate-800">
                  {calcPay(totalMinutes).toLocaleString("ko-KR")}원
                </p>
              </div>
            </div>
          )}
        </section>

        <p className="mt-3 text-right text-xs text-slate-400">
          design by donjour & dew
        </p>
      </main>
    </div>
  );
}
