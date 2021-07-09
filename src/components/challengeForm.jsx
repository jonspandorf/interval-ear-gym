import { FormControl } from '@material-ui/core';
import { FormLabel  } from '@material-ui/core';
import { FormControlLabel   } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useState } from 'react';



const ChallengeForm = () => {

    const [value, setValue] = useState('');

    const handleChange = (e) => {
        // TODO
        setValue(e.target.value)
        
    }

    return(
        <>
        <FormControl component="fieldset">
            <FormLabel component="legend">How many Intervals in the challenge?</FormLabel>
            <RadioGroup aria-label="interval-choice" name="intervals" value={value} onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
                <FormControlLabel value="10" control={<Radio />} label="10" />
            </RadioGroup>
            <Button type="submit" variant="contained" color="primary">
                To Challenge
            </Button>
        </FormControl>
        </>
    )
}

export default ChallengeForm