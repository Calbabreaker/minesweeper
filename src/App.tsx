import { Board } from "./Board";

export default function App() {
    return (
        <>
            <h1>Play Minesweeper</h1>
            <Board rows={15} cols={15} mines={20} />
        </>
    );
}
