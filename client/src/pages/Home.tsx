import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../api/productApi";
import type { Product } from "../types/product";

import ProductCard from "../components/product/ProductCard";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

import "../style/Home.css";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts({});

        console.log("Home products:", response);

        setProducts(response.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show only a few products on homepage
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-75">

            <div className="col-lg-6">
              <span className="hero-small-text">
                HANDMADE • UNIQUE • BEAUTIFUL
              </span>

              <h1 className="hero-title">
                Little pieces of
                <span> art</span> for your
                <span> everyday life.</span>
              </h1>

              <p className="hero-description">
                Discover beautifully handcrafted ceramic pieces
                made to bring warmth, character and creativity
                into your everyday spaces.
              </p>

              <Link
                to="/products"
                className="btn hero-btn"
              >
                Shop Collection
              </Link>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="hero-image-wrapper">

                <img
                  src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85"
                  alt="Handmade ceramics"
                  className="hero-image"
                />

                <div className="hero-floating-card">
                  <span>✦</span>

                  <div>
                    <strong>Handcrafted</strong>
                    <small>Made with love</small>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* FEATURES */}
      <section className="features-section">
        <div className="container">

          <div className="row text-center g-4">

            <div className="col-md-4">
              <div className="feature-item">
                <div className="feature-icon">✦</div>
                <h5>Handmade With Love</h5>
                <p>
                  Every piece has its own unique character.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-item">
                <div className="feature-icon">◇</div>
                <h5>Unique Designs</h5>
                <p>
                  Thoughtfully designed pieces for your space.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <h5>Quality Materials</h5>
                <p>
                  Carefully crafted using quality materials.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* FEATURED PRODUCTS */}
      <section className="featured-section">
        <div className="container">

          <div className="section-heading">
            <span>OUR COLLECTION</span>

            <h2>
              Featured Products
            </h2>

            <p>
              Discover some of our handmade ceramic pieces.
            </p>
          </div>


          {/* ERROR */}
          {error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}


          {/* LOADING */}
          {loading && (
            <Loader />
          )}


          {/* PRODUCTS */}
          {!loading && !error && featuredProducts.length > 0 && (
            <>
             <div className="row g-4">
  {featuredProducts.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ))}
</div>

              <div className="text-center mt-5">

                <Link
                  to="/products"
                  className="btn view-all-btn"
                >
                  View All Products
                </Link>

              </div>
            </>
          )}


          {/* EMPTY */}
          {!loading &&
            !error &&
            featuredProducts.length === 0 && (
              <EmptyState
                message="No products available."
              />
            )}

        </div>
      </section>


      {/* STORY */}
      <section className="brand-section">
        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80"
                alt="Ceramic craftsmanship"
                className="brand-image"
              />

            </div>

            <div className="col-lg-6">

              <span className="brand-label">
                THE CERAMICCRAFT STORY
              </span>

              <h2>
                Made slowly.
                <br />
                Made specially.
              </h2>

              <p>
                We believe the things we use every day should
                have a little soul. CeramicCraft brings together
                handmade ceramic pieces that are simple,
                functional and beautifully imperfect.
              </p>

              <p>
                From your morning cup of tea to little decorative
                details around your home, each piece is created
                to make everyday moments feel a little more special.
              </p>

              <Link
                to="/products"
                className="btn story-btn"
              >
                Discover Our Collection
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="cta-section">
        <div className="container text-center">

          <span>
            YOUR SPACE, YOUR STYLE
          </span>

          <h2>
            Find something you'll
            <br />
            love to keep.
          </h2>

          <p>
            Explore our collection of handmade ceramic pieces.
          </p>

          <Link
            to="/products"
            className="btn cta-btn"
          >
            Start Shopping
          </Link>

        </div>
      </section>

    </div>
  );
};

export default Home;