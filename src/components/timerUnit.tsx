//timerunit.tsx
import { Box, Typography, Button } from '@mui/material';
import { memo } from 'react';

type timer = {
    count: number;
    buttonText: 'запустить' | 'пауза' | 'возобновить';
    handleState: () => void;
    reset: () => void;
    formattedTime: string;
};
export const TimerUnit = memo((props: timer) => {
    return (
        <Box sx={{ textAlign: 'center', padding: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography variant='h3' className='timer'>
                {props.formattedTime}
            </Typography>
            <Box>
                <Button variant='contained' onClick={props.handleState}>
                    {props.buttonText}
                </Button>
            </Box>
            <Button onClick={props.reset}>сбросить</Button>
        </Box>
    );
});
