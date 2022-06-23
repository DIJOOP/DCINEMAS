import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useLocation, useNavigate } from 'react-router-dom';
import './Player.css';

const Player = () => {
	const location = useLocation();
	const url = location.state.url;
	console.log(url);
	const navigate = useNavigate();

	useEffect(() => {
		window.scroll(0, 0);
	}, []);

	return (
		<div className="media_player">
			<div className="player">
				<div className="back_button">
					<button
						onClick={() => {
							navigate(-1);
						}}
					>
						{' '}
						&lt; Go Back
					</button>
				</div>
				<ReactPlayer width="80vw" height="38vw" controls url={url && url} />
			</div>
		</div>
	);
};

export default Player;
