import { AuthProvider } from "@/contexts/AuthContext";
import { ApiProvider } from "@/contexts/ApiContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ApiProvider>{children}</ApiProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AppProviders;

