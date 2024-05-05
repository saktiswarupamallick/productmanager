"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';




interface TimerProps {
  children: React.ReactNode;
}

const PomodoroTimer: React.FC<TimerProps> = ({ children }) => {
  const [task, setTask] = useState("");
  const [focusTime, setFocusTime] = useState(25); // default focus time in minutes
  const [breakTime, setBreakTime] = useState(5); // default break time in minutes
  const [remainingTime, setRemainingTime] = useState(focusTime * 60);
  const [isPaused, setIsPaused] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
 // Ref for sound effect



  // Timer logic
  const startTimer = () => {
    if (isPaused) {
      timerRef.current = setInterval(() => {
        setRemainingTime(prevRemainingTime => {
          if (prevRemainingTime > 0) {
            return prevRemainingTime - 1;
          } else {
            clearInterval(timerRef.current);
 
            setRemainingTime(breakTime * 60);
            return 0;
          }
        });
        setIsPaused(false);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (!isPaused && timerRef.current) {
      clearInterval(timerRef.current);
      setIsPaused(true);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setRemainingTime(focusTime * 60);
    setIsPaused(true);
  };

  // Format remaining time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
  };

  return (
    <Sheet>
      <SheetTrigger className="w-full">{children}</SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-neutral-background dark:bg-dark-background rounded-md p-6">
        <SheetHeader >
          <SheetTitle className="text-center">Productivity Timer</SheetTitle>
          <SheetDescription className='dark:text-white' >
            Focus for {focusTime} minutes! Use this Pomodoro timer to cycle between focused work sessions and short breaks, boosting your productivity.
          </SheetDescription>
        </SheetHeader>
        <div className="text-4xl text-center font-bold mt-4">{formatTime(remainingTime)}</div>
        <div className="flex flex-col items-center mt-8">
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="mb-4 p-3 border rounded-md w-full"
          />
          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Focus time (min)"
              value={focusTime}
              onChange={(e) => setFocusTime(parseInt(e.target.value))}
              className="p-3 border rounded-md w-1/2"
            />
            <input
              type="number"
              placeholder="Break time (min)"
              value={breakTime}
              onChange={(e) => setBreakTime(parseInt(e.target.value))}
              className="p-3 border rounded-md w-1/2"
            />
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <Button variant="default" disabled={!isPaused} onClick={startTimer} className="px-6 py-3">
              Start
            </Button>
            <Button variant="secondary" disabled={isPaused} onClick={pauseTimer} className="px-6 py-3">
              Pause
            </Button>
            <Button variant="destructive" onClick={resetTimer} className="px-6 py-3">
              Reset
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PomodoroTimer;

