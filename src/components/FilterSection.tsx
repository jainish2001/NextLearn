import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  expanded: boolean;
  toggle: () => void;
  onChange: (value: string) => void;
}

export default function FilterSection({
  title,
  options,
  selected,
  expanded,
  toggle,
  onChange,
}: FilterSectionProps) {
  return (
    <div>
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100"
      >
        <span>{title}</span>
        {expanded ? (
          <ChevronUpIcon className="w-5 h-5" />
        ) : (
          <ChevronDownIcon className="w-5 h-5" />
        )}
      </button>
      {expanded && (
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary cursor-pointer px-2 py-1 rounded-lg transition-colors duration-150 hover:bg-primary/10 dark:hover:bg-primary/20"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onChange(opt)}
                className="w-4 h-4 rounded border-gray-300 dark:border-zinc-700 text-primary focus:ring-primary/30"
              />
              <span className="truncate">{opt}/</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
