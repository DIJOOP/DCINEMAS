import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadUser } from './actions/userAction';
import './App.css';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import Home from './components/home/Home';
import MovieDetail from './components/moveidetail/MovieDetail';
import Person from './components/persondetail/Person';
import Theatres from './components/booking/Theatres';
import SeatLayout from './components/booking/SeatLayout';
import Payment from './components/payment/Payment';
import Profile from './components/user/Profile';
import UpdatePassword from './components/user/UpdatePassword';
import UpdateProfile from './components/user/UpdateProfile';
import MyBookings from './components/user/MyBookings';
import ReviePage from './components/Reviews/ReviePage';
import UsersList from './components/AdminComponents/users/UsersList';
import Toaster from './components/layout/toaster/Toaster';
import 'react-toastify/dist/ReactToastify.css';
import UpdateUser from './components/AdminComponents/users/UpdateUser';
import MoviesList from './components/AdminComponents/movie/MoviesList';
import TheatreList from './components/AdminComponents/theatre/TheatreList';
import CelebList from './components/AdminComponents/celebs/CelebList';
import BookingList from './components/AdminComponents/booking/BookingList';
import NewMovie from './components/AdminComponents/movie/NewMovie';
import UpdateMovie from './components/AdminComponents/movie/UpdateMovie';
import NewTheatre from './components/AdminComponents/theatre/NewTheatre';
import UpdateTheatre from './components/AdminComponents/theatre/UpdateTheatre';
import NewCelebs from './components/AdminComponents/celebs/NewCelebs';
import EditCeleb from './components/AdminComponents/celebs/EditCeleb';
import SelectLocation from './components/layout/Location/SelectLocation';
import Stripeconfig from './components/payment/Stripeconfig';
import BookingSuccess from './components/payment/BookingSuccess';
import Dashboard from './components/AdminComponents/dashBoard/Dashboard';
import RequireAuth from './components/outlets/RequireAuth';
import LoginSignup from './components/user/loginSignup/LoginSignup';
import Player from './components/moveidetail/Player';
import Slider from './components/layout/carosal/Slider';
import NotFound from './components/layout/notFound/NotFound';
import TEST from './components/TEST';


function App() {
	const { user } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const ROLES = {
		User: 'user',
		Admin: 'admin'
	};

	useEffect(
		() => {
			if (!user) {
				dispatch(LoadUser());
			}
		},
		[]
	);

	return (
		<Router>
			<Header />
			<Toaster />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/movie/:id" element={<MovieDetail />} />
				<Route path="/person/:id" element={<Person />} />
				<Route path="/theatrelist/:id" element={<Theatres />} />
				<Route path="/seatselect/:id/:date/:timeIndex" element={<SeatLayout />} />
				<Route path="/movie/reviews/:id" element={<ReviePage />} />
				<Route path="/movie/Trailer" element={<Player />} />
				<Route path="/login" element={<LoginSignup />} />
				<Route path="/slide" element={<Slider/>} />
				<Route path="*" element={<NotFound unKnown={true}/>} />


				<Route path="/test" element={<TEST/>} />

				{/* protected routes */}
				<Route element={<RequireAuth allowedRoles={[ ROLES.Admin, ROLES.User ]} />}>
					<Route path="/payment/:id" element={<Payment />} />
					<Route path="/payment/stripe" element={<Stripeconfig />} />
					<Route path="/payment/success" element={<BookingSuccess />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile/update" element={<UpdateProfile />} />
					<Route path="/profile/updatepassword" element={<UpdatePassword />} />
					<Route path="/profile/bookings" element={<MyBookings />} />
				</Route>

				{/* AdminRoutes */}
				<Route element={<RequireAuth allowedRoles={[ ROLES.Admin ]} />}>
					<Route path="/admin/users" element={<UsersList />} />
					<Route path="/admin/user/:id" element={<UpdateUser />} />

					<Route path="/admin/movies" element={<MoviesList />} />
					<Route path="/admin/addmovie" element={<NewMovie />} />
					<Route path="/admin/updatemovie/:id" element={<UpdateMovie />} />

					<Route path="/admin/theatres" element={<TheatreList />} />
					<Route path="/admin/addtheatre" element={<NewTheatre />} />
					<Route path="/admin/updatetheatre/:id" element={<UpdateTheatre />} />

					<Route path="/admin/celebs" element={<CelebList />} />
					<Route path="/admin/addcelebs" element={<NewCelebs />} />
					<Route path="/admin/updateceleb/:id" element={<EditCeleb />} />

					<Route path="/admin/bookings" element={<BookingList />} />
					<Route path="/admin/location" element={<SelectLocation />} />
					<Route path="/admin/dashboard" element={<Dashboard />} />
				</Route>
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
