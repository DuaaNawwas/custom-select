import React, { useEffect, useState } from "react";

export type SelectOption = {
  label: string;
  value: string | number;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export default function Select({
  multiple,
  value,
  onChange,
  options,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((v) => v !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  const isValueClear = () => {
    return multiple ? Boolean(value.length) : Boolean(value);
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className="relative w-80 min-h-[2.9em] border border-gray-400 flex items-center gap-2 p-2 rounded outline-none focus:border-blue-500"
    >
      <span className="grow">
        {multiple
          ? value?.map((v, i) => {
              return (
                <button
                  key={i}
                  className="px-1 border border-gray-600 hover:backdrop-brightness-90 rounded-md mr-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(v);
                  }}
                >
                  {" "}
                  {v?.label} &times;
                </button>
              );
            })
          : value?.label}
      </span>
      {isValueClear() ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
          className="bg-none text-gray-500 border-none outline-none cursor-pointer p-0 text-lg focus:text-gray-700 hover:text-gray-700"
        >
          &times;
        </button>
      ) : null}
      <div className="bg-gray-500 self-stretch w-[.05rem]"></div>
      <div className="border-[0.25rem] border-transparent border-t-gray-500 translate-y-1"></div>
      <ul
        className={`absolute m-0 p-0 max-h-[15em] overflow-y-auto border-[.05em] rounded w-full left-0 top-[calc(100%+.25em)] bg-white z-10 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {options.map((option, index) => {
          return (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`px-1 py-2 cursor-pointer ${
                isOptionSelected(option) ? "bg-blue-400" : ""
              } ${highlightedIndex === index ? "bg-blue-600 text-white" : ""} `}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
