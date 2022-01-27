import "./register.css";
import { Cancel, Room } from "@material-ui/icons";
import { useRef, useState } from "react";
import axios from "axios";

const Register = ({ setShowRegister }) => {
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = {
			username: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		try {
			await axios.post("http://localhost:8800/api/users/register", newUser);
			setError(false);
			setSuccess(true);
		} catch (err) {
			setError(true);
		}
	};

	return (
		<div className="registerContainer">
			<div className="logo">
				<Room className="logoIcon" />
				<span>City-Pin</span>
			</div>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="username" ref={nameRef} />
				<input type="email" placeholder="email" ref={emailRef} />
				<input type="password" placeholder="password" ref={passwordRef} />
				<button className="registerBtn">Register</button>
				{success && (
					<span className="success">You can login now Succesffuly!</span>
				)}
				{error && <span className="failure">Something went Wrong!</span>}
			</form>
			<Cancel
				className="registerCancel"
				onClick={() => setShowRegister(false)}
			/>
		</div>
	);
};

export default Register;
