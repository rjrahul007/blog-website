import React from "react";

const footer = () => {
  return (
    <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-sm">
      <p>
        © {new Date().getFullYear()} Rahul. Building with purpose, one line at a
        time.
      </p>
    </footer>
  );
};

export default footer;
