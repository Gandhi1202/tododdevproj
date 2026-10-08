import React, { useEffect, useState } from 'react'
import "./Application.css";
import { FaTwitter, FaFacebookF, FaUser, FaEnvelope, FaPhone, FaBuilding, FaLock, FaCaretDown } from "react-icons/fa";
import PasswordStrengthBar from 'react-password-strength-bar';
// import PasswordChecklist from 'react-password-checklist';
import Select from 'react-select';
import axios from 'axios';


const Application = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [jobType, setJobType] = useState('');
    const [createPassword, setCreatePassword] = useState('')
    const [reenterPassword, setReenterPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState([]);
    const [countryCode,SetCountryCode]=useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const handlePhoneNumber = (e) => {
        const value = e.target.value;

        const valid = /^\d{0,10}$/
        if (value === "" || valid.test(value)) {
            setPhoneNumber(value)
        }

    }
    const handleReenterPassword = (e) => {
        const conforimPassword = e.target.value;
        setReenterPassword(conforimPassword); // Update reenterPassword

    };

    const handleCreatePassword = (e) => {
        const value = e.target.value;
        setCreatePassword(value);  // Allow password input without restriction
    };


    const createAccount = (e) => {
        e.preventDefault();
        const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(\)><:";'|]).{12,15}$/
        if (!passRegex.test(createPassword)) {
            alert("atleast one number One special chagartaer annd one capital alphaber aand small alphabet and 8 to 12 characters only ");
            return;
        }
        if (createPassword !== reenterPassword) {
            alert("password dosen't match");
            return;
        }
        if (phoneNumber.length !== 10) {
            alert("10  numbers must");
            return;
        }
        const PayLoad = {
            fullName,
            email,
            phoneNumber:`${countryCode} ${phoneNumber}`,
            jobType,
            createPassword,
            district: selectedOption.value,
            product: {
                productId: selectedProduct.name,
            },
        }
        console.log(PayLoad);
        setFullName('');
        setEmail('');
        setPhoneNumber(''); 
        setJobType('');
        setCreatePassword('');
        setReenterPassword('');
        setSelectedProduct('');
        SetCountryCode('');
        setSelectedOption('');
    };
    const jobs = [
        { id: 1, name: 'Developer', value: 'developer' },
        { id: 2, name: 'UI', value: 'ui' },
        { id: 3, name: 'Tester', value: 'tester' },
    ];

    const options = [
        { value: 'sklm', label: 'Srikakulam' },
        { value: 'vizag', label: 'visakapatnam' },
        { value: 'vzm', label: 'vizayanagarm' },
    ];

    const fetchProducts = async () => {
        await axios.get("https://fakestoreapi.com/products")
            .then((response) => {
                console.log(response.data)
                // const formattedProducts = response.data.map((product) => ({
                //     value: product.id,  // or another unique identifier
                //     label: product.title, // or any property you want to display as the label
                // }));
                // setProducts(formattedProducts);
                setProducts(response.data)
            })
            .catch((error) => {
                console.error("fetching api  error");
            })
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <div>
            <div className='main-div'>
                <div className='above-options-register'>
                    <div className='create-text'>Create Account</div>
                    <div><p>Get started with your free account</p></div>
                    <div className='twitter'>
                        <div> <FaTwitter size={24} /> </div>
                        <div>Login via Twiter</div>
                    </div>
                    <div className="facebook">
                        <div><FaFacebookF size={24} />  </div>
                        <div>Login via Facebook</div>
                    </div>
                </div>
                <div className='or-line'>
                    {/* <hr /> */}
                    {/* <div>OR</div> */}
                    <hr className="line" />
                    <span className="or-text">OR</span>
                    <hr className="line" />
                </div>
                <form onSubmit={createAccount}>
                    <div className='person-name'>
                        <div className='person-icon'><FaUser size={18} /></div>


                        <input type="text"
                            className='person-text'
                            placeholder='Full name'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        // required
                        />

                    </div>
                    <div className='email-name'>
                        <div className='email-icon'><FaEnvelope size={18} /></div>

                        <input type="email"
                            className='email-text'
                            placeholder='Email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <div className="person-name">
                        <Select
                            className='searc-select'
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            placeholder="Select a district"
                            isSearchable // Enable search in the dropdown
                        // value={selectedOption}

                        />
                    </div>
                    <div className='phone-number'>
                        <div className='phone-icon'><FaPhone size={18} /></div>

                        <input
                            className='country-name'
                            type="text"
                            placeholder='+91'
                            value={countryCode}
                            onChange={(e)=>SetCountryCode(e.target.value)}
                        />


                        <input
                            className='phone-text'
                            type="text"
                            placeholder='Phone Number'
                            value={phoneNumber}
                            onChange={handlePhoneNumber}
                        />

                    </div>
                    <div className='work-name'>
                        <div className='work-icon'>< FaBuilding size={18} /></div>

                        <select
                            className='work-dropdown'
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        // required
                        >
                            <option value="" >Select Job Type</option>
                            {
                                jobs.map((job) => (
                                    <option key={job.id} value={job.value}>{job.name}</option>
                                ))
                            }
                        </select>

                    </div>
                    <div className="person-name">
                        <Select
                            className='searc-select'
                            placeholder="search-products"
                            defaultValue={selectedProduct}
                            options={products.map((pro) => ({   // fetch data from the dropdown write map() method here or in the api call method also you can write
                                name: pro.rating.count,
                                label: pro.title,
                            }))}
                            // options={products}         
                            onChange={setSelectedProduct}
                            isSearchable
                            components={{
                                DropdownIndicator: () => (
                                    <div style={{ padding: '6px', color: 'orange' }}>
                                        <FaCaretDown size={18} />
                                    </div>
                                ),
                            }}
                        />
                    </div>
                    <div className='password-name'>
                        <div className='password-icon'><FaLock size={18} /></div>

                        <input
                            className='password-text'
                            name="password"
                            type="password"
                            placeholder='Create Password'
                            value={createPassword}
                            onChange={handleCreatePassword}

                        />



                    </div>
                    <div className='passsword-strength'><PasswordStrengthBar password={createPassword} /></div>
                    {/* <PasswordChecklist
                        rules={["minLength", "specialChar", "number", "capital", "match"]}
                        minLength={5}
                        value={createPassword}
                        valueAgain={reenterPassword} // Bind with the repeat password
                        onChange={(isValid) => { }}
                    /> */}
                    <div className='password-name'>
                        <div className='password-icon'><FaLock size={18} /></div>

                        <input
                            className='password-text'
                            type="password"
                            placeholder='Repeat Password'
                            value={reenterPassword}
                            onChange={handleReenterPassword} // Update reenterPassword value
                        />

                    </div>
                    <div className='button-create'>
                        <button className='create-button'>Create Account</button>
                    </div>
                </form>
                <div>
                    Having an Account  ? Log In
                </div>
            </div>
        </div>
    )
}

export default Application;