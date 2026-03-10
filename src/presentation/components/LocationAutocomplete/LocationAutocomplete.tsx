import React, { useState, useRef, useEffect } from 'react';
import { COLOMBIA_LOCATIONS } from '@application/constants/colombiaLocations';
import './LocationAutocomplete.css';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  onSelect?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const LocationAutocomplete: React.FC<Props> = ({ 
  value, 
  onChange, 
  placeholder = "Ciudad, zona o código", 
  className = "",
  onSelect,
  onKeyDown
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    
    if (val.trim().length > 0) {
      const filtered = COLOMBIA_LOCATIONS.filter(loc => 
        loc.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelect = (loc: string) => {
    const city = loc.split(",")[0].trim();
    onChange(city);
    setIsOpen(false);
    if (onSelect) onSelect();
  };

  return (
    <div className={`autocomplete-wrapper ${className}`} ref={wrapperRef}>
      <input
        type="search"
        value={value}
        onChange={handleInputChange}
        onFocus={() => { if (value.trim().length > 0 && suggestions.length > 0) setIsOpen(true); }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="autocomplete-input"
        id="location"
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="autocomplete-list">
          {suggestions.map((loc, index) => (
            <li key={index} onClick={() => handleSelect(loc)} className="autocomplete-item">
              {loc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
