import { useEffect, useState, useRef } from "react";
import "./Home.css";
import { Link } from "react-router";

import HeroGradient from "../../components/HeroGradient/HeroGradient";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import VideoPlayer2 from "../../components/VideoPlayer/VideoPlayer2";
import NavBar from "../../components/NavBar/NavBar";
import Cursor from "../../components/Cursor/Cursor";
import Transition from "../../components/Transition/Transition";
import Slider from "../../components/slider/Slider";

import { projects } from "./projects";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ReactLenis from "@studio-freight/react-lenis";

import { HiArrowRight } from "react-icons/hi";
import { RiArrowRightDownLine } from "react-icons/ri";
import Apply from "../../components/Apply/Apply";

const Home = () => {
  const manifestoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 0);

    return () => clearTimeout(scrollTimeout);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: ".cta",
      start: "top 10%",
      onEnter: () => {
        document.querySelector(".cta").classList.add("light");
        document.querySelector(".manifesto").classList.add("light");
        // document.querySelector(".marquee").classList.add("light");
      },
      onLeaveBack: () => {
        document.querySelector(".cta").classList.remove("light");
        document.querySelector(".manifesto").classList.remove("light");
        // document.querySelector(".marquee").classList.add("light");
      },
      toggleActions: "play reverse play reverse",
    });

    ScrollTrigger.create({
      trigger: ".about",
      start: "top 80%",
      onEnter: () => {
        document.querySelector(".cta").classList.remove("light");
        document.querySelector(".manifesto").classList.remove("light");
        // document.querySelector(".marquee").classList.remove("light");
      },
      onLeaveBack: () => {
        document.querySelector(".cta").classList.add("light");
        document.querySelector(".manifesto").classList.add("light");
        // document.querySelector(".marquee").classList.add("light");
      },
    });

    ScrollTrigger.create({
      trigger: ".footer",
      start: "top 80%",
      onEnter: () => {
        document.querySelector(".team").classList.add("light");
        document.querySelector(".footer").classList.add("light");
      },
      onLeaveBack: () => {
        document.querySelector(".team").classList.remove("light");
        document.querySelector(".footer").classList.remove("light");
      },
    });

    // if (!isMobile) {
    //   gsap.set(".project", { opacity: 0.35 });
    // }

    if (!isMobile) {
      const projects = document.querySelectorAll(".project");

      projects.forEach((project) => {
        const projectImg = project.querySelector(".project-img img");

        project.addEventListener("mouseenter", () => {
          gsap.to(project, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(projectImg, {
            scale: 1.2,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        project.addEventListener("mouseleave", () => {
          gsap.to(project, {
            opacity: 0.35,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(projectImg, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });
    }

    const manifestoText = new SplitType(".manifesto-title h1", {
      types: ["words", "chars"],
      tagName: "span",
      wordClass: "word",
      charClass: "char",
    });

    const style = document.createElement("style");
    style.textContent = `
       .word {
         display: inline-block;
         margin-right: 0em;
       }
       .char {
         display: inline-block;
       }
     `;
    document.head.appendChild(style);

    gsap.set(manifestoText.chars, {
      opacity: 0.25,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".manifesto",
        start: "top 35%",
        end: "bottom 75%",
        scrub: true,
        markers: false,
      },
    });

    manifestoText.chars.forEach((char, index) => {
      tl.to(
        char,
        {
          opacity: 1,
          duration: 0.1,
          ease: "none",
        },
        index * 0.1
      );
    });

    // gsap.to(".marquee-text", {
    //   scrollTrigger: {
    //     trigger: ".marquee",
    //     start: "top bottom",
    //     end: "bottom top",
    //     scrub: 1,
    //     markers: false,
    //     onUpdate: (self) => {
    //       const moveAmount = self.progress * -1000;
    //       gsap.set(".marquee-text", {
    //         x: moveAmount,
    //       });
    //     },
    //   },
    // });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      manifestoText.revert();
      style.remove();
    };
  }, [isMobile]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rows = document.querySelectorAll(".row");
    const isMobileView = window.innerWidth <= 900;

    const getStartX = (index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      return direction * (isMobileView ? 150 : 300);
    };

    if (rows.length > 0) {
      rows.forEach((row, index) => {
        const existingTrigger = ScrollTrigger.getAll().find(
          (st) => st.trigger === ".gallery" && st.vars?.targets === row
        );
        if (existingTrigger) {
          existingTrigger.kill();
        }

        const startX = getStartX(index);

        gsap.set(row, { x: startX });

        gsap.to(row, {
          scrollTrigger: {
            trigger: ".gallery",
            start: "top bottom",
            end: "bottom top",
            scrub: isMobileView ? 0.5 : 1,
            onUpdate: (self) => {
              const moveAmount = startX * (1 - self.progress);
              gsap.set(row, {
                x: moveAmount,
              });
            },
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  return (
    <ReactLenis root>
      <div className="home">
        <Cursor />
        <NavBar />
        <section className="hero" id="hero">
          <HeroGradient />
          <div className="header-container">
            <div className="header h-1">
              <h1>La vie est faite de</h1>
              <h1>moments de lumière...</h1>
            </div>
            <div className="header h-2">
              <h1>et</h1>
              <h1>d'obscurité.</h1>
            </div>
            <div className="header h-3">
              <h1>La vie est faite de</h1>
              <h1>moments de lumière</h1>
            </div>
            <div className="header h-4">
              <h1>et</h1>
              <h1>d'obscurité.</h1>
            </div>
          </div>
        </section>

        <section className="cta">
          {/* <div className="cta-title">
            <p>Trusted by visionaries</p>
          </div>
          <div className="cta-header">
            <h2>
              Apple, Netflix, Gucci, Tesla, Uniqlo, Sephora, Google, Moët &
              Chandon, Spotify, BMW, Montblanc, Panasonic, Nespresso, L’Oréal,
              Samsung
            </h2>
          </div>
          <div className="cta-btn">
            <button>Discover more at origin.co</button>
          </div> */}
        </section>

        <section className="manifesto" id="manifesto" ref={manifestoRef}>
          <div className="container">
            <div className="manifesto-header">
              <HiArrowRight size={13} />
              <p>Pitch</p>
            </div>
            <div className="manifesto-title">
              <h1>
                {/* La couleur compose nos images comme les émotions font nos
                histoires. Clair Obscur est une agence de production
                audiovisuelle animée par la volonté de capturer et retransmettre
                à travers l’image la puissance de toutes nos émotions. Joie,
                tristesse, colère… toutes ces perceptions et les infinis qu’il y
                a entre elles gravitent autour de nous. */}
                Clair Obscur est une agence de production audiovisuelle dédiée à
                capturer et retransmettre à travers l’image toute la puissance
                des émotions. Joie, tristesse, colère… ces instants qui nous
                entourent façonnent nos plus beaux souvenirs.
              </h1>
            </div>
          </div>
        </section>

        {/* <div className="marquee">
          <div className="marquee-text">
            <h1>Lorem ipsum dolor sit amet.</h1>
          </div>
        </div> */}

        <section className="showreel">
          <VideoPlayer />
        </section>

        <section className="about" id="about">
          <div className="container">
            <div className="about-col">
              <div className="about-copy">
                <p>
                  Science ou magie, à vous de voir selon votre degré de
                  superstition. Retenez surtout que Clair Obscur développe cette
                  aptitude à faire ressortir le plus profond des états
                  émotionnels pour le mettre au service d’une écriture puissante
                  et des captations et montages vidéo intenses. Vos histoires
                  exposées au monde, selon ce que vous souhaitez qu’on en
                  retienne.
                </p>
              </div>
            </div>
            <div className="about-col">
              <div className="cta-btn">
                <button>Demander un devis</button>
              </div>
            </div>
          </div>
        </section>
        {/* <Apply /> */}

        <section className="gallery">
          <div className="gallery-wrapper">
            <div className="row">
              <div className="img">
                <img src="/marquee/img1.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img2.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img3.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img4.jpg" alt="" />
              </div>
            </div>
            <div className="row">
              <div className="img">
                <img src="/marquee/img5.png" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img6.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img7.png" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img8.jpg" alt="" />
              </div>
            </div>
            <div className="row">
              <div className="img">
                <img src="/marquee/img9.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img10.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img11.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img12.jpg" alt="" />
              </div>
            </div>
            <div className="row">
              <div className="img">
                <img src="/marquee/img13.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img14.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img15.jpg" alt="" />
              </div>
              <div className="img">
                <img src="/marquee/img16.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>

        <div className="container-work-intro">
          <div className="team-header">
            <HiArrowRight />
            <p>Réalisations</p>
          </div>
          <div className="projects-intro">
            <h1>Nos réalisations</h1>
          </div>
        </div>
        <section id="work">
          <Slider />
        </section>

        <section className="team" id="team">
          <div className="container">
            <div className="team-header">
              <p>L'équipe</p>
            </div>

            <div className="team-intro">
              <h1>L'équipe Clair Obscur &nbsp;&nbsp;&nbsp;</h1>
            </div>

            <div className="team-member tm-1">
              <div className="team-member-position">
                <p>Directeur Artistique / Chef de stratégie</p>
              </div>
              <div className="team-member-profile">
                <div className="team-member-img">
                  <img src="/team/member1.jpeg" alt="" />
                </div>
                <div className="team-member-info">
                  <div className="team-member-name">
                    <p>
                      Zinedine <br />
                      Lemba
                    </p>
                  </div>
                  <div className="team-member-details">
                    <div className="team-member-toggle"></div>
                    <div className="team-member-copy">
                      <p>
                        Zinedine est un artiste visuel. Il est excellent sur
                        beaucoup de chose notamment pour transformer des idées
                        en concepts visuels percutants. Chaque projet doit avoir
                        sa personnalité et vous pouvez compter sur Zinedine pour
                        la consolider. C’est également un chargé de
                        communication en puissance qui a déjà accompagné
                        plusieurs marques sur des stratégies pub. Doté d’un
                        excellent relationnel, il sait fédérer les équipes et
                        captiver les clients avec des propositions pertinentes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-member-index">
                <p>(01)</p>
                <h1>Zinedine Lemba</h1>
              </div>
            </div>

            <div className="team-member tm-2">
              <div className="team-member-position">
                <p>Scénariste / Motion designer </p>
              </div>
              <div className="team-member-profile">
                <div className="team-member-img">
                  <img src="/team/member2.jpeg" alt="" />
                </div>
                <div className="team-member-info">
                  <div className="team-member-name">
                    <p>
                      Idrissa <br />
                      Kanoute
                    </p>
                  </div>
                  <div className="team-member-details">
                    <div className="team-member-toggle"></div>
                    <div className="team-member-copy">
                      <p>
                        Idrissa nourrit sa créativité depuis son plus jeune âge
                        en inventant des histoires en tous genres. Capable de
                        visualiser des scènes fictives à partir de quelques
                        mots, il a rapidement vu dans la vidéo « le meilleur
                        outil pour raconter des histoires ». Pour donner vie à
                        ses idées, il s’est spécialisé en motion design et
                        montage vidéo. L’image et l’écriture se mêlent dans son
                        travail, pour créer des récits visuels grandioses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-member-index">
                <p>(02)</p>
                <h1>Idrissa Kanoute</h1>
              </div>
            </div>

            <div className="team-member tm-3">
              <div className="team-member-position">
                <p>Réalisateur / Chef opérateur</p>
              </div>
              <div className="team-member-profile">
                <div className="team-member-img">
                  <img src="/team/member3.jpeg" alt="" />
                </div>
                <div className="team-member-info">
                  <div className="team-member-name">
                    <p>
                      Ben <br />
                      Mvouama
                    </p>
                  </div>
                  <div className="team-member-details">
                    <div className="team-member-toggle"></div>
                    <div className="team-member-copy">
                      <p>
                        Fabriqueur d’images, Ben est un as de la caméra. En
                        charge de plusieurs documentaires de télévision et de
                        publicités c’est une encyclopédie des codes de
                        l’imagerie. Mouvements, angles, éclairages, donnez lui
                        n’importe quel sujet qui possède au moins 3 côtés et il
                        saura vous le sublimer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-member-index">
                <p>(03)</p>
                <h1>Ben Mvouama</h1>
              </div>
            </div>

            <div className="team-member tm-4">
              <div className="team-member-position">
                <p>Monteur / Artiste 3D</p>
              </div>
              <div className="team-member-profile">
                <div className="team-member-img">
                  <img src="/team/member4.jpeg" alt="" />
                </div>
                <div className="team-member-info">
                  <div className="team-member-name">
                    <p>
                      Ousmane <br />
                      Kanoute
                    </p>
                  </div>
                  <div className="team-member-details">
                    <div className="team-member-toggle"></div>
                    <div className="team-member-copy">
                      <p>
                        Installé sur la frontière entre le réel et l’utopie
                        Ousmane est un artiste 3D qui cherche à repousser les
                        limites du possible. Ses inspirations il va les chercher
                        au plus profond du metaverse tentant par tous les moyens
                        de transformer l’illusoire en réalisable. Il se définit
                        lui même comme un « dégénéré » et a choisi la 3D pour
                        dépasser les limites humaines, sans jamais y trouver la
                        fin. Cette science il l’applique aussi dans sa capacité
                        à monter des vidéos et c’est à notre grand bonheur.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-member-index">
                <p>(04)</p>
                <h1>Ousmane Kanoute</h1>
              </div>
            </div>
          </div>
          <section className="showreel">
            <VideoPlayer2 />
          </section>
        </section>

        <section className="footer" id="contact">
          <div className="container">
            <div className="footer-header">
              <HiArrowRight />
              <p>Contact</p>
            </div>

            <div className="footer-title">
              {/* <h1>Collaborons.</h1> */}
              <img className="logoFooter" src="/logo.png" alt="" />
            </div>

            <div className="footer-content">
              <div className="footer-col">
                <div className="footer-col-content">
                  <div className="footer-email">
                    <p>Par mail</p>
                    <h2>clairobscuragence@gmail.com</h2>
                  </div>
                </div>
              </div>
              <div className="footer-col">
                <div className="footer-col-header">
                  <p>Réseaux sociaux</p>
                </div>
                <div className="footer-sub-col">
                  <a
                    className="footerLink"
                    href="https://www.instagram.com/agenceclairobscur/"
                    target="_blank"
                  >
                    Instagram
                  </a>
                  <a
                    className="footerLink"
                    href="https://www.linkedin.com/company/clair-obscur-vision/"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
};

export default Transition(Home);
