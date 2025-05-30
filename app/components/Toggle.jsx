import React from 'react'
import PropTypes from 'prop-types'

export default function Toggle({ label, description, onChange, checked = false }) {  
  const labelId = `${label.toLowerCase().replace(/\s+/g, '-')}-label`

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelId}
      onClick={() => onChange(!checked)}
      className="flex items-center w-full text-left focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
    >
      <div
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
          checked ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'
        }`}
        aria-hidden="true"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block size-5 transform rounded-full bg-white dark:bg-gray-200 shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
      <span
        className="ml-3 text-sm"
        id={labelId}
      >
        <span className="text-gray-700 dark:text-gray-200">{label}</span>
        {description && <span className="text-gray-500 dark:text-gray-400"> {description}</span>}
      </span>
    </button>
  )
}

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool
} 
