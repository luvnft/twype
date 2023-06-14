import { StrictMode } from "react";
import { Router } from "@/Router";
import { AuthProvider, PolybaseProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";

const polybase = new Polybase();
const auth = new Auth();

function App() {
  return (
    <StrictMode>
      <PolybaseProvider polybase={polybase}>
        <AuthProvider auth={auth} polybase={polybase}>
          <Router />
        </AuthProvider>
      </PolybaseProvider>
    </StrictMode>
  );
}

export default App;
