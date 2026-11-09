function SearchBar() {
  return (
    <div className="mt-8 flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Enter LeetCode username..."
        className="
          flex-1
          px-5
          py-4
          rounded-xl
          bg-[#1A1A1A]
          border
          border-[#333]
          outline-none
          focus:border-[#FFA116]
          transition
        "
      />
      <button
        className="
          bg-[#FFA116]
          hover:bg-orange-500
          px-8
          py-2
          rounded-xl
          font-semibold
          text-black
          transition
        "
      >
        Search
      </button>
    </div>
  );
}
export default SearchBar;