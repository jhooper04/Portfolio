"use client";
import { useEffect, useState } from "react";

type Props = {
    className: string,
    seed?: number,
    cellSize?: number,
    gridSize?: number,
    chipSize?: number,
    chipStartPoint?: Point,
    growStepCount?: number,
    debug?: boolean,
};

type Point = { x: number, y: number };
type Trace = {
    points: Point[],
    direction: Point,
    maxLength: number,
};

type circuitOptions = {
    seed?: number,
    cellSize?: number,
    gridSize?: number,
    chipSize?: number,
    chipStartPoint?: Point,
    growStepCount?: number,
};

class Circuit {

    seed: number;
    cellSize: number;
    gridSize: number;
    chipSize: number;
    chipStartPoint: Point;
    growStepCount: number;

    traces: Trace[];
    usedGrid: boolean[][];

    private currentSeed: number;

    constructor(options: circuitOptions) {

        this.seed = options.seed || (Math.random() * (1000000 - 1) + 1);
        this.cellSize = options.cellSize || 10;
        this.gridSize = options.gridSize || 100;
        this.chipSize = options.chipSize || 200
        this.chipStartPoint = options.chipStartPoint || { x: 400, y: 400 };
        this.growStepCount = options.growStepCount || 40;

        this.currentSeed = this.seed;
        this.traces = [];
        this.usedGrid = Array.from(Array(this.gridSize), () => Array(this.gridSize).fill(false));

        this._initializeUsedGrid(41, 41, 19, 19);

        this._initializeTraces(1, 0, 0, 0);
        this._initializeTraces(0, 1, 1, 0);
        this._initializeTraces(-1, 0, 1, 1);
        this._initializeTraces(0, -1, 0, 1);

        for (let i = 0; i < this.growStepCount; i++) {
            this.runGrowStep();
        }
    }

    random() {
        let x = Math.sin(this.currentSeed++) * 10000;
        return x - Math.floor(x);
    }

    range(min: number, max: number) {
        return this.random() * (max - min) + min;
    }

    private _initializeUsedGrid(x: number, y: number, w: number, h: number) {

        for (let row = y; row < y + h; row++) {

            for (let col = x; col < x + w; col++) {
                this.usedGrid[row][col] = true;
            }
        }
    }

    private _initializeTraces(axisX: number, axisY: number, startX: number, startY: number) {

        const pointCount = this.chipSize / this.cellSize;

        for (let p = 1; p < pointCount; p++) {
            const newTrace: Trace = { points: [], direction: { x: axisY, y: -axisX }, maxLength: 40 };

            newTrace.points.push({
                x: (this.chipStartPoint.x + startX * this.chipSize) + (p * 10 * axisX),
                y: (this.chipStartPoint.y + startY * this.chipSize) + (p * 10 * axisY),
            });

            this._setPointUsed(newTrace.points[0]);

            newTrace.points.push({
                x: newTrace.points[0].x + (newTrace.direction.x * (this.cellSize + 0)),
                y: newTrace.points[0].y + (newTrace.direction.y * (this.cellSize + 0)),
            });

            this._setPointUsed(newTrace.points[1]);
            this.traces.push(newTrace);
        }
    }

    private _isPointUsed(point: Point): boolean {

        const x = Math.floor(point.x / this.cellSize);
        const y = Math.floor(point.y / this.cellSize);

        if (y < 1 || y > this.usedGrid.length - 1) return true;
        if (x < 0 || x > this.usedGrid[0].length - 1) return true;

        return this.usedGrid[y][x];
    }

    private _setPointUsed(point: Point) {

        const x = Math.floor(point.x / this.cellSize);
        const y = Math.floor(point.y / this.cellSize);

        if (y < 0 || y > this.usedGrid.length - 1) return;
        if (x < 0 || x > this.usedGrid[0].length - 1) return;

        this.usedGrid[y][x] = true;
    }

    private _cardinals: { key: string, direction: Point }[] = [
        { key: 'N', direction: { x: 0, y: -1 } },
        { key: 'NW', direction: { x: -1, y: -1 } },
        { key: 'W', direction: { x: -1, y: 0 } },
        { key: 'SW', direction: { x: -1, y: 1 } },
        { key: 'S', direction: { x: 0, y: 1 } },
        { key: 'SE', direction: { x: 1, y: 1 } },
        { key: 'E', direction: { x: 1, y: 0 } },
        { key: 'NE', direction: { x: 1, y: -1 } },
    ];

