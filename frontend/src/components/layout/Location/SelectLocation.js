import { Autocomplete, autocompleteClasses, Popper, styled, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTheatres } from '../../../actions/theatreActions';
import { Districts } from '../../../constants/miscellaneous';
import './SelectLocation.css';

const SelectLocation = () => {
	const [ district, setDistrict ] = useState('');

	const dispatch = useDispatch();

	const StyledPopper = styled(Popper)({
		[`& .${autocompleteClasses.listbox}`]: {
			// boxSizing: 'border-box',
			'& ul': {
				padding: 0,
				margin: 0
			},

			color: 'white',
			backgroundColor: 'blue'
		}
	});

	return (
		<div className="location_container">
			<div className="autoselect_box">
				<Autocomplete
					className="hhh"
					PopperComponent={StyledPopper}
					onChange={(event, newValue) => {
						console.log(newValue.name);
						setDistrict(newValue.name);
						sessionStorage.setItem('Location', newValue.name);
						dispatch(getTheatres(newValue.name));
					}}
					
					options={Districts}
					getOptionLabel={(option) => option.name}
					getOptionDisabled={(option)=>option.disabled===true?true:false}
					sx={{ width: '100%' }}
					renderInput={(params) => <TextField {...params} label="Select Your Location" variant="filled" />}
				/>
			</div>
		</div>
	);
};

export default SelectLocation;
