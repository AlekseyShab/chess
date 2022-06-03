import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart:() => void
}
const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {

    const [blackTime, setBlackTime] = useState(600);
    const [whiteTime, setWhiteTime] = useState(600);

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    },[currentPlayer])
    
    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }

        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }
    
    function decrementBlackTimer() {
        setBlackTime( prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    function handleRestart() {
        setWhiteTime(600);
        setBlackTime(600);
        restart();
    }
    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart</button>
            </div>

            <h1>Black - {blackTime}</h1>
            <h1>White - {whiteTime}</h1>
        </div>
    );
};

export default Timer;