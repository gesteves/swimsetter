import React from 'react'

export default function Toggle({ label, description, onChange, checked = false }) {
  return (
    <div className="flex items-center">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${label?.toLowerCase().replace(/\s+/g, '-')}-label`}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-hidden ${
          checked ? 'bg-indigo-600' : 'bg-gray-200'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      {(label || description) && (
        <span className="ml-3 text-sm" id={`${label?.toLowerCase().replace(/\s+/g, '-')}-label`}>
          {label && <span className="font-medium text-gray-900">{label}</span>}
          {description && <span className="text-gray-500"> {description}</span>}
        </span>
      )}
    </div>
  )
} 
