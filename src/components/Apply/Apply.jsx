import React from "react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import "./Apply.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

const Apply = () => {
  return (
    <div className="body">
      <section class="herop">
        <div class="logoheader">
          <div class="logoheader-text">
            <h1>La Piga</h1>
          </div>
          <div class="ctab">
            <button id="toggle">Apply now</button>
          </div>
        </div>

        <div class="tagline">
          <p>
            Indépendant; à la pige; adj Release <br />
            v1.0 coming soon
          </p>
        </div>

        <div class="links">
          <button>Instagram</button>
          <button>Twitter</button>
        </div>
      </section>

      <div class="overlay">
        <div class="col">
          <div class="logotype">
            <a href="#">La Pige</a>
          </div>

          <div class="form">
            <form>
              <label for="fname">Name*</label>
              <br />
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="first + surname"
              />
              <br />
              <br />

              <label for="lname">Location*</label>
              <br />
              <input
                type="text"
                id="lname"
                name="lname"
                placeholder="e.g france"
              />
              <br />
              <br />

              <label for="website">Website</label>
              <br />
              <input
                type="text"
                id="website"
                name="website"
                placeholder="https://"
              />
              <br />
              <br />

              <label for="jobs">Disciplines</label>
              <br />
              <div class="jobs">
                <div class="job-items">
                  <div class="item">
                    <input type="checkbox" />
                    <label>Digital Design</label>
                    <br />
                  </div>
                  <div class="item">
                    <input type="checkbox" />
                    <label>Front-end</label>
                    <br />
                  </div>
                  <div class="item">
                    <input type="checkbox" />
                    <label>Webgl</label>
                    <br />
                  </div>
                  <div class="item">
                    <input type="checkbox" />
                    <label>Photography</label>
                    <br />
                  </div>
                  <div class="item">
                    <input type="checkbox" />
                    <label>Illustration</label>
                    <br />
                  </div>
                </div>
                <div class="job-items">
                  <div class="item">
                    <input type="checkbox" />
                    <label>Brand Design</label>
                    <br />
                  </div>
                  <div class="item">
                    <input type="checkbox" />
                    <label>Bakc-end</label>
                    <br />
                  </div>
                  <div class="item">
                    <input type="checkbox" />
                    <label>3D</label>
                    <br />
                  </div>
                  <div class="item">
                    <input type="checkbox" />
                    <label>Motion</label>
                    <br />
                  </div>
                  <div class="item">
                    <input type="checkbox" />
                    <label>Strategy</label>
                    <br />
                  </div>
                </div>
              </div>

              <button>Send Application</button>
            </form>
          </div>
        </div>
        <div class="col">
          <div class="copy">
            <p>[ get featured ]</p>
            <p id="back">[ back ]</p>
          </div>
          <div class="aboutblank">
            <p>
              To be considered for a listing on La Pige, please fill out your
              details opposite. Each application will be carefully reviewed and
              vetted while v1.0 release is being worked on.
            </p>
          </div>

          <div class="send">
            <h1>Apply</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
