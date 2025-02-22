import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCustomAppContext, CustomAppContext } from "@kontent-ai/custom-app-sdk";
import { Loader } from "../components/utils/Loader";
import { ErrorDisplay } from "../components/utils/ErrorDisplay";
// Only valid contexts (no error) will be passed down.
export type ValidCustomAppContext = Extract<CustomAppContext, { isError: false }>;

type AppContextState = {
  customApp: ValidCustomAppContext;
};

const AppContext = createContext<AppContextState | null>(null);

type InternalState =
  | { loading: true }
  | { loading: false; context: ValidCustomAppContext; error: null }
  | { loading: false; context: null; error: { description: string; code: string } };

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<InternalState>({ loading: true });

  useEffect(() => {
    const init = async () => {
      try {
        const result = await getCustomAppContext();
        if (result.isError) {
          setState({
            loading: false,
            context: null,
            error: { description: result.description, code: result.code },
          });
        } else {
          // We know it's valid since isError is false.
          setState({
            loading: false,
            context: result as ValidCustomAppContext,
            error: null,
          });
        }
      } catch (err) {
        console.error("Error initializing app context:", err);
        setState({
          loading: false,
          context: null,
          error: { description: "Failed to initialize app context", code: "INIT_ERROR" },
        });
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
