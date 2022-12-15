import React from 'react'
import PropTypes from 'prop-types';

const Index = ({ color, textColor, contained, children, className = '', ...rest }) => {
	return (
		<div>
			{contained ?
				(
					<button {...rest} className={`border-2 border-${color} px-4 py-2 text-${textColor} rounded-lg duration-150 hover:scale-95 hover:bg-${color} shadow-lg hover:shadow-${color}/40`}>{children}</button>)
				:
				(
					<button {...rest} className={`bg-${color} px-4 py-2 text-${textColor} rounded-lg duration-150 hover:scale-[0.99] hover:bg-primaryDark shadow-lg w-full hover:shadow-${color}/40 ${className}`}>{children}</button>
				)}
		</div>
	)
}

Index.defaultProps = {
	color: 'primary',
	textColor: 'white',
};

Index.propTypes = {
	title: PropTypes.string,
	textColor: PropTypes.string,
};

export default Index