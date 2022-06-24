import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCelebDetail } from '../../actions/celebsAction';
import Loader from '../layout/Loader/Loader';
import './person.css';

const Person = () => {
	const { celebDetail, loading } = useSelector((state) => state.celebDetail);

	const params = useParams();
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!celebDetail || celebDetail._id !== params.id) {
				dispatch(getCelebDetail(params.id));
			}
			window.scrollTo(0, 0);
		},
		[ params.id ]
	);

	return (
		<div className="mainbody">
			{loading ? (
				<Loader />
			) : (
				<div className="person_container">
					<div className="basic_data">
						<img src={celebDetail && celebDetail.photo.url} alt="" />
						<div className="personal_detail">
							<span>{celebDetail && celebDetail.name}</span>
							<div>
								<p>{celebDetail && celebDetail.workedAs.join('•')}</p>
								<p>{`Born: ${celebDetail && celebDetail.birthday
									? new Date(celebDetail.birthday).toString().slice(4, 15)
									: ''}  ${celebDetail && celebDetail.district},${celebDetail &&
									celebDetail.state},${celebDetail && celebDetail.country}`}</p>
							</div>
						</div>
					</div>

					<div className="description_container">
						<div className="person_about">
							<span className="heading">About</span>
							<div className="paragraph">
								<p className="descrptions">{celebDetail && celebDetail.about}</p>
							</div>
						</div>

						{celebDetail &&
							celebDetail.description.map((data) => (
								<div className="person_description">
									<span className="heading">{data.title}</span>
									<div className="paragraph">
										<p className="descrptions">{data.detail}</p>
									</div>
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Person;
