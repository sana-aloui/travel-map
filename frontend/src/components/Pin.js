import { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import { Room, Star } from "@material-ui/icons";
import { format } from "timeago.js";
import axios from "axios";
import "../app.css";
import Button from "./Button";

const Pin = ({
	pins,
	setPins,
	handleMarkerClick,
	viewport,
	newPlace,
	setNewPlace,
	currentPlaceId,
	setCurrentPlaceId,
}) => {
	const myStorage = window.localStorage;
	const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
	const [title, setTitle] = useState(null);
	const [desc, setDesc] = useState(null);
	const [rating, setRating] = useState(0);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPin = {
			username: currentUser,
			title,
			desc,
			rating,
			lat: newPlace.lat,
			long: newPlace.long,
		};
		try {
			const res = await axios.post("http://localhost:8800/api/pins", newPin);
			setPins([...pins, res.data]);
			setNewPlace(null);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{pins.map((p) => (
				<>
					<Marker
						latitude={p.lat}
						longitude={p.long}
						offsetLeft={-viewport.zoom * 3.5}
						offsetTop={-viewport.zoom * 7}>
						<Room
							onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
							style={{
								cursor: "pointer",
								fontSize: viewport.zoom * 7,
								color: p.username === currentUser ? "tomato" : "slateblue",
							}}
						/>
					</Marker>
					{p._id === currentPlaceId && (
						<Popup
							latitude={p.lat}
							longitude={p.long}
							closeButton={true}
							closeOnClick={false}
							onClose={() => setCurrentPlaceId(null)}
							anchor="left">
							<div className="card">
								<label>Place</label>
								<h4 className="place">{p.title}</h4>
								<label>Review</label>
								<p className="desc">{p.desc} </p>
								<label>Rating</label>
								<div className="stars">
									{Array(p.rating).fill(<Star className="star" />)}
								</div>
								<label>Information</label>
								<span className="username">
									Created by <b>{p.username}</b>
								</span>
								<span className="date"> {format(p.createdAt)}</span>
							</div>
						</Popup>
					)}
				</>
			))}
			{newPlace && (
				<Popup
					latitude={newPlace.lat}
					longitude={newPlace.long}
					closeButton={true}
					closeOnClick={false}
					onClose={() => setNewPlace(null)}
					anchor="left">
					<div>
						<form onSubmit={handleSubmit}>
							<label>Title</label>
							<input
								placeholder="Enter a title!"
								onChange={(e) => setTitle(e.target.value)}
							/>
							<label>Review</label>
							<textarea
								placeholder="Say us something about this place."
								onChange={(e) => setDesc(e.target.value)}></textarea>
							<label>Rating</label>
							<select onChange={(e) => setRating(e.target.value)}>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
							<button className="submitButton" type="submit">
								Add Pin
							</button>
						</form>
					</div>
				</Popup>
			)}
			<Button currentUser={currentUser} setCurrentUser={setCurrentUser} />
		</>
	);
};

export default Pin;
