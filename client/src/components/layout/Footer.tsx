const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <div className="container">
        <div className="row">

          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">CeramicCraft</h5>
            <p className="small">
              Premium handmade ceramic products crafted with quality and care.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>

            <ul className="list-unstyled">
              <li>Home</li>
              <li>Products</li>
              <li>Cart</li>
              <li>Login</li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Contact</h5>

            <p className="mb-1">Email: info@ceramiccraft.com</p>
            <p className="mb-1">Phone: +92 300 1234567</p>
            <p>Lahore, Pakistan</p>
          </div>

        </div>

        <hr />

        <div className="text-center">
          <small>
            © {new Date().getFullYear()} CeramicCraft. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;