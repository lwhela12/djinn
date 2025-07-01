import React from 'react';

export default function InputForm({ value, onChange, onSend, disabled }) {
  return (
    <div className="p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="flex items-center space-x-2"
      >
        <div className="glass-panel p-4 flex-1 rounded-2xl flex items-center">
          <input
            type="text"
            className="w-full bg-transparent text-moonlight placeholder-sage-mist focus:outline-none"
            placeholder="Speak your desire into existence..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
          <button type="submit" className="liquid-button ml-2 p-2" disabled={disabled}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}