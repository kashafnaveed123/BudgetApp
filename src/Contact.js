import React from 'react'
function Contact() {
    return (
        <>
            <div className='contact-first-main'>
                <div className='contact-first'>
                    <h1>Contact Us</h1>
                    <p>For temporary placeholder text, static Lorem Ipsum can be used directly within your JSX like in HTML. If you want something more dynamic or randomized, you can use the lorem-ipsum npm package to generate paragraphs of text. lorem-ipsum npm package to generate paragraphs of text.</p>
                </div>
            </div>
        
            <div className='contact-sec-main'>
                <div className='contact-sec-left'>
                    <form>
                        <div className='contact-sec-left-first'>
                            <input type='email' placeholder='Email' />
                            <input type='number' placeholder='Phone' />
                        </div>
                        <div className='contact-sec-left-sec'>
                            <input type='text' placeholder='Name' />
                            <textarea
                                placeholder="Message"
                                rows="5"
                                cols="30"
                            />
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>

                <div className='contact-sec-right'>
                    <div className='contact-sec-righ-first'>
                        <h3>Our Newletter</h3>
                        <p>Don’t forget to check out our
                            special discounts and new
                            arrivals this month.</p>
                        <form>
                            <input type='email' placeholder='Email' />
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='contact-details'>
                <div className='contact-number'>
                    <i class="bi bi-telephone"></i>
                    <h5>(+92)665 765</h5>
                    <p>Contact us for our official
                        phone no.</p>
                </div>
                <div className='contact-email'>
                    <i class="bi bi-envelope"></i>
                    <h5>Saylani@bookstore.id</h5>
                    <p>Visite our official website or
                        email id</p>

                </div>
                <div className='contact-location'>
                    <i class="bi bi-geo-alt"></i>
                    <h5>Fsd Eye Fsd</h5>
                    <p>Check out our location</p>
                </div>
            </div>

            <div className="map-container">
      <img src='jnliwe' alt="Static Map" className="static-map" />
    </div>
        </>
    )
}

export default Contact
