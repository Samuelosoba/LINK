import { Toaster } from "sonner";
import AppRoute from "./routes/AppRoute";

export default function App() {
  return (
    <>
      <Toaster richColors />
      <AppRoute />
    </>
  );
}
