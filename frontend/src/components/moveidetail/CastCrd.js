import React from 'react';
import './castcard.css';
import { Link } from 'react-router-dom';

const CastCrd = ({person}) => {
	return (
		<Link to={`/person/${person.personID}`}>
			<div className="main_container">
				<div className="avatar_box">
					<img
						src={person&&person.image.url}
						alt=""
					/>
				</div>
				<span className="person_name">{person&&person.name}</span>
				<span className="person_role">{person&&person.role}</span>
			</div>
		</Link>
	);
};

export default CastCrd;
