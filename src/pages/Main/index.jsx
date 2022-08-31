import React from "react";
import { useIntl } from "react-intl";
import { FaHeart } from "react-icons/fa";
import { Perahu } from "@onefish/icons-react";

const Main = () => {
	const intl = useIntl();
	return (
		<main>
			<header>
				<h1>
					<Perahu
						color="#3da090"
						weight="fill"
						size={50}
						style={{ marginRight: "10px" }}
					/>
					{intl.formatMessage({ id: "title" })}
				</h1>
			</header>

			<footer>
				<small>
					© {new Date().getFullYear()} made with{" "}
					<FaHeart style={{ color: "red" }} /> by -{" "}
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://azouaoui.netlify.com"
					>
						Riky Nurdiana
					</a>
				</small>
				<br />
				<div className="social-bagdes">
					<a
						href="https://github.com/rikynurdiana"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							alt="GitHub followers"
							src="https://img.shields.io/github/followers/rikynurdiana?label=github&style=social"
						/>
					</a>
				</div>
			</footer>
		</main>
	);
};

export default Main;