    private _directionToCardinal(direction: Point): { index: number, key: string, direction: Point } | null {
        for (let i = 0; i < this._cardinals.length; i++) {
            if (direction.x == this._cardinals[i].direction.x && direction.y == this._cardinals[i].direction.y) {
                return { ...this._cardinals[i], index: i };
            }
        }
        return null;
    }

    private _rotateLeft(direction: Point): Point {
        const cardinal = this._directionToCardinal(direction);

        if (cardinal == null) return direction;

        if (cardinal.index == this._cardinals.length - 1)
            return { ...this._cardinals[0].direction };

        return { ...this._cardinals[cardinal.index + 1].direction };
    }

    private _rotateRight(direction: Point): Point {
        const cardinal = this._directionToCardinal(direction);

        if (cardinal == null) return direction;

        if (cardinal.index == 0)
            return { ...this._cardinals[this._cardinals.length - 1].direction };

        return { ...this._cardinals[cardinal.index - 1].direction };
    }

    private _shuffleTraces = (array: Trace[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

    runGrowStep() {

        for (let trace of this._shuffleTraces(this.traces)) {

            if (trace.points.length >= trace.maxLength) return;

            const last = trace.points[trace.points.length - 1];

            const forward: Point = {
                x: last.x + (trace.direction.x * this.cellSize),
                y: last.y + (trace.direction.y * this.cellSize),
            };

            const forwardTwo: Point = {
                x: last.x + (trace.direction.x * this.cellSize * 2),
                y: last.y + (trace.direction.y * this.cellSize * 2),
            };
            const forwardThree: Point = {
                x: last.x + (trace.direction.x * this.cellSize * 3),
                y: last.y + (trace.direction.y * this.cellSize * 3),
            };

            const leftTurn = this._rotateLeft(trace.direction);
            const left: Point = {
                x: last.x + (leftTurn.x * this.cellSize),
                y: last.y + (leftTurn.y * this.cellSize),
            };

            const rightTurn = this._rotateRight(trace.direction);
            const right: Point = {
                x: last.x + (rightTurn.x * this.cellSize),
                y: last.y + (rightTurn.y * this.cellSize),
            };

            const canGoLeft = !(this._isPointUsed(forward) || this._isPointUsed(left));
            const canGoRight = !(this._isPointUsed(forward) || this._isPointUsed(right));
            const canGoForward = !(this._isPointUsed(forward) || (this._isPointUsed(left) && this._isPointUsed(right)));

            let hasGrown = false;

            const turnChanceRatio = 0.95 - (trace.points.length / trace.maxLength);

            if (this.range(0, 1) > turnChanceRatio) {
                if (canGoLeft && this.range(0, 1) > 0.5) {
                    trace.points.push(left);
                    this._setPointUsed(left);
                    trace.direction = leftTurn;
                    hasGrown = true;
                }
                else if (canGoRight) {
                    trace.points.push(right);
                    this._setPointUsed(right);
                    trace.direction = rightTurn;
                    hasGrown = true;
                } else if (canGoForward) {
                    last.x = forward.x;
                    last.y = forward.y;
                    this._setPointUsed(forward);
                    hasGrown = true;
                }
            }
            else {

                if (canGoForward) {
                    last.x = forward.x;
                    last.y = forward.y;
                    this._setPointUsed(forward);
                    hasGrown = true;
                }
                else if (canGoLeft) {
                    trace.points.push(left);
                    this._setPointUsed(left);
                    trace.direction = leftTurn;
                    hasGrown = true;
                }
                else if (canGoRight) {
                    trace.points.push(right);
                    this._setPointUsed(right);
                    trace.direction = rightTurn;
                    hasGrown = true;
                }
            }





            // if (hasGrown == false && this.range(0, 1) > 0.98 && !this._isPointUsed(forwardTwo) && !this._isPointUsed(forwardThree)) {

            //     const newTrace: Trace = { direction: {...trace.direction}, maxLength: trace.maxLength - trace.points.length, points: []};

            //     newTrace.points.push(forwardTwo);

            //     this._setPointUsed(newTrace.points[0]);
            //     newTrace.points.push(forwardThree);

            //     this._setPointUsed(newTrace.points[1]);
            //     this.traces.push(newTrace);

            // }
        }
    }
}

function getPath(trace: Trace) {
    let result: string[] = [];
    result.push(`M ${trace.points[0].x} ${trace.points[0].y}`);

    for (let i = 1; i < trace.points.length; i++) {
        result.push(`L ${trace.points[i].x} ${trace.points[i].y}`);
    }
    return result.join(' ');
}

function drawTrace(trace: Trace): React.ReactNode {

    if (trace.points.length <= 1) return '';

    const first = trace.points[0];
    const last = trace.points[trace.points.length - 1];

    return (
        <g key={`${first.x} ${first.y}`}>
            <path d={getPath(trace)} stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx={first.x} cy={first.y} r={4} stroke="currentColor" fill="currentColor" />
            <circle cx={last.x} cy={last.y} r={4} stroke="currentColor" fill="currentColor" />
        </g>
    );
}

const restartAnimations = (element: Element): void => {
    for (const animation of document.getAnimations()) {
        if (
            animation.effect instanceof KeyframeEffect &&
            element.contains(animation.effect.target)
        ) {
            animation.cancel();
            animation.play();
        }
    }
};

const CircuitImage = ({ className, seed, cellSize, gridSize, chipSize, chipStartPoint, growStepCount, debug }: Props) => {
    const [circuitInstance, setCircuitInstance] = useState<Circuit | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        setIsMounted(true);

        const circuit = new Circuit({ seed, cellSize, gridSize, chipSize, chipStartPoint, growStepCount });
        setCircuitInstance(circuit);
    }, [seed, cellSize, gridSize, chipSize, chipStartPoint, growStepCount]);

