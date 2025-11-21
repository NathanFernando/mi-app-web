import React from 'react';

function MessageSection({ image, title, text, className, style }) {
    return (
        <section className={`${className} section-message`} style={style}>
            <img src={image} alt={title} />
            <div>
                <h1>{title}</h1>
                <h4 className="regular-txt">{text}</h4>
            </div>
        </section>
    );
}

export default MessageSection;