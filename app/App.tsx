import { ExpoRoot } from "expo-router";
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const ctx = require.context('./', true, /.*/);
  
  return (
    <AuthProvider>
      <ExpoRoot context={ctx} />
    </AuthProvider>
  );
}