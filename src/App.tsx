import { Suspense, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import image1 from "./assets/image1.jpg";
import Icon from "./assets/image3.svg";

function Todo() {
	Todo2();
}

function Todo2() {
	throw new Error();
}

export const App = () => {
	const [count, setCount] = useState<number>(0);

	// if (__PLATFORM__ === "desktop") {
	// 	return <div>is desktop</div>;
	// }

	// if (__PLATFORM__ === "mobile") {
	// 	return <div>is mobile</div>;
	// }

	const decrease = () => setCount((prev) => prev - 1);

	const increase = () => {
		Todo();
		setCount((prev) => prev + 1);
	};

	return (
		<div data-testid="apptestid">
			gfhffdsfsdfdsffdsf dsfsdfsdfds fdsfsd
			<img src={image1} alt="sdf" />
			<Icon height={50} width={50} color="red" />
			<h1>{__PLATFORM__}</h1>
			<Link to="/">Main</Link>
			<Link to="/about">About</Link>
			<Link to="/shop">Shop</Link>
			<h1 className={styles.value}>Count: {count}</h1>
			<button className={styles.button} onClick={decrease}>
				-
			</button>
			<button className={styles.button} onClick={increase}>
				+
			</button>
			<Outlet />
		</div>
	);
};
