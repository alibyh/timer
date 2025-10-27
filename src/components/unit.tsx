import { Button, Box, Typography } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';

export default function Unit() {
    const [count, setCount] = useState(0);
    const [isRun, setIsRun] = useState(false);
    const [timerState, setTimerState] = useState('idle');

    useEffect(() => {
        if (isRun) {
            const timerId = setInterval(() => setCount(prevCount => prevCount + 1), 1);
            return () => clearInterval(timerId);
        }
    }, [isRun]);
    function changeState(): void {
        if (timerState === 'idle') {
            setTimerState('running');
            setIsRun(true);
        } else if (isRun) {
            setTimerState('paused');
            setIsRun(false);
        } else {
            setTimerState('running');
            setIsRun(true);
        }
    }
    const formattedTime = useMemo(() => {
        const hours = Math.floor(count / 3600);
        const minutes = Math.floor((count % 3600) / 60);
        const seconds = count % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    }, [count]); 

    function reset(): void {
        setCount(0);
        setIsRun(false);
        setTimerState('idle');
    }
    return (
        <Box sx={{ textAlign: 'center', padding: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography variant='h3' className='timer'>
                {formattedTime}
            </Typography>
            <Box className='buttons'>
                <Button variant='contained' onClick={changeState}>
                    {timerState === 'idle' ? 'start' : timerState === 'running' ? 'pause' : 'resume'}
                </Button>
            </Box>
            <Button  onClick={reset}>reset</Button>
        </Box>
    );
}
