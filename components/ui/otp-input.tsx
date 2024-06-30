import React, { useRef, useState, KeyboardEvent, ChangeEvent } from 'react';
import { Input } from './input';

type InputProps = {
    length?: number;
    onComplete: (pin: string) => void;
    disabled?: boolean;
};

export default function OTPInput({ length = 4, onComplete, disabled }: InputProps) {
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));

  const handleTextChange = (input: string, index: number) => {
      const newPin = [...OTP];
      newPin[index] = input;
      setOTP(newPin);
      if (input.length === 1 && index < length - 1) {
        inputRef.current[index + 1]?.focus();
      }
      if (input.length === 0 && index > 0) {
        inputRef.current[index - 1]?.focus();
      }
      if (newPin.every((digit) => digit !== '')) {
        onComplete(newPin.join(''));
      }
  };

  return (
    <div className={`grid grid-cols-6 gap-5`}>
      {Array.from({ length }, (_, index) => (
          <Input
            key={index}
            disabled={disabled}
            type="text"
            maxLength={1}
            value={OTP[index]}
            onChange={(e) => handleTextChange(e.target.value, index)}
            ref={(ref) => {
              inputRef.current[index] = ref as HTMLInputElement;
            }}
            className={`border border-solid border-border-slate-500 focus:border-blue-600 p-5 outline-none text-center`}
            style={{ marginRight: index === length - 1 ? '0' : '10px' }}
          />
      ))}
  </div>
  )
}