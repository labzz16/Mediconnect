import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [dark, setDark] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-sm dark:text-white font-medium transition"
    >
      {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
