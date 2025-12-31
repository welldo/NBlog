"use client";

import React from "react";

const TableBlock = (props: React.TableHTMLAttributes<HTMLTableElement>) => {
	console.log("TableBlock rendered", props);

	return (
		<div className="w-full overflow-x-auto mb-4">
			<table
				className="min-w-full border-collapse"
				style={{ whiteSpace: 'nowrap' }}
				{...props}
			>
				{props.children}
			</table>
		</div>
	);
};

export default TableBlock;
