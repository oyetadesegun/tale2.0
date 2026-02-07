"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Next Valentine's Day
    const now = new Date();
    let valentinesYear = now.getFullYear();
    let valentines = new Date(valentinesYear, 1, 14); // Feb 14
    if (now > valentines) {
      valentinesYear++;
      valentines = new Date(valentinesYear, 1, 14);
    }

    function calculate() {
      const diff = valentines.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md md:h-16 md:w-16">
            <span className="font-serif text-xl font-bold md:text-2xl">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-1 text-xs font-medium text-muted-foreground">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
