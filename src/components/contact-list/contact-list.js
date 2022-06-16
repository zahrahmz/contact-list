import {useEffect, useState} from "react";
import classes from './contact-list.module.css';
import ContactInfo from "../contact-info/contact-info";
import axios from "axios";
import {Loading} from "../loading/loading";

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function ContactList(props) {
    const [contacts, setContacts] = useState(alphabet.reduce((o, key) => ({...o, [key]: []}), {}));
    const [filter, setFilter] = useState('a');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const groupByLastname = (array) => {
        return array.reduce((pre, curr) => {
            pre[curr.name.last.charAt(0).toLowerCase()] = [...pre[curr.name.last.charAt(0).toLowerCase()] || [], curr]
            return pre;
        }, {})
    };
    useEffect(() => {
        console.log('check');
        axios.get('https://randomuser.me/api/?nat=us,br,ca,gb&results=500')
            .then(({data}) => {
                const {results} = data;
                setContacts(prevState => {
                    return {
                        ...prevState,
                        ...groupByLastname(results)
                    }
                });
                setLoading(false);
            }).catch(({response}) => {
            setError(response.data.error);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        loading ? <Loading/> : error ? <h3 className={classes.error}>{error}</h3> :
            <div className={classes.phoneBook}>
                <ul className={classes.tabsWrapper}>
                    {Object.entries(contacts).map(([key, item]) => <li className={classes.tab} key={key}>
                        <button disabled={!item.length} onClick={() => setFilter(key)}
                                style={{background: key === filter ? '#eeeeee' : '#ffffff'}}>
                            {key} <small>{item.length}</small></button>
                    </li>)}
                </ul>
                <div className={classes.contactsWrapper}>{(contacts[filter] || []).map(contact => <ContactInfo
                    key={contact.login.username} contact={contact}/>)}
                </div>
            </div>
    );
}

export default ContactList;