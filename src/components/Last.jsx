import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import '../Styles/Last.css'; // Ensure this file is imported

function Last() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <center>
    <footer className="text-center text-lg-start custom-footer">
      <div className="container-fluid p-4 pb-0" style={{ backgroundColor: "black" }}>
        <section className="">
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Company</h6>
              <p>
                {/* Add company description or other content here */}
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Legal Information</h6>
              <p><a href="#!">Privacy Policy</a></p>
              <p><a href="#!">Terms of Service</a></p>
              <p><a href="#!">Cookie Policy</a></p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
              <p><a href="#!" onClick={scrollToTop}>Home</a></p>
              <p><Link to="/Ab">About</Link></p>
              <p><a href="#!">Reviews</a></p>
              <p><Link to="/Help">Help</Link></p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p><i className="fas fa-home mr-3"></i> Bhimavaram, AP</p>
              <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
              <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
              <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
            </div>
          </div>
        </section>

        <hr className="my-3" />

        <section className="p-3 pt-0">
          <div className="row d-flex align-items-center">
            <div className="col-md-7 col-lg-8 text-center text-md-start">
              <div className="p-3"></div>
            </div>
            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
              <a className="btn btn-outline-light btn-floating m-1 text-white" href="#!" role="button"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-outline-light btn-floating m-1 text-white" href="#!" role="button"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-outline-light btn-floating m-1 text-white" href="#!" role="button"><i className="fab fa-google"></i></a>
              <a className="btn btn-outline-light btn-floating m-1 text-white" href="#!" role="button"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </section>
      </div>
    </footer>
    </center>
  );
}

export default Last;
