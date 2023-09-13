import React from "react";

export const LogoSvg = (props) => {
    return (
        <svg
            className={props.class}
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 186 186"
            width="186"
            height="186"
        >
            <title>Logo</title>
            <defs>
                <image
                    width="512"
                    height="512"
                    id="img1"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAAAXNSR0IB2cksfwAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAA2SURBVHic7cEBAQAAAIIg/69uSEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwbggAAAdJ4ifAAAAAASUVORK5CYII="
                />
                <linearGradient
                    id="g1"
                    x1="93"
                    y1="279.9"
                    x2="93"
                    y2="-93.9"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#8e2de2" />
                    <stop offset="1" stopColor="#4a00e0" />
                </linearGradient>
                <image
                    width="161"
                    height="93"
                    id="img2"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKEAAABdCAMAAAD63/bmAAAAAXNSR0IB2cksfwAAAspQTFRF////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////smNKVQAAAO50Uk5TAAIRJENUZW1vfX9+ZlZEJhMLK5Gz2Pj/+tu1kmkvDRRhseT8/ee3ahoMV6rt8LBcDnfz9BcWmvKgG4L2igPi5k0EHjvZ3kIBiQ+trM/XHNYhCb7IvwaUnWAw7PEzHRIyeu84zvddH1mr9dQQeXaEN4V86ED+wiy7vUv7BXL5ST/r307qPDFa5SndPTReX1W4WGfKRjnVIrpTPqeczFuHpZ+PY+mja45KKNAuUHiTuYvBxEy24Z6v7o1zg4EgLXCMUs2G0ZeWOkWAJdNxyeBPQdqbIwfFwMY2Cm6iy2II45WZRxjcSHuyJ5jDZKEqqNUAS9cAAAalSURBVHiczZv5QxRlGMffxYNbQYQB8YJdCRDE2uUSV2Ez1ttISRMhDxSELNP1CDVYxUItMRVNPMoDM1Mzy6vskMrUMs0rlbLSMCv7H9qBFXbned7Zmdk5/P74vt933s8OM/M+z/O+ECJIOp8OHTt19vXzD/BegX6+QcFduobohE0tQKHdgsK6h0cw8ioyqkd0z169vcfr0zcmVi8zXLsM/eIei/cGLyGxf5JidA+VPCBloES+kMefUByvVUZ/kwS+1LR0lfhaGDMyRfL5DFKTj1XW4FQRfOaOQ1TmYzU0O0cooGWAcm8vnwxxHYQBPjlMEz5WT+VaBQAGRmoGyDD64R4RR4zUkI9VXAg/oGmUxoAM04P3u2MarTWfQ2PG0gEzHwVAhhn3NA0w7xmt2Zwan4ADmidoTdam8fko4LNac7loIra8TPI4LMKYJI+MnsPhnhDwucl8Awp6+CdOKYwvkkfxhc8HT42ZxjfhtOlcwN4z6O7imJmzzLTXS7J0hSWls+mTlpVz/C9QrbMDPXzlvdCIOenUeV90t76UTPFNnis1RBem0JfnUWY2znf1WbvjLtuCKYrysVq4yIBPvtg1XX3Fhnoq/JcoDkhIztJlOGKiiyccdRS8KiRak0GVVej89vbv9nLUsKJaHT6HVsaiBK897Dej6/HrK1UDJKRmFYbQtvh1wqLq5NUqAhKyBlsw9G84e7GwuuJNVQEJWYu9LrWtL4IJW36i5atMCZN1OEJhtLT0rUO67MqtIzQNLEM43mJ7zOuRng2qAxKyEeGoY9+VTUgotFkDQEJKIUhFjaP9bdhu2KIJ4RrkmzLJ0R4Nm2s1ASSkHqJsdTRvg83bNSJE1rY6R4IHq0jJeJ2sPHvHO/U7grmRpSjl5wa823/nLkpGXL4bsNiKyGrIvQcb3XuwsyIbESaZUdfgDAb13Wehhr0Q5j3iBxvXImP3uXyT3t8vDbCotD3Im/wB5tgAYQ6Qg6AtAvl9IW4lz6EWKYChbqtrcRfEYkoHNFtJLWizw3Q655C7ZRGlKMCrD92vkYRU13VjAM1hAks1H8GRRzgxuGGmeEBTAWeeuYjpY0ATTj4BbUfhwGNczwLxhIHca0QiG1JhgGY3OQ7aToBxA0E+hl3dg+rARMuhKQCYikkWaBsExllg7FYjFtAKJ/KDrpPAZEMID4BxvYCHER2BJ8BrfApdvtCFEH4Gxp2CS/rnYgmtMIT6ArrgPWSQ5/BLMK4cZIsGH7GEJApM9BU0gdfJ8RzC3ac0OPAQ13NaNCBp5F5Dj/zKnYBmN/katB2GA7dzPchD7kljjZxrhCGmGEBTRzaDtlWwFJLPyRRGS0ljvnG/RnohtFjh/ZpAvgVtWchQy3FXR0EvCYDEZ7HrNfTrEEsI3HDfSpaCNuYIMvaMS1FgyHdSAAnJPOxyG4IwRzWscE0l8yHhQWywpb8z1LUd2yQN0PGwNDqLrrZta1DDWQiTTRIg9go8RD3XMOr8+ZHf75PKx6poZsYPY+LOTsHrBaEXIKEj3ocPJ/OjNxBe6CK8W5cIeMVY1WtE+BNEyXA0J8LmSPwpUVqXuV9MpjVf7ork0QM0IZwIQfQLHe05yINo26gBYA1ScR92he3BtsvKZDiQJVJ5VxEO35aueG4CwWquSkX2ds1BKLKcn15sM2UZms8qqC3Ia8Jcc96nFOx4zQqJabtEdcDOIBkeLo3515FeZpzkxU2CMk9jCGVtO3YlWDezSnS2JFkWmMmz2tVmyLejhn4/qwS4HybtrKputFvwm8jM7qvGjoA1kXLO8aaLSXcN9+hLqQdLZFPmrQp88ia3sw65MCltld1X2e1Rc9AlysyR2e5OkIm1ad4vvyrGtyTxNnXe3zhPWBH+NrWo6vc/lNgA8rl4cCh9Uvsdrr+ado6gRXePdq6cFZInz198SV6RpXpXWji+7d4q459wHFIycdey47EXouSQPTbJ44GbZuyX7fE0SkXdu4Ld/LxH4+Qcq3DKAZVynlNBqmoc9QD5OVif0kKxPKW/TXe1pnPodjc6ICGnFnu+gsK6/hcfICEmygqtmpqQupa7zPf5PqSK65aAk/e65TxrkcKqChYW7u3/WyPA9YJrHfkpvOcrFVL6P2KCqML7lLBSMen/FZu5Pbin5n8wVNRKOeh4OZpydFF22dI8fAOpyrx5jZYdyKfiqydPSeRjZe16djxvaOulCpoaH3ifT6ZWNtevl//lTp/xX0DuHdkKWDfGTl/X0BxwIloO7Q3wbyg5YxF4EuF/u0y6yIYWn08AAAAASUVORK5CYII="
                />
            </defs>
            <use id="Background" href="#img1" x="-163" y="-163" />
            <path
                id="Shape 2"
                className="s0"
                d="m0 11c0-6.1 4.9-11 11-11h164c6.1 0 11 4.9 11 11v164c0 6.1-4.9 11-11 11h-164c-6.1 0-11-4.9-11-11z"
            />
            <use id="microbit-1324440196819147776" href="#img2" x="12" y="46" />
        </svg>
    );
};
