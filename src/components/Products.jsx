import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Products({ mainCategory, product }) {
  const [cat, setCat] = useState("");

  return (
    <section
      style={{ backgroundColor: "#F8FAFC", paddingTop: 50, paddingBottom: 80 }}
    >
      {/* Heading */}
      <div className="container text-center mb-5">
        <h2 className="fw-bold text-dark" style={{ fontSize: 40 }}>
          Our Latest Products
        </h2>

        <p className="fs-5 mx-auto text-secondary" style={{ maxWidth: 750 }}>
          Introducing our latest product crafted with advanced technology,
          elegant design, and superior quality to offer long-lasting
          performance, comfort, and reliability for your daily needs.
        </p>
      </div>

      <div className="container">

        {/* Filters */}
        <ul className="d-flex gap-3 justify-content-center mb-5 flex-wrap list-unstyled">
          <li
            className={`px-4 py-2 rounded-pill fw-semibold shadow-sm ${
              cat === "" ? "text-white bg-dark" : "bg-light text-dark"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setCat("")}
          >
            All
          </li>

          {mainCategory?.map((item) => (
            <li
              key={item.name}
              className={`px-4 py-2 rounded-pill fw-semibold shadow-sm ${
                cat === item.name ? "text-white bg-dark" : "bg-light text-dark"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setCat(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Products */}
        <div className="row gy-4">
          {product
            ?.filter((x) => (cat === "" ? true : cat === x.mainCategory.name))
            .slice(0, 24)
            .map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">

                <div className="border-0 shadow-lg overflow-hidden bg-white rounded-4 h-100">

                  {/* Image Hover Zoom */}
                  <div className="overflow-hidden">
                    <img
                      src={`data:${item.pics[0].fileType};base64,${item.pics[0].base64}`}
                      alt={item.pics[0].name}
                      className="w-100"
                      style={{
                        height: 360,
                        objectFit: "cover",
                        transition: "0.5s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.08)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </div>

                  <div className="p-4">

                    {/* Brand */}
                    <h5 className="fw-bold text-dark mb-1">
                      {item.brand.name}
                    </h5>

                    {/* Name */}
                    <p className="text-secondary mb-1" style={{ fontSize: 14 }}>
                      {item.name}
                    </p>

                    {/* Price */}
                    <h5 className="fw-bold my-1 text-dark">
                      <span className="text-decoration-line-through text-secondary">
                        ₹{item.basePrice}
                      </span>{" "}
                      <span>₹{item.finalPrice}</span>
                      <sup className="text-success ms-1">
                        {item.discount}% Off
                      </sup>
                    </h5>

                    {/* Button */}
                    <Link
                      to={`/product/${item.id}`}
                      className="btn btn-dark w-100 fw-semibold rounded-pill mt-2"
                    >
                      Add To Cart
                    </Link>

                  </div>
                </div>

              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
