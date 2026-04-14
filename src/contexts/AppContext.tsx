import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getCustomAppContext } from "@kontent-ai/custom-app-sdk";
import { Loader } from "../components/utils/Loader";
import { ErrorDisplay } from "../components/utils/ErrorDisplay";

type CustomAppResult = Awaited<ReturnType<typeof getCustomAppContext>>;
type CustomAppSuccess = Extract<CustomAppResult, { isError: false }>;

type AppContextValue = {
  customApp: CustomAppSuccess;
};

type ProviderState =
  | { status: "loading" }
  | { status: "ready"; customApp: CustomAppSuccess }
  | { status: "error"; description: string; code: string };

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProviderState>({ status: "loading" });

  useEffect(() => {
    getCustomAppContext()
      .then((result) =>
        setState(
          result.isError
            ? { status: "error", description: result.description, code: result.code }
            : { status: "ready", customApp: result },
        )
      )
      .catch((error) => {
        console.error("Error initializing app context:", error);
        setState({
          status: "error",
          description: `Failed to initialize app context: ${String(error)}`,
          code: "UNKNOWN_ERROR",
        });
      });
  }, []);

  switch (state.status) {
    case "loading":
      return (
        <div className="centered">
          <Loader title="Just a moment..." message="Initializing the application" />
        </div>
      );
    case "error":
      return <ErrorDisplay description={state.description} code={state.code} />;
    case "ready":
      return (
        <AppContext.Provider value={{ customApp: state.customApp }}>
          {children}
        </AppContext.Provider>
      );
  }
};

export const useAppContext = () => {
  const value = useContext(AppContext);
  if (!value) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return value;
};
