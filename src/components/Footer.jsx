export default function Footer() {
    return (
        <footer className="p-5 text-light mt-5 bg-black">
            <div className="row g-4">

                <div className="col-12 col-md-2">
                    <h4 className="mb-3">Exclusive</h4>
                    <p>Subscribe</p>
                    <p>Get 10% off your first order</p>
                    <div className="d-flex mt-3">
                        <input
                            className="p-2 bg-transparent border border-light w-100"
                            type="text"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                
                <div className="col-12 col-md-2">
                    <h4 className="mb-3">Support</h4>
                    <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                    <p>exclusive@gmail.com</p>
                    <p>+88015-88888-9999</p>
                </div>

                
                <div className="col-12 col-md-2">
                    <h4 className="mb-3">Account</h4>
                    <p>My Account</p>
                    <p>Login / Register</p>
                    <p>Cart</p>
                    <p>Wishlist</p>
                    <p>Shop</p>
                </div>

                
                <div className="col-12 col-md-2">
                    <h4 className="mb-3">Quick Link</h4>
                    <p>Privacy Policy</p>
                    <p>Terms Of Use</p>
                    <p>FAQ</p>
                    <p>Contact</p>
                </div>

                
               <div className="col-12 col-md-3">
    <h4 className="mb-3">Download App</h4>
    <p><small className="text-light">Save $3 with App New User Only</small></p>

    <div className="d-flex align-items-start gap-3">
        
        
        <img
            src="/images/QrKod.jpg"
            alt="Qr Kod"
            width="90"
            className="rounded"
        />

        
        <div className="d-flex aling-items-center gap-2 ">
            <img
                src="/images/GooglePlay.png"
                alt="Google Play"
                width="140"
            />
            <img 
                src="/images/AppleStore.png"
                alt="App Store"
                width="140"
            />
        </div>
    </div>

    
    <div className="d-flex gap-4 mt-4 fs-4 ">
        <i className="bi bi-facebook"></i>
        <i className="bi bi-twitter"></i>
        <i class="bi bi-instagram"></i>
        <i className="bi bi-linkedin"></i>
    </div>
</div>

            </div>

            {/* Bottom copyright */}
            <div className="mt-5 border-top border-secondary pt-3 text-center">
                <p className="text-light">
                    Ⓒ Copyright Rimel 2022. All right reserved
                </p>
            </div>
        </footer>
    );
}
