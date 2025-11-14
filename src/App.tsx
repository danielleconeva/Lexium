import "./App.css";
import { useAuthListener } from "./hooks/useAuthListener";

function App() {
    useAuthListener();

    return (
        <>
            <div></div>
        </>
    );
}

export default App;
