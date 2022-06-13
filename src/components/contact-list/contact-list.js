import {useEffect, useState} from "react";
import classes from './contact-list.module.css';
import ContactInfo from "../contact-info/contact-info";

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function ContactList(props) {
    const [contacts, setContacts] = useState(alphabet.reduce((o, key) => ({...o, [key]: []}), {}));
    const [filter, setFilter] = useState('a');
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');
    const groupByLastname = (array) => {
        return array.reduce((pre, curr) => {
            pre[curr.name.last.charAt(0).toLowerCase()] = [...pre[curr.name.last.charAt(0).toLowerCase()] || [], curr]
            return pre;
        }, {})
    };
    useEffect(() => {
        //ToDo: replace fetch with axios
        try {
            fetch('https://randomuser.me/api/?nat=us,br,ca,gb&results=500').then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.error)
            }).then(json => {
                setContacts(prevState => {
                    return {
                        ...prevState,
                        ...groupByLastname(json.results)
                    }
                });
                setLoading(false);
                console.log(groupByLastname(json.results));
            })
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        loading ? <h2>Loading...</h2> :
            <div className={classes.phoneBook}>
                <ul className={classes.tabsWrapper}>
                    {Object.entries(contacts).map(([key, item]) => <li className={classes.tab} key={key}>
                        <button disabled={!item.length} onClick={() => setFilter(key)}
                                style={{background: key === filter ? 'gray' : 'white'}}>
                            {key} <small>{item.length}</small></button>
                    </li>)}
                </ul>
                <div className={classes.contactsWrapper}>{(contacts[filter] || []).map(contact => <ContactInfo
                    key={contact.email} contact={contact}/>)}
                </div>
            </div>
    );
}

export default ContactList;