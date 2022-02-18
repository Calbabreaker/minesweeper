import { useEffect, useState } from "react";

function randint(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

interface Cell {
    value: number;
    mine: boolean;
    flagged: boolean;
    revealed: boolean;
}

function loopSurrounding(
    grid: Cell[][],
    x: number,
    y: number,
    func: (cell: Cell, x: number, y: number) => void
): void {
    for (let offsetX = -1; offsetX <= 1; offsetX++) {
        for (let offsetY = -1; offsetY <= 1; offsetY++) {
            // cell is itself so skip
            if (offsetX == 0 && offsetY == 0) continue;

            const [sx, sy] = [x + offsetX, y + offsetY];
            const cell = grid[sx]?.[sy];
            if (cell) {
                func(cell, sx, sy);
            }
        }
    }
}

function createGrid(rows: number, cols: number, mines: number): Cell[][] {
    const grid: Cell[][] = [];
    for (let x = 0; x < cols; x++) {
        grid[x] = [];
        for (let y = 0; y < cols; y++) {
            grid[x][y] = {
                value: 0,
                mine: false,
                flagged: false,
                revealed: false,
            };
        }
    }

    // place randomly mines until reach until reach count
    for (let mineCount = 0; mineCount < mines; ) {
        const x = randint(0, cols);
        const y = randint(0, rows);
        const cell = grid[x][y];
        if (!cell.mine) {
            cell.mine = true;
            mineCount++;

            // increment value for surrounding cells
            loopSurrounding(grid, x, y, (cell) => {
                cell.value++;
            });
        }
    }

    return grid;
}

interface BoardProps {
    rows: number;
    cols: number;
    mines: number;
}

export const Board: React.FC<BoardProps> = ({ rows, cols, mines }) => {
    const [grid, setGrid] = useState<Cell[][]>([]);

    useEffect(() => {
        setGrid(createGrid(rows, cols, mines));
    }, []);

    // recursively reveal cells to reveal blank cells
    function revealCellInGrid(grid: Cell[][], x: number, y: number): void {
        const cell = grid[x][y];
        if (cell.revealed) return;
        cell.revealed = true;

        if (cell.value != 0 || cell.mine) return;
        loopSurrounding(grid, x, y, (_, x, y) => {
            revealCellInGrid(grid, x, y);
        });
    }

    function revealCell(x: number, y: number): void {
        // create copy of grid because react doesn't react setting same reference of object
        const newGrid = Array.from(grid);
        revealCellInGrid(grid, x, y);
        setGrid(newGrid);
    }

    return (
        <div className="board" style={{ "--rows": rows }}>
            {grid.map((col, x) =>
                col.map((cell, y) => (
                    <div
                        key={x * rows + y}
                        className={`cell ${cell.revealed ? "revealed" : ""}`}
                        onClick={() => revealCell(x, y)}
                    >
                        <span>{cell.mine ? "💣" : cell.value || ""}</span>
                    </div>
                ))
            )}
        </div>
    );
};
