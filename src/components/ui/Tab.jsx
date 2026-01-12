function Tab({ tab, activeTab, setActiveTab }) {
  const active = activeTab === tab;

  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`pb-3 transition ${
        active
          ? "text-purple-400 border-b-2 border-purple-500"
          : "hover:text-white"
      }`}
    >
      {tab}
    </button>
  );
}

export default Tab;
