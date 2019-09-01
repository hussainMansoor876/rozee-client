import React from 'react'

const InfoCard = ({ title, items, active }) => {
    return (
        <section className={`panel ${active ? "important" : null}`}>
            <h2>{title}</h2>
            <ul>

                {items && items.map(newItem => (
                    <React.Fragment>
                        <li><b>{newItem.imp} </b>{newItem.desc}</li>
                    </React.Fragment>
                ))}

            </ul>
        </section>
    )
}

export default InfoCard
