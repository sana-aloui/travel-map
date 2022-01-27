import { useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import "./app.css";
import axios from "axios";

import Pin from "./components/Pin";

function App() {
	const [pins, setPins] = useState([]);
	const [newPlace, setNewPlace] = useState(null);
	const [currentPlaceId, setCurrentPlaceId] = useState(null);
	const [viewport, setViewport] = useState({
		width: "100vw",
		height: "100vh",
		latitude: 46,
		longitude: 17,
		zoom: 4,
	});
	useEffect(() => {
		const getPins = async () => {
			try {
				const res = await axios.get("http://localhost:8800/api/pins");
				setPins(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getPins();
	}, []);

	const handleAddClick = (e) => {
		const [long, lat] = e.lngLat;
		setNewPlace({
			lat,
			long,
		});
	};
	const handleMarkerClick = (id, lat, long) => {
		setCurrentPlaceId(id);
		setViewport({ ...viewport, latitude: lat, longitude: long });
	};

	return (
		<div className="App">
			<ReactMapGL
				{...viewport}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
				onViewportChange={(nextViewport) => setViewport(nextViewport)}
				mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
				onDblClick={handleAddClick}
				transitionDuration="200">
				<Pin
					handleMarkerClick={handleMarkerClick}
					viewport={viewport}
					pins={pins}
					setPins={setPins}
					newPlace={newPlace}
					setNewPlace={setNewPlace}
					currentPlaceId={currentPlaceId}
					setCurrentPlaceId={setCurrentPlaceId}
				/>
			</ReactMapGL>
		</div>
	);
}

export default App;
