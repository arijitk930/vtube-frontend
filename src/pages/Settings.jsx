function Settings() {
  console.log("Settings rendered"); // <-- IMPORTANT debug
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="text-gray-400">Manage your account settings here.</p>
    </div>
  );
}

export default Settings;