    const sparkEnd = (e: React.AnimationEvent<SVGElement>) => {
        // Do something
        if (circuitInstance?.traces.length && isMounted) {
            const trace = circuitInstance?.traces[Math.floor(Math.random() * circuitInstance?.traces.length)];
            const el = e.currentTarget;

            el.style.animation = 'none';
            el.style.display = 'none';
            setTimeout(() => {
                el.style.display = 'inherit';
                el.style.offsetPath = 'path(\'' + getPath(trace) + '\')';
                el.style.animation = 'sparkle ' + (trace.points.length * 100) + 'ms linear 1 alternate, grow-spin ' + (trace.points.length * 100) + 'ms linear 1 alternate';
            }, 0);
        }
    };

    let spark = null;
    let spark2 = null;
    if (circuitInstance?.traces.length) {
        spark = <path d="M 23.33179,16.823202 17.681867,15.84988 9.8089559,23.942198 10.757465,18.144463 2.871458,10.065583 8.5213825,11.038905 16.394292,2.9465868 15.445785,8.7443226Z" className=" duration-300 bg-red-500 w-4 h-4 rounded-full" r={5} fill="white" style={{
            offsetPath: 'path(\'' + getPath(circuitInstance?.traces[0]) + '\')',
            offsetAnchor: '0px 0px',
            offsetRotate: '0deg',
            //offsetPosition: '-10px -10px',
            animation: 'sparkle ' + (circuitInstance.traces[0].points.length * 100) + 'ms linear 1 alternate, grow-spin ' + (circuitInstance.traces[0].points.length * 100) + 'ms linear 1 alternate',
            offsetDistance: "0%",
            transformBox: 'fill-box',
            transformOrigin: 'center',
            opacity: 0,
        }} onAnimationEnd={sparkEnd} />;
        spark2 = <path d="M 23.33179,16.823202 17.681867,15.84988 9.8089559,23.942198 10.757465,18.144463 2.871458,10.065583 8.5213825,11.038905 16.394292,2.9465868 15.445785,8.7443226Z" className=" duration-300 bg-red-500 w-4 h-4 rounded-full" r={5} fill="white" style={{
            offsetPath: 'path(\'' + getPath(circuitInstance?.traces[0]) + '\')',
            offsetAnchor: '0px 0px',
            offsetRotate: '0deg',
            //offsetPosition: '-10px -10px',
            animation: 'sparkle ' + (circuitInstance.traces[0].points.length * 100) + 'ms linear 1 alternate, grow-spin ' + (circuitInstance.traces[0].points.length * 100) + 'ms linear 1 alternate',
            offsetDistance: "0%",
            transformBox: 'fill-box',
            transformOrigin: 'center',
            opacity: 0,
        }} onAnimationEnd={sparkEnd} />;
    }

    return (
        <svg viewBox="0 0 1000 1000" className={className} preserveAspectRatio="xMidYMin" onClick={() => { circuitInstance?.runGrowStep(); setCurrentStep(currentStep + 1); }}>
            <rect x="410" y="410" width="180" height="180" stroke="black" fill="black" />
            {circuitInstance?.traces.map(drawTrace)}
            {debug && circuitInstance?.usedGrid.map((row, ri) => row.map((col, ci) => (
                <circle key={`${ri} ${ci}`} cx={ci * circuitInstance?.cellSize} cy={ri * circuitInstance?.cellSize} r="2" fill={col ? 'red' : 'green'} />
            )))}
            {spark}
            {spark2}
        </svg>

    )
};


export default CircuitImage;