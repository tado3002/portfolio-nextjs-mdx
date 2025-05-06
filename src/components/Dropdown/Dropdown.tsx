import { BlogCategory } from "@/app/api/categories/route";
import { useEffect, useRef, useState } from "react";

const ChevronDown = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Dropdown = ({
  placeholder = "Pilih kategori",
  onChange,
}: {
  placeholder?: string;
  onChange: (value: string) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<BlogCategory[]>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchBlog = async () => {
    const res = await fetch("/api/categories");
    const data: BlogCategory[] = await res.json();
    setOptions(data);
  };
  if (!options) {
    fetchBlog();
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isVisible]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onChange?.(option);
    setIsVisible(false);
  };

  return (
    <div className={`relative w-44`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className={`inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-secondary p-3 text-sm font-medium text-gray-400 outline-none hover:border-gray-400 focus:border-mint focus:ring-1 focus:ring-mint ${
          !options ? "cursor-not-allowed text-gray-400" : ""
        }`}
        aria-expanded={isVisible}
        aria-controls="dropdown-menu"
        disabled={!options}
      >
        {selectedOption || placeholder}
        <span
          className={`transform transition-transform duration-200 ${isVisible ? "rotate-180" : ""}`}
        >
          <ChevronDown size={20} />
        </span>
      </button>

      {isVisible && options ? (
        <ul
          id="dropdown-menu"
          role="menu"
          className="absolute z-10 mt-2 w-full rounded-md border border-mint bg-secondary shadow-lg"
        >
          {options.map((option) => (
            <li key={option.categoryName}>
              <button
                role="option"
                tabIndex={0}
                aria-selected={selectedOption === option.categoryName}
                onClick={() => handleOptionClick(option.categoryName)}
                className="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-400 hover:bg-primary hover:text-blue-600 focus:bg-primary/70 focus:outline-none"
              >
                {option.categoryName}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        isVisible && (
          <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-200 bg-white p-3 text-sm text-gray-500">
            No options available
          </div>
        )
      )}
    </div>
  );
};

export default Dropdown;
