import {useEffect, useRef, useState} from "react";
import classes from './contact-info.module.css';

function ContactInfo(props) {
    const [showDetails, setShowDetails] = useState(false);
    const ref = useRef();
    const closeBtn = useRef();
    const {location, name, email, phone, picture, login} = props.contact;
    useEffect(() => {
        document.addEventListener('click', (event) => {
            if (ref?.current?.contains(event.target) && !closeBtn?.current?.contains(event.target)) {
                setShowDetails(true)
            } else {
                setShowDetails(false)
            }
        })
    }, [showDetails])
    return (
        <div className={classes.contact} ref={ref}>
            <p>{`${name.first} ${name.last}`}</p>
            <div className={classes.popUp} id={email}
                 style={{display: showDetails ? 'block' : 'none', opacity: showDetails ? '1' : '0'}}>
                <span className={classes.close} ref={closeBtn}>x</span>
                <div className={classes.content}>
                    <img src={picture.large} alt={name.first}/>
                    <div>
                        <h2>{`${name.first} ${name.last}`}</h2>
                        <div className={classes.info}>
                            <p>e-mail</p><a title={email} href={`mailto:${email}`}>{email}</a>
                            <p>phone</p><a href={`tel: ${phone}`}>{phone}</a>
                            <p>street</p><p>{location.street.name}</p>
                            <p>city</p><p>{location.city}</p>
                            <p>state</p><p>{location.state}</p>
                            <p>postcode</p><p>{location.postcode}</p>
                        </div>
                    </div>
                    <span className={classes.ribbon}>
                        <p>{`USERNAME ${login.username}`}</p>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;