//app.tsx
import { Card, Typography } from '@mui/material';
import { TimerUnit } from './components/timerUnit';
import { useState, useEffect, useMemo } from 'react';
function App() {
    const [count, setCount] = useState(0);
    const [timerState, setTimerState] = useState<'running' | 'idle' | 'paused'>('idle');
    const [txt, setTxt] = useState<'запустить' | 'пауза' | 'возобновить'>('запустить');
    const [isRun, setIsRun] = useState(false);

    useEffect(() => {
        if (isRun) {
            const timerId = setInterval(() => setCount(prevCount => prevCount + 1), 800);

            return () => clearInterval(timerId);
        }
    }, [isRun, timerState]);

    const handleState = () => {
        if (timerState === 'idle') {
            setTimerState('running');
            setIsRun(true);
            setTxt('пауза');

        } else if (timerState === 'running') {
            setTimerState('paused');
            setIsRun(false);
            setTxt('возобновить');

        } else if (timerState === 'paused') {
            setTimerState('running');
            setIsRun(true);
            setTxt('пауза');

        }
    };
    const formattedTime = useMemo(() => {
        const hours = Math.floor(count / 3600);
        const minutes = Math.floor((count % 3600) / 60);
        const seconds = count % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    }, [count]);
    const resetCount = () => {
        setCount(0);
        setIsRun(false);
        setTxt('запустить');
        setTimerState('idle');
    };

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <Card
                raised={true}
                sx={{
                    bgcolor: '#E8E8E8',
                    width: '400px',
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '40px',
                }}
            >
                <Typography variant='h2'>Timer</Typography>
                <TimerUnit
                    formattedTime={formattedTime}
                    reset={resetCount}
                    buttonText={txt}
                    count={count}
                    handleState={handleState}
                />
            </Card>
        </div>
    );
}

export default App;
