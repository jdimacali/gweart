import { motion } from "framer-motion";
import { Events } from "../page";

type SortOption = "date" | "happening" | "upcoming";

interface EventFiltersProps {
  onSort: (option: SortOption) => void;
  currentSort: SortOption;
}

const EventFilters = ({ onSort, currentSort }: EventFiltersProps) => {
  return (
    <div className="flex gap-4 mb-8 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSort("date")}
        className={`px-4 py-2 rounded-lg transition-all ${
          currentSort === "date"
            ? "bg-purple-500 text-white"
            : "bg-purple-500/20 hover:bg-purple-500/40"
        }`}
      >
        By Date
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSort("happening")}
        className={`px-4 py-2 rounded-lg transition-all ${
          currentSort === "happening"
            ? "bg-purple-500 text-white"
            : "bg-purple-500/20 hover:bg-purple-500/40"
        }`}
      >
        Live Now
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSort("upcoming")}
        className={`px-4 py-2 rounded-lg transition-all ${
          currentSort === "upcoming"
            ? "bg-purple-500 text-white"
            : "bg-purple-500/20 hover:bg-purple-500/40"
        }`}
      >
        Upcoming
      </motion.button>
    </div>
  );
};

export default EventFilters;
