import React from 'react';
import noshow from '../../../images/noshow.png';
import './notFound.css';
import notfound from '../../../images/404.jpg';

const NotFound = ({ unKnown }) => {
	return (
		<div className="mainbody">
			<div className="notfound_box">
				<div className="notfound_img">
					<img src={unKnown ? notfound : noshow} alt="" />
				</div>
				{!unKnown && (
					<div className="notfound_msg">
						<span>No Shows Running In This Location !!!</span>
						<span> Please Select Anothor Location...</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default NotFound;
