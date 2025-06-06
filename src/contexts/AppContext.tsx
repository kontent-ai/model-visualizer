import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCustomAppContext, CustomAppContext } from "@kontent-ai/custom-app-sdk";
import { Loader } from "../components/utils/Loader";
import { ErrorDisplay } from "../components/utils/ErrorDisplay";
import { CustomAppError, isCustomAppError } from "../utils/errors";

type ValidCustomAppContext = Extract<CustomAppContext, { isError: false }>;

type AppContextType = {
  customApp: ValidCustomAppContext;
};

type InternalState =
  | { loading: true }
  | { loading: false; context: ValidCustomAppContext; error: null }
  | { loading: false; context: null; error: CustomAppError | { description: string; code: string } };

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<InternalState>({ loading: true });

  useEffect(() => {
    const init = async () => {
      try {
        const result = await getCustomAppContext();
        if (result.isError) {
          throw result;
        } else {
          setState({
            loading: false,
            context: result,
            error: null,
          });
        }
      } catch (error) {
        console.error("Error initializing app context:", error);
        if (isCustomAppError(error)) {
          setState({
            loading: false,
            context: null,
            error: error,
          });
        } else {
          setState({
            loading: false,
            context: null,
            error: { description: `Failed to initialize app context: ${error}`, code: "UNKNOWN_ERROR" },
          });
        }
      }
    };

    init();
  }, []);

  if (state.loading) {
    return (
      <div className="centered">
        <Loader
          title="Just a moment..."
          message="Initializing the application"
        />
      </div>
    );
  }

  if (state.error) {
    return <ErrorDisplay description={state.error.description} code={state.error.code} />;
  }

  return (
    <AppContext.Provider value={{ customApp: state.context! }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
