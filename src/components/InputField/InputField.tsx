import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
  passwordToggle?: boolean;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled:
    "bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600", // 🌙
  outlined:
    "border border-gray-400 focus:ring-2 focus:ring-blue-500 dark:border-gray-600", // 🌙
  ghost:
    "border-none bg-transparent focus:ring-2 focus:ring-blue-500 dark:text-white", // 🌙
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
  passwordToggle = false,
}) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInternalValue("");
    onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <label className="font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={passwordToggle ? (showPassword ? "text" : "password") : type}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          className={`w-full rounded-md focus:outline-none ${sizeClasses[size]} ${
            variantClasses[variant]
          } ${invalid ? "border-red-500 focus:ring-red-500" : ""} ${
            disabled
              ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-70" // 🌙
              : ""
          } dark:text-white`} // 🌙
        />

        {/* Clear button */}
        {clearable && internalValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" // 🌙
            aria-label="Clear input"
          >
            ✕
          </button>
        )}

        {/* Password toggle button */}
        {passwordToggle && type === "password" && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" // 🌙
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {invalid && errorMessage ? (
        <span className="text-sm text-red-600 dark:text-red-400">{errorMessage}</span> // 🌙
      ) : helperText ? (
        <span className="text-sm text-gray-500 dark:text-gray-400">{helperText}</span> // 🌙
      ) : null}
    </div>
  );
};
