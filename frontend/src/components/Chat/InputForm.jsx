import React from 'react';

export default function InputForm({ value, onChange, onSend, disabled }) {
  return (
    <div className="mt-auto p-2 border-t">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="flex"
      >
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded" disabled={disabled}>
          Send
        </button>
      </form>
    </div>
  );
}