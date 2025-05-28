import React from 'react'

export default function Toggle({ label, description, onChange, checked = false }) {  
  const labelId = `${label?.toLowerCase().replace(/\s+/g, '-')}-label`

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelId}
      aria-label={label ? undefined : 'Toggle switch'}
      onClick={() => onChange(!checked)}
      className="flex items-center w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 rounded"
    >
      <div
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
          checked ? 'bg-indigo-600' : 'bg-gray-200'
        }`}
        aria-hidden="true"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
      {(label || description) && (
        <span
          className="ml-3"
          id={labelId}
        >
          {label && <span className="text-gray-700">{label}</span>}
          {description && <span className="text-gray-500"> {description}</span>}
        </span>
      )}
    </button>
  )
} 
