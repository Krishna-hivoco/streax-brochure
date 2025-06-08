import React from 'react'

function button({text}) {
  return (
    <button className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-pink-50 hover:scale-105 transition-all duration-200 active:scale-95">
      {text}
    </button>
  );
}

export default button